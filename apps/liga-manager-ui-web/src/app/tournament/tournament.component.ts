import { Component, inject, OnInit } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatToolbarModule } from '@angular/material/toolbar';
import { AllTournamentsFragment, TournamentState } from '@liga-manager-api/graphql';
import {
    TournamentChooserComponent,
    MatchComponent,
} from '@liga-manager-ui/components';
import { CustomDatePipe, SortByPipe } from '@liga-manager-ui/pipes';
import { TranslateModule } from '@ngx-translate/core';
import { of, startWith, switchMap, tap } from 'rxjs';
import { fromStorage, TournamentService } from '@liga-manager-ui/services';
import { StorageKeys } from '@liga-manager-ui/common';
import { toSignal } from '@angular/core/rxjs-interop';
import { MatSelectModule } from '@angular/material/select';
import { MatIcon } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';

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
    ],
    standalone: true,
})
export class TournamentComponent implements OnInit {

    storedSelectedTournament = fromStorage<AllTournamentsFragment>(StorageKeys.TOURNAMENT_SELECTED_TOURNAMENT);

    tournamentService = inject(TournamentService)

    selectedTournamentFC = new FormControl(this.storedSelectedTournament());

    selectedRoundIdFC = new FormControl<string | null>(null);

    selectedRoundId = toSignal(this.selectedRoundIdFC.valueChanges);

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
                            if (!this.selectedRoundIdFC.value || !tournament?.rounds?.find((t) => t?.id === this.selectedRoundIdFC.value) ) {
                                this.selectedRoundIdFC.setValue(tournament?.rounds![0]?.id || null)
                            }
                        },
                    ),
                )
                : of(null),
        ),
    );

    selectedTournament = toSignal(this.selectedTournament$);

    private router = inject(Router);

    get filterStates() {
        if (this.router.url.includes('history')) {
            return [TournamentState.Ended];
        } else {
            return [TournamentState.Progress];
        }
    }

    ngOnInit(): void {
        this.tournamentService.reloadTournaments()
    }

    selectedTournamentRound() {
        return this.selectedTournament()?.rounds?.find(
            (round) => round?.id === this.selectedRoundIdFC.value,
        );
    }

    nextRound() {

        if(!this.selectedTournament()?.rounds) {
            return;
        }

        const currentIndex = this.selectedTournament()?.rounds?.findIndex(
            (round) => round?.id === this.selectedRoundIdFC.value,
        )

        const nextIndex = Math.max(currentIndex || 0, this.selectedTournament()?.rounds?.length || 0 -1);
        const nextId = this.selectedTournament()?.rounds![nextIndex + 1]?.id;

        if(nextId) {
            this.selectedRoundIdFC.setValue(nextId);
        }

    }

    prevRound() {

        if(!this.selectedTournament()?.rounds) {
            return;
        }

        const currentIndex = this.selectedTournament()?.rounds?.findIndex(
            (round) => round?.id === this.selectedRoundIdFC.value,
        )

        const nextIndex = Math.min(currentIndex || 0, 0);
        const nextId = this.selectedTournament()?.rounds![nextIndex - 1]?.id;

        if(nextId) {
            this.selectedRoundIdFC.setValue(nextId);
        }
    }

}
