import { Component, DestroyRef, inject } from '@angular/core';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { NotificationService } from '@liga-manager-ui/services';
import { MatButtonModule } from '@angular/material/button';
import { ManageSeasonBaseComponent } from '../manage-season.base.component';
import { ADMIN_ROUTES, APP_ROUTES } from '@liga-manager-ui/common';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmComponent, defaultDialogConfig } from '@liga-manager-ui/components';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { marker } from '@colsen1991/ngx-translate-extract-marker';

@Component({
    selector: 'lima-manage-start-stop',
    standalone: true,
    imports: [TranslateModule, MatButtonModule],
    templateUrl: './manage-start-stop.component.html',
})
export class ManageStartStopComponent extends ManageSeasonBaseComponent {

    notificationService = inject(NotificationService);

    translateService = inject(TranslateService);

    matDialog = inject(MatDialog);

    destroyRef = inject(DestroyRef);

    async endSeason(seasonId: string) {

        this.matDialog.open(ConfirmComponent,
            {
                ...defaultDialogConfig,
                data: {
                    body: marker('ARE_YOU_SURE_TO_DELETE_THIS_SEASON'),
                },
            },
        )
            .afterClosed()
            .pipe(takeUntilDestroyed(this.destroyRef))
            .subscribe(
                (result) => {
                    console.log(result);
                    if (result) {
                        try {
                            this.seasonService.endSeason(seasonId);
                            this.notificationService.showSuccessNotification(
                                this.translateService.instant('END_SEASON_SUCCESS'),
                            );
                        } catch (_error) {
                            this.notificationService.showErrorNotification(
                                this.translateService.instant('END_SEASON_ERROR'),
                            );
                        }
                    }
                },
            );
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

            this.matDialog.open(ConfirmComponent)
                .afterClosed()
                .pipe(takeUntilDestroyed(this.destroyRef))
                .subscribe(
                    (result) => {
                        console.log(result);
                    },
                );
            
            // await this.seasonService.deleteSeason(seasonId);
            // this.notificationService.showSuccessNotification(
            //     this.translateService.instant('START_SEASON_SUCCESS'),
            // );
            // this.router.navigateByUrl(
            //     `${APP_ROUTES.ADMIN}/${ADMIN_ROUTES.SEASONS}`,
            // );
        } catch (_error) {
            this.notificationService.showErrorNotification(
                this.translateService.instant('START_SEASON_ERROR'),
            );
        }
    }

}
