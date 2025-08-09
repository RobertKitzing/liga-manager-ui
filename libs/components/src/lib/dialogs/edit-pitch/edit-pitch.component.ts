import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { TranslateModule } from '@ngx-translate/core';
import { MatCardModule } from '@angular/material/card';
import { PitchService } from '@liga-manager-ui/services';
import { v4 as uuidv4 } from 'uuid';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIcon } from '@angular/material/icon';
import { firstValueFrom } from 'rxjs';

@Component({
    selector: 'lima-edit-pitch',
    templateUrl: './edit-pitch.component.html',
    styleUrls: [],
    standalone: true,
    imports: [
        TranslateModule,
        CommonModule,
        MatDialogModule,
        MatButtonModule,
        MatCardModule,
        MatFormFieldModule,
        FormsModule,
        ReactiveFormsModule,
        MatInputModule,
        MatButtonModule,
        MatIcon,
    ],
})
export class EditPitchDialogComponent {

    private pitchService = inject(PitchService);

    data = inject<{ body: string }>(MAT_DIALOG_DATA);

    dialogRef = inject(MatDialogRef<EditPitchDialogComponent>);

    formGroup = new FormGroup({
        id: new FormControl<string>(uuidv4(), { nonNullable: true }),
        label: new FormControl(null, [ Validators.required ]),
        longitude: new FormControl<number>(0, [ Validators.required ]),
        latitude: new FormControl<number>(0, [ Validators.required ]),
    })

    async onSaveClicked() {
        try {
            await firstValueFrom(this.pitchService.createPitch({
                id: this.formGroup.value.id!,
                label: this.formGroup.value.label!,
                longitude: this.formGroup.value.longitude!,
                latitude: this.formGroup.value.latitude!,
            }))
            this.dialogRef.close();
        } catch(error) {
            console.error(error)
        }
    }

}
