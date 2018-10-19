import { Component, OnInit } from '@angular/core';
import { SeasonService } from '../../services/season.service';
import { MatchService } from '../../services/match.service';
import { MatchViewModel } from '../../models/match.viewmodel';
import { Season, Team, Match_day, Client, Match } from '../../../api';
import { TeamService } from '../../services/team.service';
import { I18Service } from '../../services/i18.service';

@Component({
  selector: 'app-matchplan',
  templateUrl: './matchplan.component.html',
  styleUrls: ['./matchplan.component.css']
})
export class MatchplanComponent implements OnInit {

  public matches: MatchViewModel[];
  public matchDays: Match_day[];
  public hidePlayed: boolean;

  public set selectedMatchDay(value: Match_day) {
    localStorage.setItem('SELECTED_MATCHDAY', JSON.stringify(value));
  }

  public get selectedMatchDay(): Match_day {
    return JSON.parse(localStorage.getItem('SELECTED_MATCHDAY')) || new Match_day();
  }
  private season: Season;

  public get selectedTeamId() {
    return localStorage.getItem('SELECTED_TEAM') || '0';
  }

  public set selectedTeamId(value: string) {
    localStorage.setItem('SELECTED_TEAM', value);
  }

  public get filterActive(): boolean {
    return this.hidePlayed;
  }

  teamsInSeason: Team[];

  constructor(
    private seasonService: SeasonService,
    public matchService: MatchService,
    private teamService: TeamService,
    private apiClient: Client,
    public i18Service: I18Service
  ) { }

  ngOnInit() {
    this.seasonService.currentSeason.subscribe(
      async (season) => {
        if (season) {
          this.season = season;
          this.matchDays = await this.apiClient.getMatchDaysInSeason(season.id).toPromise();
          this.handleGetMatches();
          this.teamsInSeason = await this.teamService.loadTeamsInSeason(season.id);
        }
      }
    );
  }

  async handleGetMatches() {
    this.matches = null;
    if (this.season) {
      // TODO: Umbauen, sodass beides möglich ist
      if (this.selectedTeamId !== '0') {
        this.matches = await this.matchService.getMatchesInSeason(this.season.id, this.selectedTeamId, null);
      } else {
        this.matches = await this.matchService.getMatchesInSeason(this.season.id, null, this.selectedMatchDay.id);
      }
    }
  }

  matchDayCompare(md1: Match_day, md2: Match_day) {
    return md1 && md2 && md1.id === md2.id;
  }

  getMatchDay(id: string): Match_day {
    return this.matchDays.find(t => t.id === id);
  }

  isNewMatchDay(match: Match, index: number): boolean {
    if (!match || index < 1) {
      return true;
    } else {
      const currentMatchDay = this.getMatchDay(match.match_day_id);
      const previusMatchDay = this.getMatchDay(this.matches[index - 1].match_day_id);
      return currentMatchDay.number !== previusMatchDay.number;
    }
  }
}
