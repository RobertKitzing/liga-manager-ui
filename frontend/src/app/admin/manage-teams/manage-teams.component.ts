import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { firstValueFrom } from 'rxjs';
import { Team } from 'src/api/graphql';
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
  newTeamName = new FormControl()

  editTeamId = '';

  constructor(
    private teamService: TeamService,
  ) {}

  editTeam(team: Team) {
    this.editTeamId = team.id;
    this.newTeamName.setValue(team.name)
  }

  async addNewTeam(name: string) {
    await firstValueFrom(this.teamService.createTeam(name));
  }

  async deleteTeam(team_id: string) {
    await firstValueFrom(this.teamService.deleteTeam({team_id}));
  }

  async renameTeam(team_id: string, new_name: string) {
    await firstValueFrom(this.teamService.renameTeam({team_id, new_name}));
    this.editTeamId = ''
  }
}
