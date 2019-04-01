import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatSelectModule } from '@angular/material/select';
import { NgModule } from '@angular/core';
// tslint:disable-next-line:max-line-length
import { MatDialogModule, MatStepperModule, MatInputModule, MatAutocompleteModule, MatTabsModule, MatMenuModule, MatListModule, MatDatepickerModule, MatNativeDateModule, MatTooltipModule, MatSnackBarModule, MatProgressBarModule, MatSliderModule, MatSlideToggleModule, MatProgressSpinnerModule, MatCardModule } from '@angular/material';

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
