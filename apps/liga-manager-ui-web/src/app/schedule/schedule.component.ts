import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { Router } from '@angular/router';
import { firstValueFrom, fromEvent, of, startWith, Subject, switchMap, tap } from 'rxjs';
import { AuthenticationService, fromStorage, GestureService, SeasonService } from '@liga-manager-ui/services';
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
import { AllSeasonsFragment, Match, MatchDay, SeasonState } from '@liga-manager-api/graphql';
import { FormControl } from '@angular/forms';
import { StorageKeys } from '@liga-manager-ui/common';
import { MatCardModule } from '@angular/material/card';
import { takeUntilDestroyed, toSignal } from '@angular/core/rxjs-interop';
import { NgxPullToRefreshComponent } from 'ngx-pull-to-refresh';

@Component({
    selector: 'lima-schedule',
    templateUrl: './schedule.component.html',
    standalone: true,
    imports: [
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
    ],
})
export class ScheduleComponent implements OnInit {

    animateEnter = signal<'slide-in-ltr' | 'slide-in-rtl' | undefined>(undefined);

    animateLeave = signal<'slide-out-ltr' | 'slide-out-rtl' | undefined>(undefined);

    private gestureService = inject(GestureService);

    private destroyRef = inject(DestroyRef);

    private seasonService = inject(SeasonService);

    private router = inject(Router);

    authService = inject(AuthenticationService);

    selectedMatchDay = fromStorage<MatchDay>(StorageKeys.SCHEDULE_SELECTED_MATCH_DAY);

    selectedTeamId = fromStorage<string>(StorageKeys.SCHEDULE_SELECTED_TEAM_ID, '0');

    selectedSeasonFC = new FormControl(this.selectedSeason);

    season$ = this.selectedSeasonFC.valueChanges.pipe(
        startWith(this.selectedSeason),
        tap((season) => {
            if (season) {
                this.seasonService.refetchSeasonById(season.id);
                this.selectedSeason = season;
            }
        }),
        switchMap((selectedSeason) =>
            selectedSeason
                ? this.seasonService.getSeasonById$(selectedSeason.id).pipe(
                    tap(
                        (season) => {
                            if (!season) {
                                return;
                            }
                            if (!this.selectedMatchDay() || !season?.match_days?.find((t) => t?.id === this.selectedMatchDay()?.id )) {
                                this.selectedMatchDay.set(season!.match_days![0]);
                            }
                        },
                    ),
                )
                : of(null),
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
        fromEvent(document, 'scroll').subscribe(console.log);
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

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    findMatchDay(matchDays: any[]): MatchDay {
        return matchDays.find((x) => x.id === this.selectedMatchDay()?.id );
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    filterMatches(matches: any[]): Match[] {
        return this.selectedTeamId() !== '0'
            ? matches.filter(
                (x) =>
                    x.guest_team.id === this.selectedTeamId() ||
                      x.home_team.id === this.selectedTeamId(),
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

        const currentIndex = matchDays.findIndex((md) => md?.id === this.selectedMatchDay()?.id ) || 0;

        const next = matchDays[currentIndex + 1];

        if(next) {
            this.selectedMatchDay.set(next);
        }
    }

    prevMatchDay() {

        this.animateEnter.set('slide-in-ltr');
        this.animateLeave.set('slide-out-ltr');

        if (!this.season()?.match_days) {
            return;
        }

        const matchDays = this.season()?.match_days || [];

        const currentIndex = matchDays.findIndex((md) => md?.id === this.selectedMatchDay()?.id) || 0;

        const next = matchDays[currentIndex - 1];

        if(next) {
            this.selectedMatchDay.set(next);
        }
    }

    compareMatchDay(a: MatchDay, b: MatchDay) {
        return a.id === b.id;
    }

}
