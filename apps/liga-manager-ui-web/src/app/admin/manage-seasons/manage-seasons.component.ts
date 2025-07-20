import { AsyncPipe } from '@angular/common';
import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatStepperModule, StepperOrientation } from '@angular/material/stepper';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule } from '@angular/router';
import { Season, SeasonState, Team } from '@liga-manager-api/graphql';
import { ConfirmComponent, defaultDialogConfig, SeasonChooserComponent } from '@liga-manager-ui/components';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { map, switchMap, BehaviorSubject, Observable } from 'rxjs';
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
import { NotificationService, SeasonService } from '@liga-manager-ui/services';
import { CypressSelectorDirective } from '@liga-manager-ui/directives';
import { marker } from '@colsen1991/ngx-translate-extract-marker';

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
    ],
})
export class ManageSeasonsComponent implements OnInit {

    private destroyRef = inject(DestroyRef);

    private dialog = inject(MatDialog);

    private seasonService = inject(SeasonService);

    private notificationService = inject(NotificationService);

    private translateService = inject(TranslateService);

    MANAGE_SEASON_ROUTES = MANAGE_SEASON_ROUTES;

    SeasonState = SeasonState;

    selectedSeasonFC = new FormControl(this.seasonService.manageSeason());

    seasonTrigger$ = new BehaviorSubject(this.selectedSeasonFC.value?.id);

    season$ =
        this.seasonTrigger$.pipe(
            switchMap(
                (id) => this.seasonService.getSeasonById$(id).pipe(
                    map((season) => {
                        if (season) {
                            this.seasonService.manageSeason.set(season as Season)
                            return {
                                ...season,
                                teams: sortArrayBy(season?.teams as Team[], 'name'),
                            } as Season;
                        }
                        return;
                    }),
                ),
            ),
        )

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
            takeUntilDestroyed(this.destroyRef)).subscribe((season) => this.seasonTrigger$.next(season?.id),
        )
    }

    createSeason() {
        this.dialog.open(CreateNewSeasonComponent);
    }

    endSeason(seasonId: string) {

        this.dialog.open(ConfirmComponent,
            {
                ...defaultDialogConfig,
                data: {
                    body: marker('ARE_YOU_SURE_TO_DELETE_THIS_SEASON'),
                },
            },
        )
            .afterClosed()
            .pipe(takeUntilDestroyed(this.destroyRef))
            .subscribe(
                (result) => {
                    if (result) {
                        try {
                            this.seasonService.endSeason(seasonId);
                            this.notificationService.showSuccessNotification(
                                this.translateService.instant('END_SEASON_SUCCESS'),
                            );
                        } catch (_error) {
                            this.notificationService.showErrorNotification(
                                this.translateService.instant('END_SEASON_ERROR'),
                            );
                        }
                    }
                },
            );
    }

    async startSeason(seasonId: string) {
        try {
            await this.seasonService.startSeason(seasonId);
            this.notificationService.showSuccessNotification(
                this.translateService.instant('START_SEASON_SUCCESS'),
            );
        } catch (_error) {
            this.notificationService.showErrorNotification(
                this.translateService.instant('START_SEASON_ERROR'),
            );
        }
    }

    deleteSeason(seasonId: string) {
        this.dialog.open(ConfirmComponent)
            .afterClosed()
            .pipe(takeUntilDestroyed(this.destroyRef))
            .subscribe(
                (result) => {
                    if (result) {
                        try {
                            this.seasonService.deleteSeason(seasonId);
                            this.notificationService.showSuccessNotification(
                                this.translateService.instant('DELETE_SEASON_SUCCESS'),
                            );
                        } catch (_error) {
                            this.notificationService.showErrorNotification(
                                this.translateService.instant('DELETE_SEASON_ERROR'),
                            );
                        }
                    }
                },
            );
    }

}
