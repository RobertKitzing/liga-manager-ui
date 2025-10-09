/* eslint-disable @typescript-eslint/no-non-null-asserted-optional-chain */
import {
    animate,
    state,
    style,
    transition,
    trigger,
} from '@angular/animations';
import { Component, DestroyRef, inject, input, OnInit, signal } from '@angular/core';
import { SeasonService } from '@liga-manager-ui/services';
import { NgClass, AsyncPipe } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { TruncatePipe } from '@liga-manager-ui/pipes';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { SeasonChooserComponent, TeamLogoComponent } from '@liga-manager-ui/components';
import { RankingPenalty, RankingPosition, SeasonState } from '@liga-manager-api/graphql';
import { BehaviorSubject, firstValueFrom, fromEvent, map, of, Subject, switchMap, tap } from 'rxjs';
import { MatSortModule, Sort } from '@angular/material/sort';
import { MatCardModule } from '@angular/material/card';
import { takeUntilDestroyed, toObservable } from '@angular/core/rxjs-interop';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { dispatch, Store } from '@ngxs/store';
import { SetSelectedSeason, SelectedItemsSelectors, SelectedContextTypes } from '@liga-manager-ui/states';

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
        MatIconModule,
        MatButtonModule,
        ReactiveFormsModule,
    ],
})
export class TableComponent implements OnInit {

    viewContext = input<SelectedContextTypes>('progress');

    private dispatchSetSelectedSeason = dispatch(SetSelectedSeason);

    private seasonService = inject(SeasonService);

    private store = inject(Store);

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

    formGroup = new FormGroup({
        selectedSeasonFC: new FormControl<string>(''),
        novelName: new FormControl(),
    });

    selectedSeasonFC = new FormControl<string>('');

    sortRanking = new BehaviorSubject<Sort>({
        active: 'sort_index',
        direction: 'asc',
    });

    SeasonState = SeasonState;

    penalties = signal<RankingPenalty[]>([]);

    private destroyRef = inject(DestroyRef);

    ranking$ = toObservable(this.viewContext).pipe(
        switchMap(
            (sesonContext) => this.sortRanking.pipe(
                switchMap((sort) =>
                    this.store.select(SelectedItemsSelectors.selectedSeasonId(sesonContext)).pipe(
                        tap((selectedSeasonId) => {
                            if (selectedSeasonId) {
                                this.seasonService.refetchRankingById(selectedSeasonId);
                                this.selectedSeasonFC.setValue(selectedSeasonId, { emitEvent: false });
                            }
                        }),
                        switchMap((selectedSeasonId) =>
                            selectedSeasonId
                                ? this.seasonService.getRankingById$(selectedSeasonId)
                                : of(null),
                        ),
                        map((ranking) => {
                            this.penalties.set(ranking?.penalties as RankingPenalty[]);

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
            ),
        ),
    );

    constructor(
    ) {
        fromEvent(window, 'resize')
            .pipe(
                takeUntilDestroyed(this.destroyRef),
            ).subscribe(() => this.expandedElement.set(undefined));
    }

    ngOnInit(): void {
        this.refresh();
        this.selectedSeasonFC.valueChanges.pipe(
            takeUntilDestroyed(this.destroyRef),
        ).subscribe(
            (selectedSeasonId) => {
                this.dispatchSetSelectedSeason(this.viewContext(), selectedSeasonId);
            },
        );
    }

    async refresh(event?: Subject<void>) {
        await firstValueFrom(this.seasonService.reloadSeasons());
        event?.next();
    }

    get filterSeasonStates() {
        if (this.viewContext() === 'history') {
            return [SeasonState.Ended];
        } else {
            return [SeasonState.Progress];
        }
    }

    sortData(event: Sort) {
        this.sortRanking.next(event);
    }

    compare(a: number | string, b: number | string, isAsc?: boolean) {
        return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
    }

    getPenaltiesForTeam(teamId: string) {
        return this.penalties()?.filter((t) => t?.team.id === teamId);
    }

}
