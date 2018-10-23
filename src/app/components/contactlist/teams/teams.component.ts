import { Component, OnInit } from '@angular/core';
import { Team } from 'src/api';
import { TeamService } from 'src/app/services/team.service';

@Component({
  selector: 'app-teams',
  templateUrl: './teams.component.html',
  styleUrls: ['./teams.component.css']
})
export class TeamsComponent implements OnInit {

  teams: Team[];

  constructor(
    private teamService: TeamService
  ) { }

  async ngOnInit() {
    this.teams = await this.teamService.loadAllTeams();
  }

}
