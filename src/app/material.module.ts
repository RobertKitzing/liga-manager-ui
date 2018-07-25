import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatSelectModule } from '@angular/material/select';
import { NgModule } from '@angular/core';
import { MatDialogModule, MatStepperModule, MatInputModule, MatAutocompleteModule, MatTabsModule, MatMenuModule, MatListModule, MatDatepickerModule, MatNativeDateModule, MatTooltipModule } from '@angular/material';

@NgModule({
    imports: [
        MatButtonModule,
        MatDividerModule,
        MatIconModule,
        MatSelectModule,
        MatSidenavModule,
        MatToolbarModule,
        MatDialogModule,
        MatInputModule,
        MatAutocompleteModule,
        MatStepperModule,
        MatTabsModule,
        MatMenuModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatListModule,
        MatTooltipModule,
        MatAutocompleteModule
    ],
    exports: [
        MatToolbarModule,
        MatTooltipModule,
        MatAutocompleteModule,
        MatNativeDateModule,
        MatDividerModule,
        MatDatepickerModule,
        MatButtonModule,
        MatAutocompleteModule,
        MatIconModule,
        MatSelectModule,
        MatSidenavModule,
        MatDialogModule,
        MatStepperModule,
        MatInputModule,
        MatTabsModule,
        MatMenuModule,
        MatListModule
    ],
})
export class MaterialModule { }
