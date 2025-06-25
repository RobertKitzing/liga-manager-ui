import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { AllSeasonsFragment, SeasonState } from '@api/graphql';
import { SeasonChooserComponent } from '@lima/shared/components';
import { CreateNewSeasonComponent } from './create-new-season';
import { of, startWith, switchMap, tap } from 'rxjs';
import { SeasonService } from '@lima/shared/services';
import { AsyncPipe } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { Router, RouterModule } from '@angular/router';
import { ADMIN_ROUTES } from '../admin.routes.enum';
import { APP_ROUTES } from '@lima/app.routes.enum';
import { MANAGE_SEASON_ROUTES } from './manage-seasons.routes.enum';
import { CypressSelectorDirective } from '@lima/shared/directives';

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
        CypressSelectorDirective,
    ],
})
export class ManageSeasonsComponent {

    MANAGE_SEASON_ROUTES = MANAGE_SEASON_ROUTES;

    SeasonState = SeasonState;

    selectedSeasonFC = new FormControl<AllSeasonsFragment | undefined | null>(this.seasonService.manageSeason);

    season$ = this.selectedSeasonFC.valueChanges.pipe(
        startWith(this.seasonService.manageSeason),
        tap(
            (season) => {
                this.seasonService.manageSeason = season;
                if (season?.id) {
                    this.router.navigateByUrl(`${APP_ROUTES.ADMIN}/${ADMIN_ROUTES.SEASONS}/${season.id}`);
                } else {
                    this.router.navigateByUrl(`${APP_ROUTES.ADMIN}/${ADMIN_ROUTES.SEASONS}`)
                }
            },
        ),
    );

    constructor(
        private dialog: MatDialog,
        private seasonService: SeasonService,
        private router: Router,
    ) {

    }

    createSeason() {
        this.dialog.open(CreateNewSeasonComponent)
    }

}
