import { Component, OnInit } from '@angular/core';
import { SeasonService } from '../../services/season.service';
import { I18Service } from '../../services/i18.service';
import { Observable } from 'rxjs';
import { MatchPlanGQL, MatchPlan, Match, MatchDay, RankingGQL, MatchGQL } from '../../../api/graphql';
import { map } from 'rxjs/operators';
import { LocalStorage } from 'ngx-store';

const HIDE_PLAYED_KEY = 'HIDE_PLAYED';
const SELECTED_MATCHDAY_KEY = 'SELECTED_MATCHDAY';
const SELECTED_TEAM_KEY = 'SELECTED_TEAM';

@Component({
  selector: 'app-matchplan',
  templateUrl: './matchplan.component.html',
  styleUrls: ['./matchplan.component.css']
})
export class MatchplanComponent implements OnInit {

  public matchesGQL: Observable<MatchPlan.Season>;

  @LocalStorage(HIDE_PLAYED_KEY) hidePlayed: boolean;

  @LocalStorage(SELECTED_MATCHDAY_KEY) selectedMatchDayId = '0';

  @LocalStorage(SELECTED_TEAM_KEY) selectedTeamId = '0';

  public get filterActive(): boolean {
    return this.hidePlayed;
  }

  constructor(
    public seasonService: SeasonService,
    public i18Service: I18Service,
    public matchPlanGQL: MatchPlanGQL,
    private rankingGQL: RankingGQL,
    private matchGQL: MatchGQL
  ) { }

  ngOnInit() {
    if (this.seasonService.currentSeason.getValue()) {
      this.handleGetMatches();
    }
  }

  filterMatchDays(matchDays: MatchDay.Fragment[]): MatchDay.Fragment[] {

    return this.selectedMatchDayId !== '0' ? matchDays.filter(x => x.id === this.selectedMatchDayId) : matchDays;

  }

  filterMatches(matches: Match.Fragment[]): Match.Fragment[] {

    return this.selectedTeamId !== '0' ?
      matches.filter(x => x.guest_team.id === this.selectedTeamId || x.home_team.id === this.selectedTeamId) :
      matches;

  }

  handleGetMatches() {
    this.matchesGQL = this.matchPlanGQL.watch(
      { id: this.seasonService.currentSeason.getValue().id } ).valueChanges.pipe(
      map(
        ({ data }) => {
          data.season.teams = data.season.teams.sort((a, b) => a.name.toLowerCase() > b.name.toLowerCase() ? 1 : -1);
          if (this.selectedMatchDayId && !data.season.match_days.find(x => x.id === this.selectedMatchDayId)) {
            this.selectedMatchDayId = '0';
          }
          if (this.selectedTeamId && !data.season.teams.find(x => x.id === this.selectedTeamId)) {
            this.selectedTeamId = '0';
          }
          return data.season;
        }
      )
    );
  }

  matchUpdated(matchId: string) {
    this.matchPlanGQL.watch(
      { id: this.seasonService.currentSeason.getValue().id }).refetch();
    this.rankingGQL.watch(
      { id: this.seasonService.currentSeason.getValue().id }).refetch();
  }
}
