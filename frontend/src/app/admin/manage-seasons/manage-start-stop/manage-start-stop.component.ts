import { Component, inject } from '@angular/core';
import { ManageSeasonBase } from '../manage-season.base';
import { AsyncPipe } from '@angular/common';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { NotificationService } from '@lima/shared/services';
import {  MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';
import { APP_ROUTES } from '@lima/app.routes.enum';
import { ADMIN_ROUTES } from '@lima/admin/admin.routes.enum';

@Component({
  selector: 'lima-manage-start-stop',
  standalone: true,
  imports: [
    AsyncPipe,
    TranslateModule,
    MatButtonModule,
  ],
  templateUrl: './manage-start-stop.component.html',
})
export class ManageStartStopComponent extends ManageSeasonBase {

  notificationService = inject(NotificationService);

  translateService = inject(TranslateService);

  async endSeason(seasonId: string) {
    try {
      await this.seasonService.endSeason(seasonId);
      this.notificationService.showSuccessNotification(this.translateService.instant('START_SEASON_SUCCESS'));
    } catch (error) {
      this.notificationService.showErrorNotification(this.translateService.instant('START_SEASON_ERROR'));
    }
  }

  async startSeason(seasonId: string) {

    try {
      await this.seasonService.startSeason(seasonId);
      this.notificationService.showSuccessNotification(this.translateService.instant('START_SEASON_SUCCESS'));
    } catch (error) {
      this.notificationService.showErrorNotification(this.translateService.instant('START_SEASON_ERROR'));
    }
  
  }

  async deleteSeason(seasonId: string) {
    try {
      await this.seasonService.deleteSeason(seasonId);
      this.notificationService.showSuccessNotification(this.translateService.instant('START_SEASON_SUCCESS'));
      this.router.navigateByUrl(`${APP_ROUTES.ADMIN}/${ADMIN_ROUTES.SEASONS}`)
    } catch (error) {
      this.notificationService.showErrorNotification(this.translateService.instant('START_SEASON_ERROR'));
    }
  }

}
