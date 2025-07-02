import { AsyncPipe } from '@angular/common';
import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatStepperModule } from '@angular/material/stepper';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Router, RouterModule } from '@angular/router';
import { AllSeasonsFragment, Season, SeasonState, Team } from '@liga-manager-api/graphql';
import { APP_ROUTES } from '@liga-manager-ui';
import { SeasonChooserComponent } from '@liga-manager-ui/components';
import { CypressSelectorDirective } from '@liga-manager-ui/directives';
import { SeasonService } from '@liga-manager-ui/services';
import { TranslateModule } from '@ngx-translate/core';
import { startWith, map, switchMap, BehaviorSubject } from 'rxjs';
import { CreateNewSeasonComponent } from './create-new-season';
import { MANAGE_SEASON_ROUTES } from './manage-seasons.routes.enum';
import { ManageTeamsComponent } from './manage-teams';
import { takeUntilDestroyed, toSignal } from '@angular/core/rxjs-interop';
import { sortArrayBy } from '@liga-manager-ui/utils';

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
    ],
})
export class ManageSeasonsComponent implements OnInit {

    MANAGE_SEASON_ROUTES = MANAGE_SEASON_ROUTES;

    SeasonState = SeasonState;

    selectedSeasonFC = new FormControl<Season | undefined | null>(
        this.seasonService.manageSeason,
    );

    seasonTrigger$ = new BehaviorSubject(this.selectedSeasonFC.value?.id);

    season$ = 
        this.seasonTrigger$.pipe(
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
        )

    destroyRef = inject(DestroyRef);

    constructor(
        private dialog: MatDialog,
        private seasonService: SeasonService,
    ) {}

    ngOnInit(): void {
        this.selectedSeasonFC.valueChanges.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((season) => this.seasonTrigger$.next(season?.id))
    }

    createSeason() {
        this.dialog.open(CreateNewSeasonComponent);
    }

}
