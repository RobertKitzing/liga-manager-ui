import { AsyncPipe } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {
    SeasonChooserComponent,
    TeamContactComponent,
    TeamSearchComponent,
} from '@liga-manager-ui/components';
import {
    SeasonService,
} from '@liga-manager-ui/services';
import { TranslateModule } from '@ngx-translate/core';
import { combineLatest, map, of, startWith, switchMap } from 'rxjs';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Maybe, SeasonState, Team } from '@liga-manager-api/graphql';
import { SortByPipe } from '@liga-manager-ui/pipes';
import { Store } from '@ngxs/store';
import { TeamSelectors } from '@liga-manager-ui/states';

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
        TeamSearchComponent,
    ],
})
export class ContacsComponent {

    private store = inject(Store);

    private seasonService = inject(SeasonService);

    selectedSeasonFC = new FormControl<string>('');

    SeasonState = SeasonState;

    teams$ = combineLatest([
        this.selectedSeasonFC.valueChanges.pipe(startWith(null)),
    ]).pipe(
        switchMap(([selectedSeasonId]) => {
            let teams$;
            if (!selectedSeasonId) {
                teams$ = this.store.select(TeamSelectors.teams);
            } else {
                teams$ = this.seasonService
                    .getSeasonById$(selectedSeasonId)
                    .pipe(map((season) => season?.teams));
            }
            return teams$;
        }),
    );

    teams = signal<Maybe<Maybe<Team>[]> | undefined>( []);

    season$ = this.selectedSeasonFC.valueChanges.pipe(
        switchMap((selectedSeasonId) =>
            selectedSeasonId
                ? this.seasonService.getSeasonById$(selectedSeasonId)
                : of(null),
        ),
    );

}
