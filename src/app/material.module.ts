import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatSelectModule } from '@angular/material/select';
import { NgModule } from '@angular/core';

@NgModule({
    imports: [
        MatButtonModule,
        MatDividerModule,
        MatIconModule,
        MatSelectModule,
        MatSidenavModule,
        MatToolbarModule
    ],
    exports: [
        MatToolbarModule,
        MatDividerModule,
        MatButtonModule,
        MatIconModule,
        MatSelectModule,
        MatSidenavModule
    ],
})
export class MaterialModule { }
