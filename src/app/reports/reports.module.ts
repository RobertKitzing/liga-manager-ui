import { NgModule } from '@angular/core';

import { ReportsRoutingModule } from './reports-routing.module';
import { ReportsComponent } from './reports.component';
import { CovalentTextEditorModule } from '@covalent/text-editor';
import { SharedModule } from '@app/shared';

@NgModule({
    imports: [
        SharedModule,
        ReportsRoutingModule,
        CovalentTextEditorModule
    ],
    declarations: [
        ReportsComponent
    ],
})
export class ReportModule { }
