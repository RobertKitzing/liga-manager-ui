import { Component, OnInit } from '@angular/core';
import { TeamService } from '../../../services/team.service';

@Component({
  selector: 'app-addteam',
  templateUrl: './addteam.component.html',
  styleUrls: ['./addteam.component.css']
})
export class AddteamComponent {

  constructor(
    public teamService: TeamService
  ) { }

  addNewTeam(teamName: string) {
    this.teamService.addNewTeam(teamName);
  }
}
