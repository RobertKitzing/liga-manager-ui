import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AngularFontAwesomeModule } from 'angular-font-awesome';

import { MaterialModule } from '@app/material.module';
import { LoaderComponent } from './loader/loader.component';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { SeasonService } from '@app/service/season.service';

@NgModule({
  imports: [
    FlexLayoutModule,
    MaterialModule,
    CommonModule,
    AngularFontAwesomeModule
  ],
  declarations: [
    LoaderComponent
  ],
  exports: [
    LoaderComponent
  ],
  providers: [
    SeasonService
  ]
})
export class SharedModule { }
