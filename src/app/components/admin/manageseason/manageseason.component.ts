import { Component, OnInit } from '@angular/core';
import { SeasonService } from '../../../services/season.service';
import { Season, SeasonState, Team, Client, CreateSeasonBody, CreateMatchDaysBody, Date_period, Match_day } from '../../../../api';
import { MatSelectChange } from '@angular/material';
import { MatchService } from '../../../services/match.service';
import { MatchViewModel } from '../../../models/match.viewmodel';

@Component({
  selector: 'app-manageseason',
  templateUrl: './manageseason.component.html',
  styleUrls: ['./manageseason.component.css']
})
export class ManageseasonComponent implements OnInit {

  seasons: Season[];
  teamsInSeason: Team[];
  allTeams: Team[];
  matchesInSeason: MatchViewModel[];
  manageSeason: Season;
  matchDayCounter: number[];
  newMatchDays: Date_period[];
  matchDaysInSeason: Match_day[];

  constructor(
    public seasonService: SeasonService,
    private matchService: MatchService,
    private apiClient: Client
  ) { }

  async ngOnInit() {
    this.loadAllSeasonInPrep();
    this.loadAllTeams();
  }

  async loadAllSeasonInPrep() {
    this.seasons = await this.seasonService.loadSeasons(SeasonState.Preparation);
  }

  loadAllTeams() {
    this.apiClient.getAllTeams().subscribe(
      (teams) => {
        this.allTeams = teams.sort((a, b) => a.name.toLowerCase() > b.name.toLowerCase() ? 1 : -1);
      }
    );
  }

  addNewSeason(seasonName: string) {
    const createSeasonBody = new CreateSeasonBody();
    createSeasonBody.name = seasonName;
    this.apiClient.createSeason(createSeasonBody).subscribe(
      (t) => {
        this.loadAllSeasonInPrep();
      }
    );
  }

  manageSeasonChanged(event: MatSelectChange) {
    this.manageSeason = event.value;
    this.getTeamsInManageSeason();
  }

  getTeamsInManageSeason() {
    this.apiClient.getTeamsInSeason(this.manageSeason.id).subscribe(
      (teams) => {
        this.teamsInSeason = teams.sort((a, b) => a.name.toLowerCase() > b.name.toLowerCase() ? 1 : -1);
      }
    );
  }

  addTeamToSeason(teamId: string) {
    if (this.manageSeason) {
      this.apiClient.addTeamToSeason(this.manageSeason.id, teamId).subscribe(
        (t) => {
          this.getTeamsInManageSeason();
        }
      );
    }
  }

  removeTeamFromSeason(teamId: string) {
    if (this.manageSeason) {
      this.apiClient.removeTeamFromSeason(this.manageSeason.id, teamId).subscribe(
        (t) => {
          this.getTeamsInManageSeason();
        }
      );
    }
  }

  createMatchDays() {
    this.newMatchDays = new Array<Date_period>();
    for (let i = 0; i < this.manageSeason.team_count - 1; i++) {
      const dp = new Date_period();
      dp.from = new Date();
      dp.from.setDate(dp.from.getDate() + (i * 7));
      dp.to = new Date();
      dp.to.setDate(dp.to.getDate() + (i * 7));
      this.newMatchDays.push(dp);
    }
  }

  sendMatchDays() {
    const body = new CreateMatchDaysBody();
    body.dates = this.newMatchDays;
    this.apiClient.createMatchDays(this.manageSeason.id, body).subscribe(
      (d) => {
        
      }
    );
  }

  async getMatchesInSeason() {
    this.matchDaysInSeason = await this.matchService.getMatchDaysInSeason(this.manageSeason.id);
    this.matchesInSeason = await this.matchService.getMatchesInSeason(this.manageSeason.id, undefined, undefined);
  }

  getMatchDay(id: string): Match_day {
    return this.matchDaysInSeason.find(t => t.id === id);
  }

  startSeason() {
    this.apiClient.startSeason(this.manageSeason.id).subscribe(
      () => {
        this.seasonService.seasonCreated.next();
      }
    );
  }
}
