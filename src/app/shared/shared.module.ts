import { EditMatchDialogComponent } from '@app/shared/editmatch/editmatch.dialog.component';
import { MatchComponent } from './match/match.component';
import { RoundPipe } from './pipes/round.pipe';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { TeamService } from './../service/team.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AngularFontAwesomeModule } from 'angular-font-awesome';

import { MaterialModule } from '@app/material.module';
import { LoaderComponent } from './loader/loader.component';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { SeasonService } from '@app/service/season.service';
import { MatNativeDateModule } from '@angular/material';
import { ErrorComponent } from '@app/shared/error/error.component';
import { PopoverModule } from 'ngx-bootstrap';

@NgModule({
  imports: [
    FlexLayoutModule,
    MaterialModule,
    CommonModule,
    AngularFontAwesomeModule,
    TranslateModule,
    FormsModule,
    BrowserModule,
    ReactiveFormsModule,
    PopoverModule.forRoot()
  ],
  entryComponents: [
    EditMatchDialogComponent
  ],
  declarations: [
    EditMatchDialogComponent,
    LoaderComponent,
    RoundPipe,
    MatchComponent,
    ErrorComponent
  ],
  exports: [
    LoaderComponent,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RoundPipe,
    ErrorComponent,
    MatchComponent,
    TranslateModule
  ],
  providers: [
    SeasonService,
    TeamService,
    MatNativeDateModule
  ]
})
export class SharedModule { }
