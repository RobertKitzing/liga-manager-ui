import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Team, RenameTeamGQL, TeamFragment } from 'src/api/graphql';
import { TeamService } from '../../../../services/team.service';
import { NotificationService } from 'src/app/services/notification.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-rename-team',
  templateUrl: './rename-team.component.html',
  styleUrls: ['./rename-team.component.css']
})
export class RenameTeamComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<RenameTeamComponent>,
    private teamService: TeamService,
    private notify: NotificationService,
    private translateService: TranslateService,
    @Inject(MAT_DIALOG_DATA) public team: TeamFragment
  ) { }

  ngOnInit() {

  }

  async renameTeam(newName: string) {
    try {
      await this.teamService.renameTeam(this.team.id, newName);
      this.notify.showSuccessNotification(this.translateService.instant('RENAME_TEAM_SUCCESS'));
      this.dialogRef.close();
    } catch (error) {
      this.notify.showErrorNotification(this.translateService.instant('RENAME_TEAM_ERROR'), error);
    }
  }
}
