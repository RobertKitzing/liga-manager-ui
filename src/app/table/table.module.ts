import { SharedModule } from '@app/shared';
import { CdkTableModule } from '@angular/cdk/table';
import { TableRoutingModule } from './table-routing.module';
import { TableComponent } from './table.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from '@app/material.module';
import { MatTableModule } from '@angular/material';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';

@NgModule({
  imports: [
    CommonModule,
    TranslateModule,
    FlexLayoutModule,
    MaterialModule,
    TableRoutingModule,
    SharedModule,
    NgxDatatableModule
  ],
  declarations: [
    TableComponent
  ]
})
export class TableModule { }
