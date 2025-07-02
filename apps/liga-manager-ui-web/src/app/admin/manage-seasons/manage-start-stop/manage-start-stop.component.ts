import { Component, inject } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { NotificationService } from '@liga-manager-ui/services';
import { MatButtonModule } from '@angular/material/button';
import { APP_ROUTES, ADMIN_ROUTES } from '@liga-manager-ui';
import { ManageSeasonBaseComponent } from '../manage-season.base.component';

@Component({
    selector: 'lima-manage-start-stop',
    standalone: true,
    imports: [AsyncPipe, TranslateModule, MatButtonModule],
    templateUrl: './manage-start-stop.component.html',
})
export class ManageStartStopComponent extends ManageSeasonBaseComponent {

    notificationService = inject(NotificationService);

    translateService = inject(TranslateService);

    async endSeason(seasonId: string) {
        try {
            await this.seasonService.endSeason(seasonId);
            this.notificationService.showSuccessNotification(
                this.translateService.instant('START_SEASON_SUCCESS'),
            );
        } catch (_error) {
            this.notificationService.showErrorNotification(
                this.translateService.instant('START_SEASON_ERROR'),
            );
        }
    }

    async startSeason(seasonId: string) {
        try {
            await this.seasonService.startSeason(seasonId);
            this.notificationService.showSuccessNotification(
                this.translateService.instant('START_SEASON_SUCCESS'),
            );
        } catch (_error) {
            this.notificationService.showErrorNotification(
                this.translateService.instant('START_SEASON_ERROR'),
            );
        }
    }

    async deleteSeason(seasonId: string) {
        try {
            await this.seasonService.deleteSeason(seasonId);
            this.notificationService.showSuccessNotification(
                this.translateService.instant('START_SEASON_SUCCESS'),
            );
            this.router.navigateByUrl(
                `${APP_ROUTES.ADMIN}/${ADMIN_ROUTES.SEASONS}`,
            );
        } catch (_error) {
            this.notificationService.showErrorNotification(
                this.translateService.instant('START_SEASON_ERROR'),
            );
        }
    }

}
