import { Component, OnInit } from '@angular/core';
import { SeasonService } from '../../../services/season.service';
import { Season, SeasonState, Team, Client, CreateSeasonBody, CreateMatchesBody, Match } from '../../../../api';
import { MatSelectChange } from '@angular/material';
import { MatchService } from '../../../services/match.service';

@Component({
  selector: 'app-manageseason',
  templateUrl: './manageseason.component.html',
  styleUrls: ['./manageseason.component.css']
})
export class ManageseasonComponent implements OnInit {

  seasons: Season[];
  teamsInSeason: Team[];
  allTeams: Team[];
  matchesInSeason: Match[];
  manageSeason: Season;
  matchDayCounter: number[];

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

  createMatches() {
    const body = new CreateMatchesBody();
    body.start_at = new Date();
    this.apiClient.createMatches(this.manageSeason.id, body).subscribe(
      async (m) => {
        this.apiClient.getSeason(this.manageSeason.id).subscribe(
          async (season) => {
            this.matchDayCounter = Array.from(new Array(season.match_day_count), (val, index) => index + 1);
            await this.getMatchesInSeason(1);
          }
        );
      }
    );
  }

  async getMatchesInSeason(matchDay) {
    this.matchesInSeason = await this.matchService.getMatchesInSeason(this.manageSeason.id, matchDay);
  }

  startSeason() {
    this.apiClient.startSeason(this.manageSeason.id).toPromise();
  }
}
