import { Component, inject } from '@angular/core';
import {
    FormControl,
    FormGroup,
    Validators,
    ReactiveFormsModule,
} from '@angular/forms';
import { MatDialogRef, MatDialogClose, MatDialogModule } from '@angular/material/dialog';
import { marker } from '@colsen1991/ngx-translate-extract-marker';
import { firstValueFrom } from 'rxjs';
import { TranslateModule } from '@ngx-translate/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { EditMatchBaseComponent } from '../edit-match-base';
import { CypressSelectorDirective } from '@liga-manager-ui/directives';
import { MatCardModule } from '@angular/material/card';

@Component({
    selector: 'lima-edit-match-result',
    templateUrl: './edit-match-result.component.html',
    styleUrls: [],
    standalone: true,
    imports: [
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        MatDialogClose,
        MatIconModule,
        TranslateModule,
        CypressSelectorDirective,
        MatDialogModule,
        MatCardModule,
    ],
})
export class EditMatchResultComponent  extends EditMatchBaseComponent {

    private dialogRef = inject(MatDialogRef<EditMatchResultComponent>);

    resultFormGroup = new FormGroup({
        home_score: new FormControl(this.data.match.home_score, [
            Validators.required,
        ]),
        guest_score: new FormControl(this.data.match.guest_score, [
            Validators.required,
        ]),
    });

    async onSaveClicked() {
        try {
            if (this.resultFormGroup.valid) {
                await firstValueFrom(
                    this.matchService.submitMatchResult({
                        match_id: this.data.match.id,
                        home_score: this.resultFormGroup.value.home_score!,
                        guest_score: this.resultFormGroup.value.guest_score!,
                    }),
                );
                this.notificationService.showSuccessNotification(
                    marker('EDIT_RESULT_SUCCESS'),
                );
                this.dialogRef.close(true);
            }
        } catch (_error) {
            console.error(_error);
        }
    }

}
