import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Team, RenameTeamGQL, TeamFragment } from 'src/api/graphql';
import { TeamService } from '../../../../services/team.service';

@Component({
  selector: 'app-rename-team',
  templateUrl: './rename-team.component.html',
  styleUrls: ['./rename-team.component.css']
})
export class RenameTeamComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<RenameTeamComponent>,
    private teamService: TeamService,
    @Inject(MAT_DIALOG_DATA) public team: Team.Fragment
  ) { }

  ngOnInit() {

  }

  async renameTeam(newName: string) {
    try {
      await this.teamService.renameTeam(this.team.id, newName);
      this.dialogRef.close();
    } catch (error) {
      console.error(error);
    }
  }
}
