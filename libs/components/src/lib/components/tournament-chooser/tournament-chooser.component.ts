import { AsyncPipe } from '@angular/common';
import { Component, inject, input } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { AllTournamentsFragment, TournamentState } from '@liga-manager-api/graphql';
import { TournamentService } from '@liga-manager-ui/services';
import { TranslateModule } from '@ngx-translate/core';
import { map } from 'rxjs';

@Component({
    selector: 'lima-tournament-chooser',
    standalone: true,
    imports: [AsyncPipe, ReactiveFormsModule, MatSelectModule, TranslateModule],
    templateUrl: './tournament-chooser.component.html',
})
export class TournamentChooserComponent {

    selectedTournamentFC = input.required<FormControl<AllTournamentsFragment | null>>();

    filterStates = input<TournamentState[] | null>(null);

    clearable = input<boolean>(false);

    tournamentService = inject(TournamentService);

    tournamentList$ = this.tournamentService.allTournaments$.pipe(
        map(
            (tournamentList) =>
                tournamentList.filter(
                    (tournament) => {
                        if (!this.filterStates()) {
                            return true;
                        }
                        return this.filterStates()?.includes(tournament.state);
                    },
                ),
        ),
    );

}
