import { Component } from '@angular/core';
import {
    FormControl,
    FormsModule,
    ReactiveFormsModule,
    Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import {
    MatDialog,
    MatDialogActions,
    MatDialogContent,
    MatDialogTitle,
} from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { marker } from '@colsen1991/ngx-translate-extract-marker';
import { CypressSelectorDirective } from '@liga-manager-ui/directives';
import { NotificationService, SeasonService } from '@liga-manager-ui/services';
import { TranslateModule } from '@ngx-translate/core';
import { firstValueFrom } from 'rxjs';

@Component({
    selector: 'lima-create-new-season',
    standalone: true,
    imports: [
        MatDialogTitle,
        MatDialogContent,
        MatDialogActions,
        MatIconModule,
        MatInputModule,
        FormsModule,
        ReactiveFormsModule,
        MatButtonModule,
        TranslateModule,
        CypressSelectorDirective,
    ],
    templateUrl: './create-new-season.component.html',
})
export class CreateNewSeasonComponent {
    newName = new FormControl('', [Validators.required]);

    constructor(
        private seasonService: SeasonService,
        private dialog: MatDialog,
        private notificationService: NotificationService,
    ) {}

    async createSeason() {
        try {
            await firstValueFrom(
                this.seasonService.createSeason(this.newName.value!),
            );
            this.notificationService.showSuccessNotification(
                marker('CREATE_SEASON_SUCCESS'),
            );
            this.dialog.closeAll();
        } catch (error) {
            this.notificationService.showErrorNotification(
                marker('CREATE_SEASON_ERROR'),
            );
        }
    }
}
