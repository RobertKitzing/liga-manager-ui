import { NgModule, Injectable } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatchComponent } from './components/shared/match/match.component';
import { MaterialModule } from './material.module';
import { ContactComponent } from './components/shared/contact/contact.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SeasonchooserComponent } from './components/shared/seasonchooser/seasonchooser.component';
import { FinalroundPipe } from './components/shared/finalround.pipe';
import { EditmatchResultComponent } from './components/shared/editmatch/editmatch.result.component';
import { EditmatchTimeComponent } from './components/shared/editmatch/editmatch.time.component';
import { EditmatchPitchComponent } from './components/shared/editmatch/editmatch.pitch.component';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
import { TranslateModule } from '@ngx-translate/core';
import { SnackbarComponent } from './components/shared/snackbar/snackbar.component';
import { MatProgressSpinnerModule } from '@angular/material';
import { ContactPersonComponent } from './components/shared/contact-person/contact-person.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    OwlDateTimeModule,
    OwlNativeDateTimeModule,
    TranslateModule,
    MatProgressSpinnerModule
  ],
  entryComponents: [
    ContactComponent,
    EditmatchResultComponent,
    EditmatchTimeComponent,
    EditmatchPitchComponent,
    SnackbarComponent
  ],
  declarations: [
    MatchComponent,
    ContactComponent,
    EditmatchResultComponent,
    SeasonchooserComponent,
    EditmatchTimeComponent,
    FinalroundPipe,
    EditmatchPitchComponent,
    SnackbarComponent,
    ContactPersonComponent
  ],
  exports: [
    CommonModule,
    MatchComponent,
    ReactiveFormsModule,
    ContactPersonComponent,
    TranslateModule,
    FormsModule,
    SeasonchooserComponent,
    MaterialModule,
    FinalroundPipe,
    OwlDateTimeModule,
    MatProgressSpinnerModule,
    OwlNativeDateTimeModule
  ]
})
export class SharedModule { }