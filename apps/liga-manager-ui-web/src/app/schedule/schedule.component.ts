import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { of, startWith, switchMap, tap } from 'rxjs';
import { AuthenticationService, SeasonService } from '@liga-manager-ui/services';
import { AsyncPipe, NgClass } from '@angular/common';
import { MatMenuModule } from '@angular/material/menu';
import { TranslateModule } from '@ngx-translate/core';
import { MatOptionModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { CustomDatePipe } from '@liga-manager-ui/pipes';
import {
    MatchComponent,
    SeasonChooserComponent,
} from '@liga-manager-ui/components';
import { AllSeasonsFragment, SeasonState } from '@liga-manager-api/graphql';
import { FormControl } from '@angular/forms';
import { LocalStorage } from 'ngx-webstorage';

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
        AsyncPipe,
        CustomDatePipe,
        NgClass,
        MatchComponent,
    ],
})
export class ScheduleComponent implements OnInit {

    @LocalStorage('selectedMatchDayId', '0') selectedMatchDayId!: string;

    @LocalStorage('selectedTeamId', '0') selectedTeamId!: string;

    selectedSeasonFC = new FormControl<AllSeasonsFragment>(
        this.selectedSeasonLS,
    );

    season$ = this.selectedSeasonFC.valueChanges.pipe(
        startWith(this.selectedSeasonLS),
        tap((season) => {
            if (season) {
                this.seasonService.refetchSeasonById(season.id);
                this.selectedSeasonLS = season;
            }
        }),
        switchMap((selectedSeason) =>
            selectedSeason
                ? this.seasonService.getSeasonById$(selectedSeason.id)
                : of(null),
        ),
    );

    showFilter = false;

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

    ngOnInit(): void {
        if (this.selectedMatchDayId !== '0' || this.selectedTeamId !== '0') {
            this.showFilter = true;
        }
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    filterMatchDays(matchDays: any[]): any[] {
        return this.selectedMatchDayId !== '0'
            ? matchDays.filter((x) => x.id === this.selectedMatchDayId)
            : matchDays;
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    filterMatches(matches: any[]): any[] {
        return this.selectedTeamId !== '0'
            ? matches.filter(
                (x) =>
                    x.guest_team.id === this.selectedTeamId ||
                      x.home_team.id === this.selectedTeamId,
            )
            : matches;
    }

}
