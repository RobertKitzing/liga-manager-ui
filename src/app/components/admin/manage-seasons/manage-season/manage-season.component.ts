import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Observable, switchMap } from 'rxjs';
import { SeasonFragment, SeasonState } from 'src/api/graphql';
import { NotificationService } from 'src/app/services/notification.service';
import { SeasonService } from 'src/app/services/season.service';

@Component({
  selector: 'app-manage-season',
  templateUrl: './manage-season.component.html',
  styleUrls: ['./manage-season.component.css']
})
export class ManageSeasonComponent implements OnInit {

  manageSeason: Observable<SeasonFragment> = this.seasonService.manageSeason.pipe(
    switchMap(
      (manageSeason) => this.seasonService.getSeason({id: manageSeason.id}),
    ),
  );
  
  SeasonState = SeasonState;

  constructor(
    private seasonService: SeasonService,
    private translateService: TranslateService,
    private notificationService: NotificationService,
  ) { }

  ngOnInit(): void {
  }

  
  async startSeason(season: SeasonFragment) {
    try {
      await this.seasonService.startSeason(season.id);
      this.notificationService.showSuccessNotification(this.translateService.instant('START_SEASON_SUCCESS'));
    } catch (error) {
      this.notificationService.showErrorNotification(this.translateService.instant('START_SEASON_ERROR'), error);
    }
  }

  async endSeason(season: SeasonFragment) {
    try {
      await this.seasonService.endSeason(season.id);
      this.notificationService.showSuccessNotification(this.translateService.instant('END_SEASON_SUCCESS'));
    } catch (error) {
      this.notificationService.showErrorNotification(this.translateService.instant('END_SEASON_ERROR'), error);
    }
  }

  async deleteSeason(season: SeasonFragment) {
    try {
      await this.seasonService.deleteSeason(season.id);
      this.notificationService.showSuccessNotification(this.translateService.instant('DELETE_SEASON_SUCCESS'));
    } catch (error) {
      this.notificationService.showErrorNotification(this.translateService.instant('DELETE_SEASON_ERROR'), error);
    }
  }
}
