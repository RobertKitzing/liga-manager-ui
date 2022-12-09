import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSelectModule } from '@angular/material/select';
import { TableRoutingModule } from './table-routing.module';
import { TableComponent } from './table.component';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatProgressBarModule } from '@angular/material/progress-bar';

@NgModule({
  declarations: [
    TableComponent
  ],
  imports: [
    CommonModule,
    MatToolbarModule,
    TableRoutingModule,
    MatSelectModule,
    MatSlideToggleModule,
    MatProgressBarModule,
  ]
})
export class TableModule { }
