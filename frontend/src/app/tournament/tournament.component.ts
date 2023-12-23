import { AsyncPipe } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatToolbarModule } from '@angular/material/toolbar';
import { AllTournamentsFragment, Match, Tournament } from '@api/graphql';
import { TournamentChooserComponent, MatchComponent } from '@lima/shared/components';
import { CustomDateModule, SortByPipe } from '@lima/shared/pipes';
import { TournamentService } from '@lima/shared/services';
import { TranslateModule } from '@ngx-translate/core';
import { LocalStorage } from 'ngx-webstorage';
import { of, startWith, switchMap, tap } from 'rxjs';

@Component({
    selector: 'lima-tournament',
    templateUrl: './tournament.component.html',
    imports: [
        MatToolbarModule,
        TournamentChooserComponent,
        AsyncPipe,
        TranslateModule,
        CustomDateModule,
        MatchComponent,
        SortByPipe,
    ],
    standalone: true,
})
export class TournamentComponent {

    @LocalStorage('TournamentComponent')
    selectedTournamentLS!: AllTournamentsFragment;

    selectedTournamentFC = new FormControl<Tournament | null>(this.selectedTournamentLS);

    selectedTournament$ = this.selectedTournamentFC.valueChanges.pipe(
        startWith(this.selectedTournamentLS),
        tap(
            (tournament) => {
                if (tournament) {
                    this.selectedTournamentLS = tournament;
                }
            },
        ),
        switchMap(
            (tournament) => tournament ? this.tournamentService.getTournamentById$(tournament?.id) : of(null),
        ),
    );

    constructor(
        public tournamentService: TournamentService,
        private dialog: MatDialog,
    ) {

    }

    filterMatches(matches: Match[]) {
        return matches
    }

}
