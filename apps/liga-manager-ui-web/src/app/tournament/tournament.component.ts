import { Component, DestroyRef, inject, input, OnInit, signal } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatToolbarModule } from '@angular/material/toolbar';
import { TournamentState } from '@liga-manager-api/graphql';
import {
    TournamentChooserComponent,
    MatchComponent,
} from '@liga-manager-ui/components';
import { CustomDatePipe, SortByPipe } from '@liga-manager-ui/pipes';
import { TranslateModule } from '@ngx-translate/core';
import { firstValueFrom, of, Subject, switchMap, tap } from 'rxjs';
import { GestureService, TournamentService } from '@liga-manager-ui/services';
import { takeUntilDestroyed, toObservable, toSignal } from '@angular/core/rxjs-interop';
import { MatSelectModule } from '@angular/material/select';
import { MatIcon } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';
import { CypressSelectorDirective } from '@liga-manager-ui/directives';
import { GetTournaments, SelectedContextTypes, SelectedItemsSelectors, SetSelectedTournament, SetSelectedTournamentRound } from '@liga-manager-ui/states';
import { dispatch, Store } from '@ngxs/store';
import { AsyncPipe } from '@angular/common';

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
        AsyncPipe,
    ],
    standalone: true,
})
export class TournamentComponent implements OnInit {

    private dispatchSetSelectedTournament = dispatch(SetSelectedTournament);

    private dispatchSetSelectedTournamentRound = dispatch(SetSelectedTournamentRound);

    viewContext = input<SelectedContextTypes>('progress');

    animateEnter = signal<'slide-in-ltr' | 'slide-in-rtl' | undefined>(undefined);

    animateLeave = signal<'slide-out-ltr' | 'slide-out-rtl' | undefined>(undefined);

    selectedTournamentRoundIdFC = new FormControl();

    tournamentService = inject(TournamentService);

    selectedTournamentFC = new FormControl<string>('');

    private store = inject(Store);

    tournament$ = toObservable(this.viewContext).pipe(
        switchMap(
            (viewContext) => this.store.select(SelectedItemsSelectors.selectedTournamentId(viewContext)).pipe(
                tap(
                    (selectedTournamentId) => {
                        if (selectedTournamentId) {
                            this.selectedTournamentFC.setValue(selectedTournamentId);
                        }
                    },
                ),
                switchMap(
                    (selectedTournamentId) =>
                        selectedTournamentId ?
                            this.tournamentService.getTournamentById$(selectedTournamentId).pipe(
                                tap(
                                    (tournament) => {
                                        const stateTournamentRound = this.store.selectSnapshot(SelectedItemsSelectors.selectedTournamentRoundId(this.viewContext()));
                                        let selectedTournamentRound = tournament?.rounds![0]?.id;
                                        if (stateTournamentRound && tournament?.rounds?.find((t) => t?.id === stateTournamentRound) ) {
                                            selectedTournamentRound = stateTournamentRound;
                                        }
                                        this.selectedTournamentRoundIdFC.setValue(selectedTournamentRound);
                                    },
                                ),
                            ) :
                            of(null),
                ),
            ),
        ),
    );

    selectedTournament = toSignal(this.tournament$);

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
                    this.nextRound();
                }
                if (event.direction === 'Right') {
                    this.prevRound();
                }
            },
        );
        this.selectedTournamentFC.valueChanges.pipe(
            takeUntilDestroyed(this.destroyRef),
        ).subscribe(
            (selectedTournamentId) => {
                this.dispatchSetSelectedTournament(this.viewContext(), selectedTournamentId);
            },
        );
        this.selectedTournamentRoundIdFC.valueChanges.pipe(
            takeUntilDestroyed(this.destroyRef),
        ).subscribe(
            (selectedTournamentRoundId) => {
                this.dispatchSetSelectedTournamentRound(this.viewContext(), selectedTournamentRoundId);
            },
        );
    }

    async refresh(event?: Subject<void>) {
        await firstValueFrom(this.store.dispatch( new GetTournaments(true)));
        event?.next();
    }

    selectedTournamentRound() {
        return this.selectedTournament()?.rounds?.find(
            (round) => round?.id === this.selectedTournamentRoundIdFC.value,
        );
    }

    nextRound() {

        this.animateEnter.set('slide-in-rtl');
        this.animateLeave.set('slide-out-rtl');

        if(!this.selectedTournament()?.rounds) {
            return;
        }

        const currentIndex = this.selectedTournament()?.rounds?.findIndex(
            (round) => round?.id === this.selectedTournamentRoundIdFC.value,
        ) || 0;
        const nextId = this.selectedTournament()?.rounds![currentIndex + 1]?.id;
        if(nextId) {
            this.selectedTournamentRoundIdFC.setValue(nextId);
        }

    }

    prevRound() {

        this.animateEnter.set('slide-in-ltr');
        this.animateLeave.set('slide-out-ltr');

        if(!this.selectedTournament()?.rounds) {
            return;
        }

        const currentIndex = this.selectedTournament()?.rounds?.findIndex(
            (round) => round?.id === this.selectedTournamentRoundIdFC.value,
        ) || 0;

        const nextId = this.selectedTournament()?.rounds![currentIndex -1]?.id;

        if(nextId) {
            this.selectedTournamentRoundIdFC.setValue(nextId);
        }
    }

}
