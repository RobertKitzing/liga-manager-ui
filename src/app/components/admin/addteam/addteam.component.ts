import { Component, OnInit } from '@angular/core';
import { TeamService } from '../../../services/team.service';
import { Team } from 'src/api/graphql';
import { MatDialog } from '@angular/material';
import { RenameTeamComponent } from './rename-team/rename-team.component';

@Component({
  selector: 'app-addteam',
  templateUrl: './addteam.component.html',
  styleUrls: ['./addteam.component.css']
})
export class AddteamComponent implements OnInit {

  constructor(
    public teamService: TeamService,
    public dialog: MatDialog
  ) {

  }

  async ngOnInit() {
  }

  async addNewTeam(teamName: string) {
    try {
      await this.teamService.addNewTeam(teamName);
    } catch (error) {
      console.error(error);
    }
  }

  openRenameTeamDialog(team: Team.Fragment) {
    this.dialog.open(RenameTeamComponent, { data: team, minWidth: '50vw' });
  }
}
