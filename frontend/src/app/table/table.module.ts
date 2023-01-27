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
    HammerModule,
    TranslateModule.forChild(),
  ]
})
export class TableModule { }
