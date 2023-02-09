import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { filter, firstValueFrom, map, startWith, switchMap } from 'rxjs';
import { Team } from 'src/api/graphql';
import { TeamService } from 'src/app/services/team.service';

@Component({
  selector: 'lima-manage-teams',
  templateUrl: './manage-teams.component.html',
  styleUrls: ['./manage-teams.component.scss']
})
export class ManageTeamsComponent {

  displayedColumns: string[] = ['team', 'action'];

  newTeam = new FormControl('', [Validators.required]);
  newTeamName = new FormControl('', [Validators.required])
  searchTeam = new FormControl()

  addTeamMode = false;
  editTeamId = '';

  teams$ = this.searchTeam.valueChanges.pipe(
    startWith(null),
    switchMap(
      (searchTerm) => !searchTerm ? this.teamService.allTeams$ : this.teamService.allTeams$.pipe(map((x) => x.filter((y) => y?.name.toLocaleLowerCase().includes(searchTerm.toLocaleLowerCase()) )))
    )
  );

  constructor(
    private teamService: TeamService,
  ) {}

  editTeam(team: Team) {
    this.editTeamId = team.id;
    this.newTeamName.setValue(team.name)
  }

  async addNewTeam(name: string) {
    await firstValueFrom(this.teamService.createTeam(name));
    this.addTeamMode = false;
  }

  async deleteTeam(team_id: string) {
    await firstValueFrom(this.teamService.deleteTeam({team_id}));
  }

  async renameTeam(team_id: string, new_name: string) {
    await firstValueFrom(this.teamService.renameTeam({team_id, new_name}));
    this.editTeamId = ''
  }
}
