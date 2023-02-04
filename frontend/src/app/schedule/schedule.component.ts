import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { of, switchMap, take } from 'rxjs';
import { Match, MatchDay, MatchDayFragment, MatchFragment } from 'src/api/graphql';
import { EditMatchPitchComponent } from '../components/dialogs/edit-match-pitch/edit-match-result.component';
import { EditMatchResultComponent } from '../components/dialogs/edit-match-result/edit-match-result.component';
import { AuthenticationService } from '../services/authentication.service';
import { I18nService } from '../services/i18n.service';
import { SeasonService } from '../services/season.service';

@Component({
  selector: 'lima-schedule',
  templateUrl: './schedule.component.html',
  styles: [
  ],
})
export class ScheduleComponent implements OnInit {

  currentSeason$ = this.seasonService.currentSeason$;

  season$ = this.seasonService.currentSeason$.pipe(
    switchMap(
      (currentSeason) => currentSeason?.id ? this.seasonService.getSeason({ id: currentSeason.id }) : of(null),
    ),
  );

  selectedMatchDayId = '0';
  selectedTeamId = '0'
  showFilter = false;

  constructor(
    private seasonService: SeasonService,
    private dialog: MatDialog,
    public i18nService: I18nService,
    public authService: AuthenticationService,
  ) { }

  ngOnInit(): void {    
  }

  filterMatchDays(matchDays: any[]): any[] {

    return this.selectedMatchDayId !== '0' ? matchDays.filter(x => x.id === this.selectedMatchDayId) : matchDays;

  }

  filterMatches(matches: any[]): any[] {
    return this.selectedTeamId !== '0' ?
      matches.filter(x => x.guest_team.id === this.selectedTeamId || x.home_team.id === this.selectedTeamId) :
      matches;
  }

  openCancelMatchDialog() {
    throw new Error('Method not implemented.');
  }

  openEditKickoffDialog() {

  }

  openEditPitchDialog(match: Match, matchDay: MatchDay) {
    this.dialog.open(EditMatchPitchComponent, {
      data: {match, matchDay}
    });
  }

  openEditResultDialog(match: Match, matchDay: MatchDay) {
    this.dialog.open(EditMatchResultComponent, {
      data: {match, matchDay}
    });
  }
}
