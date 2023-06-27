import { CommonModule } from '@angular/common';
import { Component, OnInit, Inject } from '@angular/core';
import { MatDividerModule } from '@angular/material/divider';
import { MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';
import { TranslateModule } from '@ngx-translate/core';

export interface ISnackBarData {
    title: string;
    messages: string[];
    type: 'warn' | 'success';
}

@Component({
    selector: 'app-snackbar',
    templateUrl: './snackbar.component.html',
    styleUrls: [],
    imports: [CommonModule, TranslateModule, MatDividerModule],
    standalone: true,
})
export class SnackbarComponent implements OnInit {
    constructor(@Inject(MAT_SNACK_BAR_DATA) public data: ISnackBarData) {}

    ngOnInit() {}
}
