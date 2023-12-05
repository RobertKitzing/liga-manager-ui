import { Component, Inject } from '@angular/core';
import { FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogClose } from '@angular/material/dialog';
import { marker } from '@biesbjerg/ngx-translate-extract-marker';
import { MatchService, NotificationService } from '@lima/shared/services';
import { firstValueFrom } from 'rxjs';
import { Match, MatchDay } from 'src/api/graphql';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { TextFieldModule } from '@angular/cdk/text-field';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { TranslateModule } from '@ngx-translate/core';
import { EditMatchBaseModule } from '../edit-match-base/edit-match-base.module';

@Component({
    selector: 'lima-cancel-match',
    templateUrl: './cancel-match.component.html',
    styleUrls: [],
    standalone: true,
    imports: [
        EditMatchBaseModule,
        TranslateModule,
        MatFormFieldModule,
        MatInputModule,
        TextFieldModule,
        ReactiveFormsModule,
        MatButtonModule,
        MatDialogClose,
        MatIconModule,
    ],
})
export class CancelMatchComponent {

    cancelMatchReason = new FormControl('', [
        Validators.required,
        Validators.maxLength(255),
    ]);

    constructor(
        @Inject(MAT_DIALOG_DATA)
        public data: { match: Match; matchDay: MatchDay },
        private notify: NotificationService,
        private dialogRef: MatDialogRef<CancelMatchComponent>,
        private matchService: MatchService,
    ) {
        if (this.data.match.cancellation_reason) {
            this.cancelMatchReason.setValue(
                this.data.match.cancellation_reason,
            );
        }
    }

    async onSaveClicked() {
        try {
            if (this.cancelMatchReason.value) {
                await firstValueFrom(
                    this.matchService.cancelMatch({
                        match_id: this.data.match.id,
                        reason: this.cancelMatchReason.value,
                    }),
                );
                this.notify.showSuccessNotification(
                    marker('CANCEL_MATCH_SUCCESS'),
                );
                this.dialogRef.close(true);
            }
        } catch (error) {
            // throw error
        }
    }

}
