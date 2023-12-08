import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { BehaviorSubject, iif, of, switchMap } from 'rxjs';
import { AuthenticationService, SeasonService } from '@lima/shared/services';
import {
    CancelMatchComponent,
    EditMatchKickoffComponent,
    EditMatchPitchComponent,
    EditMatchResultComponent,
} from '@lima/shared/dialogs';
import { AsyncPipe, DecimalPipe, JsonPipe, NgClass } from '@angular/common';
import { MatMenuModule } from '@angular/material/menu';
import { TranslateModule } from '@ngx-translate/core';
import { MatOptionModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { TeamLogoPipe } from '@lima/shared/pipes/team-logo';
import { CustomDateModule, NumberPipe } from '@lima/shared/pipes';
import { SeasonChooserComponent, SeasonChooserModes } from '@lima/shared/components';
import { ViewTeamContactComponent } from '@lima/shared/dialogs/view-team-contact';
import { Match, MatchDay, SeasonState, Team } from '@api/graphql';
import { defaultDialogConfig } from '@lima/app.config';

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
        DecimalPipe,
        CustomDateModule,
        NumberPipe,
        TeamLogoPipe,
        JsonPipe,
        NgClass,
    ],
})
export class ScheduleComponent implements OnInit {

    seasonMode: SeasonChooserModes = 'progressSeason';

    seasonTrigger$ = new BehaviorSubject<null>(null);

    season$ = this.seasonTrigger$.pipe(
        switchMap(() =>
            iif(
                () => this.seasonMode === 'progressSeason',
                this.seasonService.progressSeason$,
                this.seasonService.historySeason$,
            ),
        ),
        switchMap((season) => {
            return season?.id
                ? this.seasonService.getSeason({ id: season.id })
                : of(null);
        }),
    );

    selectedMatchDayId = '0';

    selectedTeamId = '0';

    showFilter = false;

    constructor(
        private seasonService: SeasonService,
        private dialog: MatDialog,
        private router: Router,
        public authService: AuthenticationService,
    ) {}

    ngOnInit(): void {
        if (this.router.url.includes('history')) {
            this.seasonMode = 'historySeason';
        }
    }

    canEditMatch(match: Match, seasonState: SeasonState) {
        return (
            this.authService.canEditMatch(match) &&
            seasonState === SeasonState.Progress
        );
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

    openCancelMatchDialog(match: Match, matchDay: MatchDay) {
        this.dialog.open(CancelMatchComponent, {
            ...defaultDialogConfig,
            data: { match, matchDay },
        });
    }

    openEditKickoffDialog(match: Match, matchDay: MatchDay) {
        this.dialog.open(EditMatchKickoffComponent, {
            ...defaultDialogConfig,
            data: { match, matchDay },
        });
    }

    openEditPitchDialog(match: Match, matchDay: MatchDay) {
        this.dialog.open(EditMatchPitchComponent, {
            ...defaultDialogConfig,
            data: { match, matchDay },
        });
    }

    openEditResultDialog(match: Match, matchDay: MatchDay) {
        this.dialog.open(EditMatchResultComponent, {
            ...defaultDialogConfig,
            data: { match, matchDay },
        });
    }

    openViewContactDialog(team: Team) {
        this.dialog.open(ViewTeamContactComponent, {
            ...defaultDialogConfig,
            data: team,
        });
    }

}
