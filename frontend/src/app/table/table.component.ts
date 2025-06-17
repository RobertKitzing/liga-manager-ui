import {
    animate,
    state,
    style,
    transition,
    trigger,
} from '@angular/animations';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SeasonService } from '@lima/shared/services';
import { NgClass, AsyncPipe } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { TruncatePipe } from '@lima/shared/pipes';
import { TeamLogoPipe } from '@lima/shared/pipes/team-logo';
import { FormControl } from '@angular/forms';
import { SeasonChooserComponent } from '@lima/shared/components';
import { AllSeasonsFragment, RankingPosition, SeasonState } from '@api/graphql';
import { map, of, startWith, switchMap, tap } from 'rxjs';
import { provideAnimations } from '@angular/platform-browser/animations';

@Component({
    selector: 'lima-table',
    templateUrl: './table.component.html',
    styles: [],
    animations: [
        trigger('detailExpand', [
            state('collapsed', style({ height: '0px', minHeight: '0' })),
            state('expanded', style({ height: '*' })),
            transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
        ]),
    ],
    standalone: true,
    imports: [
        TeamLogoPipe,
        MatToolbarModule,
        SeasonChooserComponent,
        MatTableModule,
        TranslateModule,
        NgClass,
        AsyncPipe,
        TruncatePipe,
    ],
    providers: [
        provideAnimations(),
    ],
})
export class TableComponent {

    displayedColumns: string[] = [
        'position',
        'logo',
        'team',
        'games',
        'wins-draws-losses',
        'goals',
        'points',
    ];

    expandedElement!: RankingPosition;

    selectedSeasonFC = new FormControl<AllSeasonsFragment>(this.selectedSeasonLS);

    SeasonState = SeasonState;

    ranking$ = this.selectedSeasonFC.valueChanges.pipe(
        startWith(this.selectedSeasonLS),
        tap(
            (season) => {
                if (season) {
                    this.seasonService.refetchRankingById(season.id)
                    this.selectedSeasonLS = season;
                }
            },
        ),
        switchMap(
            (selectedSeason) => selectedSeason ? this.seasonService.getRankingById$(selectedSeason.id) : of(null),
        ),
        map((ranking) => ranking?.positions),
    );

    constructor(
        private seasonService: SeasonService,
        private router: Router,
    ) {
    }

    get filterSeasonStates() {
        if (this.router.url.includes('history')) {
            return [SeasonState.Ended];
        } else {
            return [SeasonState.Progress];
        }
    }

    get selectedSeasonLS() {
        if (this.router.url.includes('history')) {
            return this.seasonService.historySeason;
        } else {
            return this.seasonService.progressSeason;
        }
    }

    set selectedSeasonLS(season: AllSeasonsFragment) {
        if (this.router.url.includes('history')) {
            this.seasonService.historySeason = season;
        } else {
            this.seasonService.progressSeason = season;
        }
    }

}
