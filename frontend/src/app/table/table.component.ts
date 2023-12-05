import {
    animate,
    state,
    style,
    transition,
    trigger,
} from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, iif, map, of, switchMap } from 'rxjs';
import { RankingPosition } from 'src/api/graphql';
import { SeasonChooserModes, SeasonChooserModule } from '../shared/components';
import { RankingService, SeasonService } from '@lima/shared/services';
import { NgClass, AsyncPipe } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { TruncatePipe } from '@lima/shared/pipes';

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
        MatToolbarModule,
        SeasonChooserModule,
        MatTableModule,
        TranslateModule,
        NgClass,
        AsyncPipe,
        TruncatePipe,
    ],
})
export class TableComponent implements OnInit {

    seasonMode: SeasonChooserModes = 'progressSeason';

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

    rankingTrigger$ = new BehaviorSubject<null>(null);

    ranking$ = this.rankingTrigger$.pipe(
        switchMap(() =>
            iif(
                () => this.seasonMode === 'progressSeason',
                this.seasonService.progressSeason$,
                this.seasonService.historySeason$,
            ),
        ),
        switchMap((season) => {
            return season?.id
                ? this.rankingService.getRanking$({ id: season.id })
                : of(null);
        }),
        map((ranking) => ranking?.positions),
    );

    constructor(
        private rankingService: RankingService,
        private seasonService: SeasonService,
        private router: Router,
    ) {}

    ngOnInit(): void {
        if (this.router.url.includes('history')) {
            this.seasonMode = 'historySeason';
        }
    }

}
