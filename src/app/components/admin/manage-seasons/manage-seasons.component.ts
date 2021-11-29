import { Component, OnInit } from '@angular/core';
import { SeasonService } from '../../../services/season.service';
import { TranslateService } from '@ngx-translate/core';
import { TeamService } from 'src/app/services/team.service';
import { MatchFragment, SeasonState, SeasonFragment } from '../../../../api/graphql';
import { I18Service } from 'src/app/services/i18.service';
import { NotificationService } from 'src/app/services/notification.service';
import { Observable, switchMap } from 'rxjs';

@Component({
  selector: 'app-manageseason',
  templateUrl: './manage-seasons.component.html',
  styleUrls: ['./manage-seasons.component.css']
})
export class ManageSeasonsComponent implements OnInit {

  matchesInSeason: MatchFragment[];

  manageSeason: Observable<SeasonFragment> = this.seasonService.manageSeason.pipe(
    switchMap(
      (manageSeason) => this.seasonService.getSeason({id: manageSeason.id}),
    ),
  );

  SeasonState = SeasonState;

  constructor(
    public seasonService: SeasonService,
    public teamService: TeamService,
    public i18Service: I18Service,
    private translateService: TranslateService,
    private notificationService: NotificationService,
  ) {
  }

  async ngOnInit() {

  }

  async addNewSeason(seasonName: string) {
    try {
      await this.seasonService.createSeason(seasonName);
      this.notificationService.showSuccessNotification(this.translateService.instant('CREATE_SEASON_SUCCESS'));
    } catch (error) {
      this.notificationService.showErrorNotification(this.translateService.instant('CREATE_SEASON_ERROR'), error);
    }
  }

}
