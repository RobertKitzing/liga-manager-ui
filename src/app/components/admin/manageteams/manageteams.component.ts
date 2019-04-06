import { Component, OnInit } from '@angular/core';
import { TeamService } from '../../../services/team.service';
import { Team } from 'src/api/graphql';
import { MatDialog } from '@angular/material';
import { RenameTeamComponent } from './rename-team/rename-team.component';
import { NotificationService } from 'src/app/services/notification.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-manageteams',
  templateUrl: './manageteams.component.html',
  styleUrls: ['./manageteams.component.css']
})
export class ManageteamsComponent implements OnInit {

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

  async deleteTeam(team: Team.Fragment) {
    try {
      await this.teamService.deleteTeam(team);
      this.notify.showSuccessNotification(this.translateService.instant('DELETE_TEAM_SUCCESS'));
    } catch (error) {
      this.notify.showErrorNotification(this.translateService.instant('DELETE_TEAM_ERROR'), error);
    }
  }

  openRenameTeamDialog(team: Team.Fragment) {
    this.dialog.open(RenameTeamComponent, { data: team});
  }
}
