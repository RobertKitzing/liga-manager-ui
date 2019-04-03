import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatchComponent } from './match/match.component';
import { MaterialModule } from '../../material.module';
import { ContactComponent } from './contact/contact.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SeasonchooserComponent } from './seasonchooser/seasonchooser.component';
import { EditmatchResultComponent } from './editmatch/editmatch.result.component';
import { EditmatchTimeComponent } from './editmatch/editmatch.time.component';
import { EditmatchPitchComponent } from './editmatch/editmatch.pitch.component';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
import { TranslateModule } from '@ngx-translate/core';
import { SnackbarComponent } from './snackbar/snackbar.component';
import { ContactPersonComponent } from './contact-person/contact-person.component';
import { EditContactComponent } from './edit-contact/edit-contact.component';
import { EditPitchContactDialogComponent } from './edit-pitch-contact-dialog/edit-pitch-contact-dialog.component';
import { CreatePitchDialogComponent } from './create-pitch-dialog/create-pitch-dialog.component';
import { CancelMatchDialogComponent } from './cancel-match-dialog/cancel-match-dialog.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    OwlDateTimeModule,
    OwlNativeDateTimeModule,
    TranslateModule
  ],
  entryComponents: [
    ContactComponent,
    EditmatchResultComponent,
    EditmatchTimeComponent,
    EditmatchPitchComponent,
    SnackbarComponent,
    EditPitchContactDialogComponent,
    CreatePitchDialogComponent,
    CancelMatchDialogComponent
  ],
  declarations: [
    MatchComponent,
    ContactComponent,
    EditmatchResultComponent,
    SeasonchooserComponent,
    EditmatchTimeComponent,
    EditmatchPitchComponent,
    SnackbarComponent,
    ContactPersonComponent,
    EditContactComponent,
    EditPitchContactDialogComponent,
    CreatePitchDialogComponent,
    CancelMatchDialogComponent
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
    OwlDateTimeModule,
    EditContactComponent,
    OwlNativeDateTimeModule,
    CancelMatchDialogComponent
  ]
})
export class SharedModule { }
