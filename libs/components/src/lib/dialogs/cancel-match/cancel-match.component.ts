import { Component, inject } from '@angular/core';
import { FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatDialogRef, MatDialogClose, MatDialogModule } from '@angular/material/dialog';
import { marker } from '@colsen1991/ngx-translate-extract-marker';
import { firstValueFrom } from 'rxjs';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { TextFieldModule } from '@angular/cdk/text-field';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { TranslateModule } from '@ngx-translate/core';
import { EditMatchBaseComponent } from '../edit-match-base';
import { MatCardModule } from '@angular/material/card';

@Component({
    selector: 'lima-cancel-match',
    templateUrl: './cancel-match.component.html',
    styleUrls: [],
    standalone: true,
    imports: [
        TranslateModule,
        MatFormFieldModule,
        MatInputModule,
        TextFieldModule,
        ReactiveFormsModule,
        MatButtonModule,
        MatDialogClose,
        MatIconModule,
        MatDialogModule,
        MatCardModule,
    ],
})
export class CancelMatchComponent extends EditMatchBaseComponent {

    cancelMatchReason = new FormControl('', [
        Validators.maxLength(255),
    ]);

    private dialogRef = inject(MatDialogRef<CancelMatchComponent>);

    constructor(
    ) {
        super();
        if (this.data.match.cancellation_reason) {
            this.cancelMatchReason.setValue(
                this.data.match.cancellation_reason,
            );
        }
    }

    async onSaveClicked() {
        try {
            await firstValueFrom(
                this.matchService.cancelMatch({
                    match_id: this.data.match.id,
                    reason: this.cancelMatchReason.value || '',
                }),
            );
            this.notificationService.showSuccessNotification(
                marker('SUCCESS.CANCEL_MATCH'),
            );
            this.dialogRef.close(true);
        } catch (_error) {
            console.error(_error);
        }
    }

}
