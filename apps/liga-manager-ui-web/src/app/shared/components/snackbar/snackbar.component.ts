import { Component, inject } from '@angular/core';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import {
    MAT_SNACK_BAR_DATA,
    MatSnackBarRef,
} from '@angular/material/snack-bar';
import { CypressSelectorDirective } from '../../directives/cypress-selector/cypress-selector.directive';
import { TranslateModule } from '@ngx-translate/core';

export interface SnackBarData {
    title: string;
    messages: string[];
    type: 'warn' | 'success';
    cySelector: CySelectors;
}

@Component({
    selector: 'lima-snackbar',
    templateUrl: './snackbar.component.html',
    styleUrls: [],
    imports: [TranslateModule, MatDividerModule, MatIconModule, CypressSelectorDirective],
    standalone: true,
})
export class SnackbarComponent {

    snackBarRef = inject(MatSnackBarRef<SnackbarComponent>);

    data = inject<SnackBarData>(MAT_SNACK_BAR_DATA);

}
