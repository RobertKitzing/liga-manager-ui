import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { filter, firstValueFrom, map } from 'rxjs';
import { ReplaceTeamInSeasonGQL, Season, SeasonFragment, SeasonGQL, Team } from 'src/api/graphql';
import { TeamService } from 'src/app/services/team.service';

@Component({
  selector: 'app-replace-team-in-season-dialog',
  templateUrl: './replace-team-in-season-dialog.component.html',
  styleUrls: ['./replace-team-in-season-dialog.component.css']
})
export class ReplaceTeamInSeasonDialogComponent implements OnInit {

  newTeam: Team;

  possibleTeams$ = this.teamService.allTeams.pipe(
    map(
      (allteams) => allteams.filter((t) => !this.data.season.teams.map(x => x.id).includes(t.id) )
    ),
  );

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: {oldTeam: Team, season: SeasonFragment},
    private teamService: TeamService,
    private replaceTeamInSeasonGQL: ReplaceTeamInSeasonGQL,
    private dialogRef: MatDialogRef<ReplaceTeamInSeasonDialogComponent>,
    private seasonGQL: SeasonGQL,
  ) { }

  ngOnInit(): void {
  }

  async replaceTeamInSeason() {
    try {
      await firstValueFrom(this.replaceTeamInSeasonGQL.mutate({
          season_id: this.data.season.id,
          current_team_id: this.data.oldTeam.id,
          replacement_team_id: this.newTeam.id
        },
        {
          refetchQueries: [
            { query: this.seasonGQL.document, variables: {id: this.data.season.id } }
          ]
        })
      );
      this.dialogRef.close();
    } catch(e) {

    }
  }

}
