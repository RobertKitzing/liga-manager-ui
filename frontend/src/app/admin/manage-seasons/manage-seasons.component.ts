import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { AllSeasonsFragment } from '@api/graphql';
import { SeasonChooserComponent } from '@lima/shared/components';
import { CreateNewSeasonComponent } from './create-new-season';
import { LocalStorage } from 'ngx-webstorage';
import { of, startWith, switchMap, tap } from 'rxjs';
import { SeasonService } from '@lima/shared/services';
import { AsyncPipe } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

const SELECTED_MANAGE_SEASON_KEY = 'SELECTED_MANAGE_SEASON';

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
    ],
})
export class ManageSeasonsComponent {

    @LocalStorage(SELECTED_MANAGE_SEASON_KEY)
    manageSeason!: AllSeasonsFragment;

    selectedSeasonFC = new FormControl<AllSeasonsFragment>(this.manageSeason);

    season$ = this.selectedSeasonFC.valueChanges.pipe(
        startWith(this.manageSeason),
        tap(
            (season) => {
                if (season) {
                    this.manageSeason = season;
                }
            },
        ),
        switchMap(
            (season) => season ? this.seasonService.getSeasonById$(season?.id) : of(null),
        ),
    );

    constructor(
        private dialog: MatDialog,
        private seasonService: SeasonService,
    ) {

    }

    createSeason() {
        this.dialog.open(CreateNewSeasonComponent)
    }

}
