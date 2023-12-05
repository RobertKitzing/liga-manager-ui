import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogClose } from '@angular/material/dialog';
import { marker } from '@biesbjerg/ngx-translate-extract-marker';
import { MatchService, NotificationService } from '@lima/shared/services';
import { firstValueFrom } from 'rxjs';
import { Match, MatchDay } from 'src/api/graphql';
import { TranslateModule } from '@ngx-translate/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { EditMatchBaseModule } from '../edit-match-base/edit-match-base.module';

@Component({
    selector: 'lima-edit-match-result',
    templateUrl: './edit-match-result.component.html',
    styleUrls: [],
    standalone: true,
    imports: [
        EditMatchBaseModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        MatDialogClose,
        MatIconModule,
        TranslateModule,
    ],
})
export class EditMatchResultComponent {

    resultFormGroup = new FormGroup({
        home_score: new FormControl(this.data.match.home_score, [
            Validators.required,
        ]),
        guest_score: new FormControl(this.data.match.guest_score, [
            Validators.required,
        ]),
    });

    constructor(
        @Inject(MAT_DIALOG_DATA)
        public data: { match: Match; matchDay: MatchDay },
        private notify: NotificationService,
        private dialogRef: MatDialogRef<EditMatchResultComponent>,
        private matchService: MatchService,
    ) {}

    async onSaveClicked() {
        try {
            if (
                this.resultFormGroup.value.home_score &&
                this.resultFormGroup.value.guest_score
            ) {
                await firstValueFrom(
                    this.matchService.submitMatchResult({
                        match_id: this.data.match.id,
                        home_score: this.resultFormGroup.value.home_score,
                        guest_score: this.resultFormGroup.value.guest_score,
                    }),
                );
                this.notify.showSuccessNotification(
                    marker('EDIT_RESULT_SUCCESS'),
                );
                this.dialogRef.close(true);
            }
        } catch (error) {
            // throw error
        }
    }

}
