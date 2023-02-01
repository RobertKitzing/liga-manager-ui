import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatSelectModule } from '@angular/material/select';
import { TableRoutingModule } from './table-routing.module';
import { TableComponent } from './table.component';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { TranslateModule } from '@ngx-translate/core';
import { TruncateModule } from '../truncate/truncate.module';
import { HammerModule } from '@angular/platform-browser';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';

@NgModule({
  declarations: [
    TableComponent
  ],
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
  ]
})
export class TableModule { }
