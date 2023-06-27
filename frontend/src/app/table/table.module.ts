import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { TableRoutingModule } from './table-routing.module';
import { TableComponent } from './table.component';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { TranslateModule } from '@ngx-translate/core';
import { HammerModule } from '@angular/platform-browser';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { TruncateModule } from '../pipes';
import { SeasonChooserModule } from '../shared/components';

@NgModule({
    declarations: [TableComponent],
    imports: [
        CommonModule,
        TableRoutingModule,
        TruncateModule,
        MatProgressBarModule,
        MatTableModule,
        MatIconModule,
        HammerModule,
        MatToolbarModule,
        TranslateModule.forChild(),
        SeasonChooserModule,
    ],
})
export class TableModule {}
