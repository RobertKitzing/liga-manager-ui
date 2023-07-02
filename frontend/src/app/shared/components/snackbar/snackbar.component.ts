import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { MatDividerModule } from '@angular/material/divider';
import { MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';
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
    imports: [CommonModule, TranslateModule, MatDividerModule],
    standalone: true,
})
export class SnackbarComponent {

    constructor(@Inject(MAT_SNACK_BAR_DATA) public data: SnackBarData) {}

}
