import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { of, startWith, switchMap, tap } from 'rxjs';
import { AuthenticationService, fromStorage, SeasonService } from '@liga-manager-ui/services';
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
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
    selector: 'lima-schedule',
    templateUrl: './schedule.component.html',
    styles: [],
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
    ],
})
export class ScheduleComponent {

    selectedMatchDayId = fromStorage<string>(StorageKeys.SCHEDULE_SELECTED_MATCH_DAY_ID)

    selectedTeamId = fromStorage<string>(StorageKeys.SCHEDULE_SELECTED_TEAM_ID, '0')

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
                            if (!this.selectedMatchDayId() || !season?.match_days?.find((t) => t?.id === this.selectedMatchDayId())) {
                                this.selectedMatchDayId.set(season!.match_days![0]?.id || null);
                            }
                        },
                    ),
                )
                : of(null),
        ),
    );

    season = toSignal(this.season$);

    constructor(
        private seasonService: SeasonService,
        private router: Router,
        public authService: AuthenticationService,
    ) {}

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
            this.seasonService.historySeason.set(season)
        } else {
            this.seasonService.progressSeason.set(season)
        }
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    findMatchDay(matchDays: any[]): MatchDay {
        return matchDays.find((x) => x.id === this.selectedMatchDayId())
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

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    nextMatchDay(season: any) {
        if (!season.match_days) {
            return;
        }

        const matchDays = (season.match_days as MatchDay[])

        const currentIndex = matchDays.findIndex((md) => md?.id === this.selectedMatchDayId());

        if (currentIndex === season.match_days.length - 1) {
            return;
        }

        this.selectedMatchDayId.set(season.match_days[currentIndex +1]?.id || null)
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    prevMatchDay(season: any) {
        if (!season.match_days) {
            return;
        }
        const currentIndex = season.match_days.findIndex((md: any) => md?.id === this.selectedMatchDayId());
        if (currentIndex === 0) {
            return;
        }

        this.selectedMatchDayId.set(season.match_days[currentIndex - 1]?.id || null)
    }

}
