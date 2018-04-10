import { NgModule } from '@angular/core';

import { ReportsRoutingModule } from './reports-routing.module';
import { ReportsComponent } from './reports.component';
import { SharedModule } from '@app/shared';
import { LMarkdownEditorModule } from 'ngx-markdown-editor';
import { MaterialModule } from '@app/material.module';
import { MarkdownModule, MarkdownService } from 'ngx-markdown';

@NgModule({
    imports: [
        SharedModule,
        MaterialModule,
        LMarkdownEditorModule,
        ReportsRoutingModule,
        MarkdownModule.forRoot()
    ],
    declarations: [
        ReportsComponent
    ],
    providers: [
        MarkdownService
    ]
})
export class ReportModule { }
