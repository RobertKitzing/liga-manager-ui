import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatSelectModule } from '@angular/material/select';
import { NgModule } from '@angular/core';
import { MatDialogModule, MatStepperModule, MatInputModule, MatAutocompleteModule, MatTabsModule } from '@angular/material';

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
        MatTabsModule
    ],
    exports: [
        MatToolbarModule,
        MatDividerModule,
        MatButtonModule,
        MatAutocompleteModule,
        MatIconModule,
        MatSelectModule,
        MatSidenavModule,
        MatDialogModule,
        MatStepperModule,
        MatInputModule,
        MatTabsModule
    ],
})
export class MaterialModule { }
