import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatSelectModule } from '@angular/material/select';
import { NgModule } from '@angular/core';
// tslint:disable-next-line:max-line-length
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatCardModule } from '@angular/material/card';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSliderModule } from '@angular/material/slider';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatStepperModule } from '@angular/material/stepper';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTooltipModule } from '@angular/material/tooltip';

@NgModule({
    imports: [
        MatButtonModule,
        MatCardModule,
        MatDividerModule,
        MatIconModule,
        MatSelectModule,
        MatProgressSpinnerModule,
        MatSlideToggleModule,
        MatSidenavModule,
        MatToolbarModule,
        MatDialogModule,
        MatInputModule,
        MatAutocompleteModule,
        MatStepperModule,
        MatTabsModule,
        MatSnackBarModule,
        MatMenuModule,
        MatProgressBarModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatListModule,
        MatTooltipModule,
        MatAutocompleteModule
    ],
    exports: [
        MatCardModule,
        MatToolbarModule,
        MatTooltipModule,
        MatAutocompleteModule,
        MatNativeDateModule,
        MatDividerModule,
        MatSnackBarModule,
        MatProgressBarModule,
        MatDatepickerModule,
        MatButtonModule,
        MatAutocompleteModule,
        MatIconModule,
        MatSelectModule,
        MatSidenavModule,
        MatSlideToggleModule,
        MatDialogModule,
        MatStepperModule,
        MatInputModule,
        MatTabsModule,
        MatMenuModule,
        MatListModule,
        MatProgressSpinnerModule
    ],
})
export class MaterialModule { }
