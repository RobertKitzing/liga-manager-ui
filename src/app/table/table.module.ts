import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { CdkTableModule } from '@angular/cdk/table';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatTableModule, MatRippleModule } from '@angular/material';
import { MaterialModule } from '@app/material.module';
import { NgModule } from '@angular/core';
import { SharedModule } from '@app/shared';
import { TableComponent } from './table.component';
import { TableRoutingModule } from './table-routing.module';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    CommonModule,
    FlexLayoutModule,
    MaterialModule,
    SharedModule,
    TableRoutingModule,
    TranslateModule,
  ],
  declarations: [
    TableComponent
  ]
})
export class TableModule { }
