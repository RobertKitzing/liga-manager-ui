import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatchComponent } from './match/match.component';
import { MaterialModule } from '../../material.module';
import { ContactComponent } from './contact/contact.component';
import { FormsModule } from '@angular/forms';
import { SeasonchooserComponent } from './seasonchooser/seasonchooser.component';
import { FinalroundPipe } from './finalround.pipe';
import { EditmatchResultComponent } from './editmatch/editmatch.result.component';
import { EditmatchTimeComponent } from './editmatch/editmatch.time.component';
import { EditmatchPitchComponent } from './editmatch/editmatch.pitch.component';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MaterialModule,
    OwlDateTimeModule,
    OwlNativeDateTimeModule,
    TranslateModule
  ],
  entryComponents: [
    ContactComponent,
    EditmatchResultComponent,
    EditmatchTimeComponent,
    EditmatchPitchComponent
  ],
  declarations: [
    MatchComponent,
    ContactComponent,
    EditmatchResultComponent,
    SeasonchooserComponent,
    EditmatchTimeComponent,
    FinalroundPipe,
    EditmatchPitchComponent
  ],
  exports: [
    MatchComponent,
    TranslateModule,
    FormsModule,
    SeasonchooserComponent,
    MaterialModule,
    FinalroundPipe,
    OwlDateTimeModule,
    OwlNativeDateTimeModule
  ]
})
export class SharedModule { }
