import { Component, DestroyRef, inject, input, OnInit, signal } from '@angular/core';
import { firstValueFrom, of, Subject, switchMap, tap } from 'rxjs';
import { GestureService, SeasonService } from '@liga-manager-ui/services';
import { MatMenuModule } from '@angular/material/menu';
import { TranslateModule } from '@ngx-translate/core';
import { MatOptionModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { CustomDatePipe, SortByPipe } from '@liga-manager-ui/pipes';
import {
    MatchComponent,
    SeasonChooserComponent,
} from '@liga-manager-ui/components';
import { Match, MatchDay, SeasonState } from '@liga-manager-api/graphql';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { takeUntilDestroyed, toObservable, toSignal } from '@angular/core/rxjs-interop';
import { NgxPullToRefreshComponent } from 'ngx-pull-to-refresh';
import { dispatch, Store } from '@ngxs/store';
import { SetSelectedMatchDay, SetSelectedSeason, SelectedContextTypes, SetSelectedTeam, SelectedItemsSelectors } from '@liga-manager-ui/states';
import { CypressSelectorDirective } from '@liga-manager-ui/directives';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

@Component({
    selector: 'lima-schedule',
    templateUrl: './schedule.component.html',
    standalone: true,
    imports: [
        FormsModule,
        MatToolbarModule,
        SeasonChooserComponent,
        MatButtonModule,
        MatIconModule,
        MatSelectModule,
        MatOptionModule,
        TranslateModule,
        MatMenuModule,
        CustomDatePipe,
        MatchComponent,
        MatCardModule,
        SortByPipe,
        NgxPullToRefreshComponent,
        ReactiveFormsModule,
        CypressSelectorDirective,
        MatSlideToggleModule,
    ],
})
export class ScheduleComponent implements OnInit {

    private dispatchSetSelectedMatchDay = dispatch(SetSelectedMatchDay);

    private dispatchSetSelectedSeason = dispatch(SetSelectedSeason);

    private dispatchSetSelectedTeam = dispatch(SetSelectedTeam);

    viewContext = input<SelectedContextTypes>('progress');

    animateEnter = signal<'slide-in-ltr' | 'slide-in-rtl' | undefined>(undefined);

    animateLeave = signal<'slide-out-ltr' | 'slide-out-rtl' | undefined>(undefined);

    private gestureService = inject(GestureService);

    private destroyRef = inject(DestroyRef);

    private seasonService = inject(SeasonService);

    private store = inject(Store);

    showCanceledMatches = false;

    selectedMatchDayFC = new FormControl();

    selectedTeamIdFC = new FormControl('0');

    selectedSeasonFC = new FormControl<string>('');

    season$ = toObservable(this.viewContext).pipe(
        switchMap(
            (viewContext) => this.store.select(SelectedItemsSelectors.selectedSeasonId(viewContext)).pipe(
                tap((selectedSeasonId) => {
                    if (selectedSeasonId) {
                        this.seasonService.refetchRankingById(selectedSeasonId);
                        this.selectedSeasonFC.setValue(selectedSeasonId, { emitEvent: false });
                    }
                }),
                switchMap((selectedSeasonId) =>
                    selectedSeasonId
                        ? this.seasonService.getSeasonById$(selectedSeasonId).pipe(
                            tap(
                                (season) => {
                                    if (!season) {
                                        return;
                                    }
                                    const stateMatchDay = this.store.selectSnapshot(SelectedItemsSelectors.selectedMatchDayId(this.viewContext()));
                                    let selectedMatchDay = season!.match_days![0]?.id;
                                    if (stateMatchDay && season.match_days?.find((md) => md?.id === stateMatchDay)) {
                                        selectedMatchDay = stateMatchDay;
                                    }
                                    this.selectedMatchDayFC.setValue(selectedMatchDay);
                                },
                            ),
                        )
                        : of(null),
                ),
            ),
        ),
    );

    season = toSignal(this.season$);

    ngOnInit(): void {
        this.refresh();
        this.gestureService.swiped.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(
            (event) => {
                if (event.direction === 'Left') {
                    this.nextMatchDay();
                }
                if (event.direction === 'Right') {
                    this.prevMatchDay();
                }
            },
        );
        this.selectedSeasonFC.valueChanges.pipe(
            takeUntilDestroyed(this.destroyRef),
        ).subscribe(
            (selectedSeasonId) => {
                this.dispatchSetSelectedSeason(this.viewContext(), selectedSeasonId);
            },
        );
        this.selectedMatchDayFC.valueChanges.pipe(
            takeUntilDestroyed(this.destroyRef),
        ).subscribe(
            (selectedMatchDayId) => {
                this.dispatchSetSelectedMatchDay(this.viewContext(), selectedMatchDayId);
            },
        );
        this.selectedTeamIdFC.valueChanges.pipe(
            takeUntilDestroyed(this.destroyRef),
        ).subscribe(
            (selectedTeamId) => {
                this.dispatchSetSelectedTeam(this.viewContext(), selectedTeamId);
            },
        );
        const teamId = this.store.selectSnapshot(SelectedItemsSelectors.selectedTeamId(this.viewContext()));
        this.selectedTeamIdFC.setValue(teamId || '0');
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

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    findMatchDay(matchDays: any[]): MatchDay {
        return matchDays.find((x) => x.id === this.selectedMatchDayFC.value );
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    filterMatches(matches: any[]): Match[] {
        return this.selectedTeamIdFC.value !== '0'
            ? matches.filter(
                (x) =>
                    x.guest_team.id === this.selectedTeamIdFC.value ||
                      x.home_team.id === this.selectedTeamIdFC.value,
            )
            : matches;
    }

    nextMatchDay() {

        this.animateEnter.set('slide-in-rtl');
        this.animateLeave.set('slide-out-rtl');

        if (!this.season()?.match_days) {
            return;
        }

        const matchDays = this.season()?.match_days || [];

        const currentIndex = matchDays.findIndex((md) => md?.id === this.selectedMatchDayFC.value ) || 0;

        const next = matchDays[currentIndex + 1];

        if(next) {
            this.selectedMatchDayFC.setValue(next.id);
        }
    }

    prevMatchDay() {

        this.animateEnter.set('slide-in-ltr');
        this.animateLeave.set('slide-out-ltr');

        if (!this.season()?.match_days) {
            return;
        }

        const matchDays = this.season()?.match_days || [];

        const currentIndex = matchDays.findIndex((md) => md?.id === this.selectedMatchDayFC.value) || 0;

        const next = matchDays[currentIndex - 1];

        if(next) {
            this.selectedMatchDayFC.setValue(next.id);
        }
    }

    setSelectedMatchDay(matchDayId?: string) {
        this.dispatchSetSelectedMatchDay(this.viewContext(), matchDayId);
    }

    compareMatchDay(a: MatchDay, b: MatchDay) {
        return a.id === b.id;
    }

}
