/* eslint-disable @typescript-eslint/no-non-null-asserted-optional-chain */
import {
    animate,
    state,
    style,
    transition,
    trigger,
} from '@angular/animations';
import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { Router } from '@angular/router';
import { SeasonService } from '@liga-manager-ui/services';
import { NgClass, AsyncPipe } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { TruncatePipe } from '@liga-manager-ui/pipes';
import { FormControl } from '@angular/forms';
import { SeasonChooserComponent, TeamLogoComponent } from '@liga-manager-ui/components';
import { AllSeasonsFragment, RankingPosition, SeasonState } from '@liga-manager-api/graphql';
import { BehaviorSubject, firstValueFrom, fromEvent, map, of, startWith, Subject, switchMap, tap } from 'rxjs';
import { MatSortModule, Sort } from '@angular/material/sort';
import { MatCardModule } from '@angular/material/card';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { NgxPullToRefreshComponent } from 'ngx-pull-to-refresh';

@Component({
    selector: 'lima-table',
    templateUrl: './table.component.html',
    styles: [],
    animations: [
        trigger('detailExpand', [
            state('collapsed', style({ height: '0px', minHeight: '0' })),
            state('expanded', style({ height: '*' })),
            transition(
                'expanded <=> collapsed',
                animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)'),
            ),
        ]),
    ],
    standalone: true,
    imports: [
        MatToolbarModule,
        SeasonChooserComponent,
        MatTableModule,
        TranslateModule,
        NgClass,
        AsyncPipe,
        TruncatePipe,
        MatSortModule,
        MatCardModule,
        TeamLogoComponent,
        NgxPullToRefreshComponent,
    ],
})
export class TableComponent implements OnInit {

    displayedColumns: string[] = [
        'position',
        'logo',
        'team',
        'games',
        'wins-draws-losses',
        'goals',
        'goaldiff',
        'points',
    ];

    expandedElement = signal<RankingPosition | undefined>(undefined);

    selectedSeasonFC = new FormControl(this.selectedSeason);

    sortRanking = new BehaviorSubject<Sort>({
        active: 'sort_index',
        direction: 'asc',
    });

    SeasonState = SeasonState;

    ranking$ = this.sortRanking.pipe(
        switchMap((sort) =>
            this.selectedSeasonFC.valueChanges.pipe(
                startWith(this.selectedSeason),
                tap((season) => {
                    if (season) {
                        this.seasonService.refetchRankingById(season.id);
                        this.selectedSeason = season;
                    }
                }),
                switchMap((selectedSeason) =>
                    selectedSeason
                        ? this.seasonService.getRankingById$(selectedSeason.id)
                        : of(null),
                ),
                map((ranking) => {
                    if (!sort.direction) {
                        return ranking?.positions;
                    }

                    return [...(ranking?.positions || [])].sort((a, b) => {
                        const isAsc = sort.direction === 'asc';
                        switch (sort.active) {
                            case 'sort_index':
                                return this.compare(
                                    a?.sort_index || 0,
                                    b?.sort_index || 0,
                                    isAsc,
                                );
                            case 'team_name':
                                return this.compare(
                                    a?.team.name || '',
                                    b?.team.name || '',
                                    isAsc,
                                );
                            case 'matches':
                                return this.compare(
                                    a?.matches || 0,
                                    b?.matches || 0,
                                    isAsc,
                                );
                            case 'goaldiff': {
                                const agd =
                                a?.scored_goals! - a?.conceded_goals!;
                                const bgd =
                                b?.scored_goals! - b?.conceded_goals!;
                                return this.compare(agd, bgd, isAsc);
                            }
                            default:
                                return 0;
                        }
                    });
                }),
            ),
        ),
    );

    constructor(
        private router: Router,
        private seasonService: SeasonService,
    ) {
        fromEvent(window, 'resize')
            .pipe(
                takeUntilDestroyed(inject(DestroyRef)),
            ).subscribe(() => this.expandedElement.set(undefined));
    }

    ngOnInit(): void {
        this.refresh();
    }

    async refresh(event?: Subject<void>) {
        await firstValueFrom(this.seasonService.reloadSeasons());
        event?.next();
    }

    get filterSeasonStates() {
        if (this.router.url.includes('history')) {
            return [SeasonState.Ended];
        } else {
            return [SeasonState.Progress];
        }
    }

    get selectedSeason() {
        if (this.router.url.includes('history')) {
            return this.seasonService.historySeason();
        } else {
            return this.seasonService.progressSeason();
        }
    }

    set selectedSeason(season: AllSeasonsFragment | null) {
        if (this.router.url.includes('history')) {
            this.seasonService.historySeason.set(season);
        } else {
            this.seasonService.progressSeason.set(season);
        }
    }

    sortData(event: Sort) {
        this.sortRanking.next(event);
    }

    compare(a: number | string, b: number | string, isAsc?: boolean) {
        return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
    }

}
