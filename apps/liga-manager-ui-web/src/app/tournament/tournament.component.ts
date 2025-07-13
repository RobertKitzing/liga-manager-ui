import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatToolbarModule } from '@angular/material/toolbar';
import { AllTournamentsFragment, Match } from '@liga-manager-api/graphql';
import {
    TournamentChooserComponent,
    MatchComponent,
} from '@liga-manager-ui/components';
import { CustomDatePipe, SortByPipe } from '@liga-manager-ui/pipes';
import { TranslateModule } from '@ngx-translate/core';
import { of, startWith, switchMap, tap } from 'rxjs';
import { fromStorage, TournamentService } from '@liga-manager-ui/services';
import { StorageKeys } from '@liga-manager-ui/common';

@Component({
    selector: 'lima-tournament',
    templateUrl: './tournament.component.html',
    imports: [
        MatToolbarModule,
        TournamentChooserComponent,
        AsyncPipe,
        TranslateModule,
        MatchComponent,
        SortByPipe,
        CustomDatePipe,
    ],
    standalone: true,
})
export class TournamentComponent {

    selectedTournament = fromStorage<AllTournamentsFragment>(StorageKeys.TOURNAMENT_SELECTED_TOURNAMENT);

    tournamentService = inject(TournamentService)

    selectedTournamentFC = new FormControl(this.selectedTournament());

    selectedTournament$ = this.selectedTournamentFC.valueChanges.pipe(
        startWith(this.selectedTournament()),
        tap((tournament) => {
            if (tournament) {
                this.selectedTournament.set(tournament);
            }
        }),
        switchMap((tournament) =>
            tournament
                ? this.tournamentService.getTournamentById$(tournament?.id)
                : of(null),
        ),
    );

    filterMatches(matches: Match[]) {
        return matches;
    }

}
