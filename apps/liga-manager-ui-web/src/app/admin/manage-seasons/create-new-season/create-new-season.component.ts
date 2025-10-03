import { Component, inject } from '@angular/core';
import {
    FormControl,
    FormsModule,
    ReactiveFormsModule,
    Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import {
    MatDialogActions,
    MatDialogContent,
    MatDialogRef,
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

    private seasonService = inject(SeasonService);

    private notificationService = inject(NotificationService);

    dialogRef = inject(MatDialogRef<CreateNewSeasonComponent>);

    newName = new FormControl('', [Validators.required]);

    async createSeason() {
        try {
            await firstValueFrom(
                this.seasonService.createSeason(this.newName.value!),
            );
            this.notificationService.showSuccessNotification(
                marker('SUCCESS.CREATE_SEASON'),
            );
            this.dialogRef.close();
        } catch (_error) {
            this.notificationService.showErrorNotification(
                marker('CREATE_SEASON_ERROR'),
            );
        }
    }

}
