import { Component, OnInit } from '@angular/core';
import { SeasonService } from '../../../services/season.service';
import { Season, SeasonState, Team, Client } from 'src/api';
import { MatSelectChange } from '@angular/material';

@Component({
  selector: 'app-manageseason',
  templateUrl: './manageseason.component.html',
  styleUrls: ['./manageseason.component.css']
})
export class ManageseasonComponent implements OnInit {

  seasons: Season[];
  teamsInSeason: Team[];
  allTeams: Team[];

  manageSeason: Season;

  constructor(
    public seasonService: SeasonService,
    private apiClient: Client
  ) { }

  async ngOnInit() {
    this.seasons = await this.seasonService.loadSeasons(SeasonState.Preparation);
    console.log(this.seasons);
    this.apiClient.getAllTeams().subscribe(
      (teams) => {
        this.allTeams = teams.sort((a, b) => a.name.toLowerCase() > b.name.toLowerCase() ? 1 : -1);
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
}
