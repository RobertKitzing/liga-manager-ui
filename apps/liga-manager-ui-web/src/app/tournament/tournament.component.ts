import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatToolbarModule } from '@angular/material/toolbar';
import { AllTournamentsFragment, TournamentState } from '@liga-manager-api/graphql';
import {
    TournamentChooserComponent,
    MatchComponent,
    matchDayAnimation,
} from '@liga-manager-ui/components';
import { CustomDatePipe, SortByPipe } from '@liga-manager-ui/pipes';
import { TranslateModule } from '@ngx-translate/core';
import { firstValueFrom, of, startWith, Subject, switchMap, tap } from 'rxjs';
import { fromStorage, GestureService, TournamentService } from '@liga-manager-ui/services';
import { StorageKeys } from '@liga-manager-ui/common';
import { takeUntilDestroyed, toSignal } from '@angular/core/rxjs-interop';
import { MatSelectModule } from '@angular/material/select';
import { MatIcon } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';
import { CypressSelectorDirective } from '@liga-manager-ui/directives';
import { NgxPullToRefreshComponent } from 'ngx-pull-to-refresh';

@Component({
    selector: 'lima-tournament',
    templateUrl: './tournament.component.html',
    imports: [
        MatToolbarModule,
        TournamentChooserComponent,
        TranslateModule,
        MatchComponent,
        SortByPipe,
        CustomDatePipe,
        MatSelectModule,
        MatIcon,
        ReactiveFormsModule,
        MatButtonModule,
        CypressSelectorDirective,
        NgxPullToRefreshComponent,
    ],
    standalone: true,
    animations: [ matchDayAnimation ],
})
export class TournamentComponent implements OnInit {

    selectedRoundIdFC = fromStorage<string>(StorageKeys.TOURNAMENT_SELECTED_ROUND_ID)

    storedSelectedTournament = fromStorage<AllTournamentsFragment>(StorageKeys.TOURNAMENT_SELECTED_TOURNAMENT);

    tournamentService = inject(TournamentService)

    selectedTournamentFC = new FormControl(this.storedSelectedTournament());

    selectedTournament$ = this.selectedTournamentFC.valueChanges.pipe(
        startWith(this.storedSelectedTournament()),
        tap((tournament) => {
            if (tournament) {
                this.storedSelectedTournament.set(tournament);
            }
        }),
        switchMap((tournament) =>
            tournament
                ? this.tournamentService.getTournamentById$(tournament?.id).pipe(
                    tap(
                        (tournament) => {
                            if (!this.selectedRoundIdFC() || !tournament?.rounds?.find((t) => t?.id === this.selectedRoundIdFC()) ) {
                                this.selectedRoundIdFC.set(tournament?.rounds![0]?.id || null)
                            }
                        },
                    ),
                )
                : of(null),
        ),
    );

    selectedTournament = toSignal(this.selectedTournament$);

    private router = inject(Router);

    private gestureService = inject(GestureService);

    private destroyRef = inject(DestroyRef);

    get filterStates() {
        if (this.router.url.includes('history')) {
            return [TournamentState.Ended];
        } else {
            return [TournamentState.Progress];
        }
    }

    ngOnInit(): void {
        this.refresh();
        this.gestureService.swiped.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(
            (event) => {
                if (event.direction === 'Left') {
                    this.nextRound()
                }
                if (event.direction === 'Right') {
                    this.prevRound()
                }
            },
        );
    }

    async refresh(event?: Subject<void>) {
        await firstValueFrom(this.tournamentService.reloadTournaments());
        event?.next();
    }

    selectedTournamentRound() {
        return this.selectedTournament()?.rounds?.find(
            (round) => round?.id === this.selectedRoundIdFC(),
        );
    }

    nextRound() {

        if(!this.selectedTournament()?.rounds) {
            return;
        }

        const currentIndex = this.selectedTournament()?.rounds?.findIndex(
            (round) => round?.id === this.selectedRoundIdFC(),
        ) || 0
        const nextId = this.selectedTournament()?.rounds![currentIndex + 1]?.id;
        if(nextId) {
            this.selectedRoundIdFC.set(nextId);
        }

    }

    prevRound() {

        if(!this.selectedTournament()?.rounds) {
            return;
        }

        const currentIndex = this.selectedTournament()?.rounds?.findIndex(
            (round) => round?.id === this.selectedRoundIdFC(),
        ) || 0

        const nextId = this.selectedTournament()?.rounds![currentIndex -1]?.id;

        if(nextId) {
            this.selectedRoundIdFC.set(nextId);
        }
    }

}
