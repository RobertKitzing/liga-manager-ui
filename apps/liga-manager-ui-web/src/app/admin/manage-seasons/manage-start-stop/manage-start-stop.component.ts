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

    

}
