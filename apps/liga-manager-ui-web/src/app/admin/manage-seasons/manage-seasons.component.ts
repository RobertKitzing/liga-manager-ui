import { AsyncPipe } from '@angular/common';
import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatStepperModule, StepperOrientation } from '@angular/material/stepper';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule } from '@angular/router';
import { Season, SeasonState, Team } from '@liga-manager-api/graphql';
import { SeasonChooserComponent } from '@liga-manager-ui/components';
import { TranslateModule } from '@ngx-translate/core';
import { map, switchMap, Observable, tap } from 'rxjs';
import { CreateNewSeasonComponent } from './create-new-season';
import { MANAGE_SEASON_ROUTES } from './manage-seasons.routes.enum';
import { ManageTeamsComponent } from './manage-teams';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { sortArrayBy } from '@liga-manager-ui/utils';
import { ManageMatchdaysComponent } from './manage-matchdays/manage-matchdays.component';
import { ManageMatchesComponent } from './manage-matches/manage-matches.component';
import { ManageScheduleMatchesComponent } from './manage-schedule-matches/manage-schedule-matches.component';
import { ManagePenaltiesComponent } from './manage-penalties/manage-penalties.component';
import { BreakpointObserver } from '@angular/cdk/layout';
import { SeasonService } from '@liga-manager-ui/services';
import { CypressSelectorDirective } from '@liga-manager-ui/directives';
import { MatCardModule } from '@angular/material/card';
import { Store } from '@ngxs/store';
import { DeleteSeason, EndSeason, SelectedItemsSelectors, SetSelectedSeason, StartSeason } from '@liga-manager-ui/states';

@Component({
    selector: 'lima-manage-seasons',
    templateUrl: './manage-seasons.component.html',
    standalone: true,
    imports: [
        MatToolbarModule,
        MatIconModule,
        SeasonChooserComponent,
        MatButtonModule,
        AsyncPipe,
        TranslateModule,
        MatToolbarModule,
        TranslateModule,
        RouterModule,
        MatStepperModule,
        CypressSelectorDirective,
        ManageTeamsComponent,
        ManageMatchdaysComponent,
        ManageMatchesComponent,
        ManageScheduleMatchesComponent,
        ManagePenaltiesComponent,
        MatCardModule,
        ReactiveFormsModule,
    ],
})
export class ManageSeasonsComponent implements OnInit {

    private destroyRef = inject(DestroyRef);

    private dialog = inject(MatDialog);

    private seasonService = inject(SeasonService);

    private store = inject(Store);

    MANAGE_SEASON_ROUTES = MANAGE_SEASON_ROUTES;

    SeasonState = SeasonState;

    selectedSeasonFC = new FormControl<string | undefined>('');

    season$ =
        this.store.select(SelectedItemsSelectors.selectedSeasonId('administration')).pipe(
            tap(
                (seasonId) => this.selectedSeasonFC.setValue(seasonId, { emitEvent: false }),
            ),
            switchMap(
                (id) => this.seasonService.getSeasonById$(id).pipe(
                    map((season) => {
                        if (season) {
                            return {
                                ...season,
                                teams: sortArrayBy(season?.teams as Team[], 'name'),
                            } as Season;
                        }
                        return;
                    }),
                ),
            ),
        );

    stepperOrientation: Observable<StepperOrientation>;

    private destoryRef = inject(DestroyRef);

    constructor() {

        const breakpointObserver = inject(BreakpointObserver);

        this.stepperOrientation = breakpointObserver
            .observe('(min-width: 800px)')
            .pipe(takeUntilDestroyed(this.destoryRef),map(({ matches }) => (matches ? 'horizontal' : 'vertical')));

    }

    ngOnInit(): void {
        this.selectedSeasonFC.valueChanges.pipe(
            takeUntilDestroyed(this.destroyRef)).subscribe((seasonId) => this.store.dispatch( new SetSelectedSeason('administration', seasonId)),
        );
    }

    createSeason() {
        this.dialog.open(CreateNewSeasonComponent);
    }

    endSeason(season_id: string, name: string) {
        this.store.dispatch(new EndSeason({ season_id }, name));
    }

    startSeason(season_id: string, name: string) {
        this.store.dispatch(new StartSeason({ season_id }, name));
    }

    deleteSeason(season_id: string, name: string) {
        this.store.dispatch(new DeleteSeason({ season_id }, name));
    }

}
