import { Component, OnInit } from '@angular/core';
import { SeasonService } from '../../services/season.service';
import { I18Service } from '../../services/i18.service';
import { Observable } from 'rxjs';
import { MatchDayFragment, MatchFragment, SeasonFragment } from '../../../api/graphql';
import { switchMap } from 'rxjs/operators';
import { LocalStorage } from 'ngx-webstorage';

const HIDE_PLAYED_KEY = 'HIDE_PLAYED';
const SELECTED_MATCHDAY_KEY = 'SELECTED_MATCHDAY';
const SELECTED_TEAM_KEY = 'SELECTED_TEAM';

@Component({
  selector: 'app-matchplan',
  templateUrl: './matchplan.component.html',
  styleUrls: ['./matchplan.component.css']
})
export class MatchplanComponent implements OnInit {

  public season: Observable<SeasonFragment> = this.seasonService.currentSeason.pipe(
    switchMap(
      (currentSeason) => this.seasonService.getSeason({id: currentSeason.id}),
    ),
  );

  @LocalStorage(HIDE_PLAYED_KEY) hidePlayed: boolean;

  @LocalStorage(SELECTED_MATCHDAY_KEY, '0') selectedMatchDayId;

  @LocalStorage(SELECTED_TEAM_KEY, '0') selectedTeamId;

  public get filterActive(): boolean {
    return this.hidePlayed;
  }

  constructor(
    public seasonService: SeasonService,
    public i18Service: I18Service,
  ) { }

  ngOnInit() {
  }

  filterMatchDays(matchDays: MatchDayFragment[]): MatchDayFragment[] {

    return this.selectedMatchDayId !== '0' ? matchDays.filter(x => x.id === this.selectedMatchDayId) : matchDays;

  }

  filterMatches(matches: MatchFragment[]): MatchFragment[] {

    return this.selectedTeamId !== '0' ?
      matches.filter(x => x.guest_team.id === this.selectedTeamId || x.home_team.id === this.selectedTeamId) :
      matches;

  }

}
