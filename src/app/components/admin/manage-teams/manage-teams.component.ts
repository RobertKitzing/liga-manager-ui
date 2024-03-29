import { Component, OnInit } from '@angular/core';
import { TeamService } from '../../../services/team.service';
import { Team, TeamFragment } from 'src/api/graphql';
import { MatDialog } from '@angular/material/dialog';
import { RenameTeamComponent } from './rename-team/rename-team.component';
import { NotificationService } from 'src/app/services/notification.service';
import { TranslateService } from '@ngx-translate/core';
import { ConfirmDialogComponent } from '../../shared/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-manage-teams',
  templateUrl: './manage-teams.component.html',
  styleUrls: ['./manage-teams.component.css']
})
export class ManageTeamsComponent implements OnInit {

  constructor(
    public teamService: TeamService,
    public dialog: MatDialog,
    private notify: NotificationService,
    private translateService: TranslateService
  ) {

  }

  async ngOnInit() {
  }

  async addNewTeam(teamName: string) {
    try {
      await this.teamService.addNewTeam(teamName);
      this.notify.showSuccessNotification(this.translateService.instant('CREATE_TEAM_SUCCESS'));
    } catch (error) {
      this.notify.showErrorNotification(this.translateService.instant('CREATE_TEAM_ERROR'), error);
    }
  }

  deleteTeam(team: TeamFragment) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        message: this.translateService.instant('CONFIRM_DELETE', { thing: team.name })
      }
    });
    dialogRef.afterClosed().subscribe(
      async (confirm) => {
        try {
          await this.teamService.deleteTeam(team);
          this.notify.showSuccessNotification(this.translateService.instant('DELETE_TEAM_SUCCESS'));
        } catch (error) {
          this.notify.showErrorNotification(this.translateService.instant('DELETE_TEAM_ERROR'), error);
        }
      });
  }

  openRenameTeamDialog(team: TeamFragment) {
    this.dialog.open(RenameTeamComponent, { data: team });
  }
}
