import { AsyncPipe, JsonPipe } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { SeasonChooserComponent, TeamContactComponent, TournamentChooserComponent } from '@lima/shared/components';
import { SeasonService, TeamService, TournamentService } from '@lima/shared/services';
import { TranslateModule } from '@ngx-translate/core';
import { iif, map, of, startWith, switchMap } from 'rxjs';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatToolbarModule } from '@angular/material/toolbar';
import { AllSeasonsFragment, AllTournamentsFragment, SeasonState } from '@api/graphql';
@Component({
    selector: 'lima-contacs',
    templateUrl: './contacs.component.html',
    standalone: true,
    imports: [
        AsyncPipe,
        JsonPipe,
        TeamContactComponent,
        MatFormFieldModule,
        MatInputModule,
        ReactiveFormsModule,
        TranslateModule,
        MatCheckboxModule,
        FormsModule,
        SeasonChooserComponent,
        MatToolbarModule,
        TournamentChooserComponent,
    ],
})
export class ContacsComponent {

    searchTeam = new FormControl();

    selectedSeasonFC = new FormControl<AllSeasonsFragment | null>(null);

    SeasonState = SeasonState;

    teams$ = this.searchTeam.valueChanges.pipe(
        startWith(null),
        switchMap(
            (searchTerm) =>
                !searchTerm
                    ? this.teamService.allTeams$
                    : this.teamService.allTeams$.pipe(
                        map((x) =>
                            x?.filter((y) =>
                                y?.name
                                    .toLocaleLowerCase()
                                    .includes(searchTerm.toLocaleLowerCase()),
                            ),
                        ),
                    ),
        ),
    );

    season$ = this.selectedSeasonFC.valueChanges.pipe(
        switchMap(
            (selectedSeason) => selectedSeason ? this.seasonService.getSeasonById$(selectedSeason.id) : of(null),
        ),
    )

    onlyCurrentSeason = false;

    constructor(
        private teamService: TeamService,
        private seasonService: SeasonService,
        private tournamentService: TournamentService,
    ) {

    }

}
