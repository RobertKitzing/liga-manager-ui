import { CommonModule } from '@angular/common';
import { HammerModule } from '@angular/platform-browser';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { NgModule } from '@angular/core';
import { SeasonChooserModule } from '@lima/shared/components';
import { TableComponent } from './table.component';
import { TableRoutingModule } from './table-routing.module';
import { TranslateModule } from '@ngx-translate/core';
import { TruncateModule } from '@lima/shared/pipes';

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
