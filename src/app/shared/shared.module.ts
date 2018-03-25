import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { EditMatchDialogComponent } from './editmatch.modal';
import { TeamService } from './../service/team.service';
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
    AngularFontAwesomeModule,
    TranslateModule,
    FormsModule
  ],
  entryComponents: [
    EditMatchDialogComponent
  ],
  declarations: [
    LoaderComponent,
    EditMatchDialogComponent
  ],
  exports: [
    LoaderComponent,
    EditMatchDialogComponent
  ],
  providers: [
    SeasonService,
    TeamService
  ]
})
export class SharedModule { }
