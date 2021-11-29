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
import { TranslateModule } from '@ngx-translate/core';
import { SnackbarComponent } from './snackbar/snackbar.component';
import { ContactPersonComponent } from './contact-person/contact-person.component';
import { EditContactComponent } from './edit-contact/edit-contact.component';
import { EditPitchContactDialogComponent } from './edit-pitch-contact-dialog/edit-pitch-contact-dialog.component';
import { CreatePitchDialogComponent } from './create-pitch-dialog/create-pitch-dialog.component';
import { CancelMatchDialogComponent } from './cancel-match-dialog/cancel-match-dialog.component';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';
import { FullCalendarModule } from '@fullcalendar/angular';

import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import interactionPlugin from '@fullcalendar/interaction';
import { DateAdapter } from '@angular/material/core';
import { CustomDateAdapter } from './custom-date-adapter';

FullCalendarModule.registerPlugins([
  dayGridPlugin,
  timeGridPlugin,
  listPlugin,
  interactionPlugin
]);

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    TranslateModule,
    FullCalendarModule,
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
    CancelMatchDialogComponent,
    ConfirmDialogComponent
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
    EditContactComponent,
    CancelMatchDialogComponent,
    FullCalendarModule,
  ],
  providers: [
    {
      provide: DateAdapter,
      useClass: CustomDateAdapter,
    }
  ],
})
export class SharedModule { }
