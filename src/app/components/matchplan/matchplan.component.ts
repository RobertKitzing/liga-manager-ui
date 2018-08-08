import { Component, OnInit } from '@angular/core';
import { SeasonService } from '../../services/season.service';
import { MatchService } from '../../services/match.service';
import { MatchViewModel } from '../../models/match.viewmodel';
import { Season, Team } from '../../../api';
import { TeamService } from '../../services/team.service';

@Component({
  selector: 'app-matchplan',
  templateUrl: './matchplan.component.html',
  styleUrls: ['./matchplan.component.css']
})
export class MatchplanComponent implements OnInit {

  public matches: MatchViewModel[];
  public matchDays: number[];

  public set selectedMatchDay(value: number) {
    localStorage.setItem('SELECTED_MATCHDAY', value.toString());
  }
  public get selectedMatchDay(): number {
    return Number(localStorage.getItem('SELECTED_MATCHDAY')) || 1;
  }
  private season: Season;

  public get selectedTeamId() {
    return localStorage.getItem('SELECTED_TEAM') || '0';
  }
  public set selectedTeamId(value: string) {
    localStorage.setItem('SELECTED_TEAM', value);
  }

  teamsInSeason: Team[];

  constructor(
    private seasonService: SeasonService,
    private matchService: MatchService,
    private teamService: TeamService
  ) { }

  ngOnInit() {
    this.seasonService.currentSeason.subscribe(
      async (season) => {
        this.season = season;
        this.matchDays = Array.from(new Array(this.season.match_day_count), (val, index) => index + 1);
        this.handleGetMatches();
        this.teamsInSeason = await this.teamService.loadTeamsInSeason(season.id);
      }
    );
  }

  async handleGetMatches() {
    this.matches = null;
    if (this.season) {
      if (this.selectedTeamId !== '0') {
        this.matches = await this.matchService.getMatchesInSeason(this.season.id, undefined, this.selectedTeamId);
        if (this.matches) {
          this.matches = this.matches.sort((a, b) => a.match_day > b.match_day ? 1 : -1);
        }
      } else {
        this.matches = await this.matchService.getMatchesInSeason(this.season.id, this.selectedMatchDay);
      }
    }
  }

}
