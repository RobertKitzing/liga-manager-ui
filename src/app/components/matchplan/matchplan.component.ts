import { Component, OnInit } from '@angular/core';
import { SeasonService } from '../../services/season.service';
import { I18Service } from '../../services/i18.service';
import { Observable } from 'rxjs';
import { Season, MatchPlanGQL, MatchPlan } from '../../../api/graphql';
import { map, filter } from 'rxjs/operators';

@Component({
  selector: 'app-matchplan',
  templateUrl: './matchplan.component.html',
  styleUrls: ['./matchplan.component.css']
})
export class MatchplanComponent implements OnInit {

  public matchesQGL: Observable<MatchPlan.Season>;

  public get hidePlayed(): boolean {
    return JSON.parse(localStorage.getItem('HIDE_PLAYED'));
  }
  public set hidePlayed(value: boolean) {
    localStorage.setItem('HIDE_PLAYED', value.toString());
  }

  public set selectedMatchDayId(value: string) {
    localStorage.setItem('SELECTED_MATCHDAY', value);
  }

  public get selectedMatchDayId(): string {
    return localStorage.getItem('SELECTED_MATCHDAY') || '0';
  }

  public get selectedTeamId(): string {
    return localStorage.getItem('SELECTED_TEAM') || '0';
  }

  public set selectedTeamId(value: string) {
    localStorage.setItem('SELECTED_TEAM', value);
  }

  public get filterActive(): boolean {
    return this.hidePlayed;
  }

  constructor(
    public seasonService: SeasonService,
    public i18Service: I18Service,
    public matchPlanQGL: MatchPlanGQL
  ) { }

  ngOnInit() {
    if (this.seasonService.currentSeason) {
      this.handleGetMatches();
    }
  }

  filterMatchDays(matchDays: Season.MatchDays[]) {

    return this.selectedMatchDayId !== '0' ? matchDays.filter(x => x.id === this.selectedMatchDayId) : matchDays;

  }

  filterMatches(matches: Season.Matches[]) {

    return this.selectedTeamId !== '0' ?
      matches.filter(x => x.guest_team.id === this.selectedTeamId || x.home_team.id === this.selectedTeamId) :
      matches;

  }

  handleGetMatches() {
    this.matchesQGL = this.matchPlanQGL.watch({ id: this.seasonService.currentSeason.getValue().id }).valueChanges.pipe(
      map(
        ({ data }) => {
          data.season.teams = data.season.teams.sort((a, b) => a.name.toLowerCase() > b.name.toLowerCase() ? 1 : -1);
          return data.season;
        }
      )
    );
  }
}
