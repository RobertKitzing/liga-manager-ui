import { SharedModule } from '@app/shared';
import { MatchplanComponent } from './matchplan.component';
import { MatchplanRoutingModule } from './matchplan-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { MaterialModule } from '@app/material.module';


@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    FormsModule,
    TranslateModule,
    FlexLayoutModule,
    MaterialModule,
    SharedModule,
    MatchplanRoutingModule
  ],
  declarations: [
    MatchplanComponent
  ]
})
export class MatchplanModule { }
