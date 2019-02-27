import { Component, OnInit } from '@angular/core';
import { TeamService } from '../../../services/team.service';
import { Team } from '../../../../api';
import { TeamsGQL } from '../../../../api/graphql';

@Component({
  selector: 'app-addteam',
  templateUrl: './addteam.component.html',
  styleUrls: ['./addteam.component.css']
})
export class AddteamComponent implements OnInit {

  teams: Team[];

  constructor(
    private teamService: TeamService
  ) {

  }

  async ngOnInit() {
    this.teams = await this.teamService.loadAllTeams();
  }

  addNewTeam(teamName: string) {
    this.teamService.addNewTeam(teamName);
    
  }
}
