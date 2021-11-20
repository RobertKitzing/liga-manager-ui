import { Component, Input, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { AddTeamToSeasonGQL, MatchPlan, MatchPlanGQL, RemoveTeamFromSeasonGQL } from 'src/api/graphql';
import { NotificationService } from 'src/app/services/notification.service';
import { TeamService } from 'src/app/services/team.service';

@Component({
  selector: 'app-manage-teams',
  templateUrl: './manage-teams.component.html',
  styleUrls: ['./manage-teams.component.css']
})
export class ManageTeamsComponent implements OnInit {

  @Input() manageSeason: MatchPlan.Season;
  
  constructor(
    public teamService: TeamService,
    private removeTeamGQL: RemoveTeamFromSeasonGQL,
    private addTeamGQL: AddTeamToSeasonGQL,
    private matchPlanGQL: MatchPlanGQL,
    private notificationService: NotificationService,
    private translateService: TranslateService,
  ) { }

  ngOnInit(): void {
  }

  async addTeamToSeason(teamId: string) {
    try {
      await this.addTeamGQL.mutate(
        {
          season_id: this.manageSeason.id,
          team_id: teamId
        },
        {
          refetchQueries: [
            {
              query: this.matchPlanGQL.document,
              variables: { id: this.manageSeason.id }
            }
          ]
        }
      ).toPromise();
      this.notificationService.showSuccessNotification(this.translateService.instant('TEAM_ADDED_TO_SEASON_SUCCESS'));
    } catch (error) {
      this.notificationService.showErrorNotification(this.translateService.instant('TEAM_ADDED_TO_SEASON_ERROR'), error);
    }
  }

  async removeTeamFromSeason(teamId: string) {
    try {
      await this.removeTeamGQL.mutate(
        {
          season_id: this.manageSeason.id,
          team_id: teamId
        },
        {
          refetchQueries: [
            {
              query: this.matchPlanGQL.document,
              variables: { id: this.manageSeason.id }
            }
          ]
        }
      ).toPromise();
      this.notificationService.showSuccessNotification(this.translateService.instant('TEAM_REMOVED_SEASON_SUCCESS'));
    } catch (error) {
      this.notificationService.showErrorNotification(this.translateService.instant('TEAM_REMOVED_SEASON_ERROR'), error);
    }
  }

}
