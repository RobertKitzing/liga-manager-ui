import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { TranslateModule } from '@ngx-translate/core';

@Component({
    selector: 'lima-confirm',
    templateUrl: './confirm.component.html',
    styleUrls: [],
    standalone: true,
    imports: [
        TranslateModule,
        CommonModule,
        MatDialogModule,
        MatButtonModule,
    ],
})
export class ConfirmComponent {

    data = inject<{ body: string }>(MAT_DIALOG_DATA);

    dialogRef = inject(MatDialogRef<ConfirmComponent>);

}
