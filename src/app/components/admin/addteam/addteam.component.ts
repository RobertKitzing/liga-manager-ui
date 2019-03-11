import { Component, OnInit } from '@angular/core';
import { TeamService } from '../../../services/team.service';

@Component({
  selector: 'app-addteam',
  templateUrl: './addteam.component.html',
  styleUrls: ['./addteam.component.css']
})
export class AddteamComponent implements OnInit {

  constructor(
    public teamService: TeamService
  ) {

  }

  async ngOnInit() {
  }

  addNewTeam(teamName: string) {
    this.teamService.addNewTeam(teamName);
  }
}
