import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TranslateService } from '@ngx-translate/core';
import { Observable, switchMap } from 'rxjs';
import { Season, SeasonFragment, SeasonState, Team } from 'src/api/graphql';
import { ReplaceTeamInSeasonDialogComponent } from 'src/app/components/shared/replace-team-in-season-dialog/replace-team-in-season-dialog.component';
import { NotificationService } from 'src/app/services/notification.service';
import { SeasonService } from 'src/app/services/season.service';
import { TeamService } from 'src/app/services/team.service';

@Component({
  selector: 'app-manage-teams',
  templateUrl: './manage-season-teams.component.html',
  styleUrls: ['./manage-season-teams.component.css']
})
export class ManageSeasonTeamsComponent implements OnInit {

  SeasonState = SeasonState;
  
  manageSeason: Observable<SeasonFragment> = this.seasonService.manageSeason.pipe(
    switchMap(
      (manageSeason) => this.seasonService.getSeason({id: manageSeason.id}),
    ),
  );
  
  constructor(
    public teamService: TeamService,
    private seasonService: SeasonService,
    private notificationService: NotificationService,
    private translateService: TranslateService,
    private dialog: MatDialog,
  ) { }

  ngOnInit(): void {
  }

  async addTeamToSeason(teamId: string, manageSeason: SeasonFragment) {
    try {
      await this.teamService.addTeamToSeason(teamId, manageSeason.id);
      this.notificationService.showSuccessNotification(this.translateService.instant('TEAM_ADDED_TO_SEASON_SUCCESS'));
    } catch (error) {
      this.notificationService.showErrorNotification(this.translateService.instant('TEAM_ADDED_TO_SEASON_ERROR'), error);
    }
  }

  async removeTeamFromSeason(teamId: string, manageSeason: SeasonFragment) {
    try {
      await this.teamService.removeTeamFromSeason(teamId, manageSeason.id);
      this.notificationService.showSuccessNotification(this.translateService.instant('TEAM_REMOVED_SEASON_SUCCESS'));
    } catch (error) {
      this.notificationService.showErrorNotification(this.translateService.instant('TEAM_REMOVED_SEASON_ERROR'), error);
    }
  }

  openReplaceTeamInSeasonDialog(oldTeam: Team, season: SeasonFragment) {
    this.dialog.open(ReplaceTeamInSeasonDialogComponent, {
      data: {oldTeam, season},
    });
  }
}
