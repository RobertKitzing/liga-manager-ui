import { MatchplanComponent } from './matchplan.component';
import { MatchplanRoutingModule } from './matchplan-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { FlexLayoutModule } from '@angular/flex-layout';

import { MaterialModule } from '@app/material.module';


@NgModule({
  imports: [
    CommonModule,
    TranslateModule,
    FlexLayoutModule,
    MaterialModule,
    MatchplanRoutingModule
  ],
  declarations: [
    MatchplanComponent
  ]
})
export class MatchplanModule { }
