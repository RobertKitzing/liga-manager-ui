
import { Component, Inject } from '@angular/core';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MAT_SNACK_BAR_DATA, MatSnackBarRef } from '@angular/material/snack-bar';
import { TranslateModule } from '@ngx-translate/core';

export interface SnackBarData {
    title: string;
    messages: string[];
    type: 'warn' | 'success';
}

@Component({
    selector: 'lima-snackbar',
    templateUrl: './snackbar.component.html',
    styleUrls: [],
    imports: [
        TranslateModule,
        MatDividerModule,
        MatIconModule,
    ],
    standalone: true,
})
export class SnackbarComponent {

    constructor(
        public snackBarRef: MatSnackBarRef<SnackbarComponent>,
        @Inject(MAT_SNACK_BAR_DATA) public data: SnackBarData
    ) {}

}
