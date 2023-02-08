import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { TeamService } from 'src/app/services/team.service';

@Component({
  selector: 'lima-manage-teams',
  templateUrl: './manage-teams.component.html',
  styleUrls: ['./manage-teams.component.scss']
})
export class ManageTeamsComponent {

  displayedColumns: string[] = ['team', 'action'];

  teams$ = this.teamService.allTeams$
  newTeam = new FormControl();

  constructor(
    private teamService: TeamService,
  ) {}

  addNewTeam(name: string) {

  }
}
