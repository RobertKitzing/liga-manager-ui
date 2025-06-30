import { AsyncPipe } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {
    SeasonChooserComponent,
    TeamContactComponent,
} from '@liga-manager-ui/components';
import {
    SeasonService,
    TeamService,
    TournamentService,
} from '@liga-manager-ui/services';
import { TranslateModule } from '@ngx-translate/core';
import { combineLatest, map, of, startWith, switchMap } from 'rxjs';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatToolbarModule } from '@angular/material/toolbar';
import { AllSeasonsFragment, SeasonState } from '@liga-manager-api/graphql';
import { SortByPipe } from '@liga-manager-ui/pipes';

@Component({
    selector: 'lima-contacs',
    templateUrl: './contacs.component.html',
    imports: [
        AsyncPipe,
        TeamContactComponent,
        MatFormFieldModule,
        MatInputModule,
        ReactiveFormsModule,
        TranslateModule,
        MatCheckboxModule,
        FormsModule,
        SeasonChooserComponent,
        MatToolbarModule,
        SortByPipe,
    ],
})
export class ContacsComponent {

    searchTeam = new FormControl<string | null>(null);

    selectedSeasonFC = new FormControl<AllSeasonsFragment | null>(null);

    SeasonState = SeasonState;

    teams$ = combineLatest([
        this.searchTeam.valueChanges.pipe(startWith(null)),
        this.selectedSeasonFC.valueChanges.pipe(startWith(null)),
    ]).pipe(
        switchMap(([searchTeam, selectedSeason]) => {
            let teams$;
            if (!selectedSeason) {
                teams$ = this.teamService.allTeams$;
            } else {
                teams$ = this.seasonService
                    .getSeasonById$(selectedSeason.id)
                    .pipe(map((season) => season?.teams));
            }
            return teams$.pipe(
                map((teams) =>
                    !searchTeam
                        ? teams
                        : teams?.filter((t) =>
                            t?.name.toLowerCase().includes(searchTeam),
                        ),
                ),
            );
        }),
    );

    season$ = this.selectedSeasonFC.valueChanges.pipe(
        switchMap((selectedSeason) =>
            selectedSeason
                ? this.seasonService.getSeasonById$(selectedSeason.id)
                : of(null),
        ),
    );

    onlyCurrentSeason = false;

    constructor(
        private teamService: TeamService,
        private seasonService: SeasonService,
        private tournamentService: TournamentService,
    ) {}

}
