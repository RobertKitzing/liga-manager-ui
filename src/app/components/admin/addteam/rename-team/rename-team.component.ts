import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Team, RenameTeamGQL, TeamFragment } from 'src/api/graphql';

@Component({
  selector: 'app-rename-team',
  templateUrl: './rename-team.component.html',
  styleUrls: ['./rename-team.component.css']
})
export class RenameTeamComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<RenameTeamComponent>,
    private renameTeamGQL: RenameTeamGQL,
    @Inject(MAT_DIALOG_DATA) public team: Team.Fragment
  ) { }

  ngOnInit() {

  }

  async renameTeam(newName: string) {
    try {
      await this.renameTeamGQL.mutate(
        {
          team_id: this.team.id,
          new_name: newName
        },
        {
          update: (store, { data }) => {
            const team: any = store.readFragment(
              {
                fragmentName: 'Team',
                fragment: TeamFragment,
                id: `Team:${this.team.id}`
              }
            );
            store.writeFragment(
              {
                fragmentName: 'Team',
                fragment: TeamFragment,
                id: `Team:${this.team.id}`,
                data: {
                  __typename: 'Team',
                  ...team,
                  name: newName
                }
              }
            );
          },
        }
      ).toPromise();
      this.dialogRef.close();
    } catch (error) {
      console.error(error);
    }
  }
}
