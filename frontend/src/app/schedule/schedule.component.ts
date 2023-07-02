import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { BehaviorSubject, iif, of, switchMap } from 'rxjs';
import { Match, MatchDay, SeasonState } from 'src/api/graphql';
import { SeasonChooserModes } from '../shared/components/season-chooser';
import { AuthenticationService, SeasonService } from '@lima/shared/services';
import {
    CancelMatchComponent,
    EditMatchKickoffComponent,
    EditMatchPitchComponent,
    EditMatchResultComponent,
} from '@lima/shared/dialogs';

@Component({
    selector: 'lima-schedule',
    templateUrl: './schedule.component.html',
    styles: [],
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
        private authService: AuthenticationService,
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

    filterMatchDays(matchDays: MatchDay[]): MatchDay[] {
        return this.selectedMatchDayId !== '0'
            ? matchDays.filter((x) => x.id === this.selectedMatchDayId)
            : matchDays;
    }

    filterMatches(matches: Match[]): Match[] {
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
            data: { match, matchDay },
        });
    }

    openEditKickoffDialog(match: Match, matchDay: MatchDay) {
        this.dialog.open(EditMatchKickoffComponent, {
            data: { match, matchDay },
        });
    }

    openEditPitchDialog(match: Match, matchDay: MatchDay) {
        this.dialog.open(EditMatchPitchComponent, {
            data: { match, matchDay },
        });
    }

    openEditResultDialog(match: Match, matchDay: MatchDay) {
        this.dialog.open(EditMatchResultComponent, {
            data: { match, matchDay },
        });
    }
}
