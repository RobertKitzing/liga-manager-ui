import { NgModule, Injectable } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatchComponent } from './match/match.component';
import { MaterialModule } from '../../material.module';
import { ContactComponent } from './contact/contact.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SeasonchooserComponent } from './seasonchooser/seasonchooser.component';
import { FinalroundPipe } from './finalround.pipe';
import { EditmatchResultComponent } from './editmatch/editmatch.result.component';
import { EditmatchTimeComponent } from './editmatch/editmatch.time.component';
import { EditmatchPitchComponent } from './editmatch/editmatch.pitch.component';
import { OwlDateTimeModule, OwlNativeDateTimeModule, OwlDateTimeIntl } from 'ng-pick-datetime';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { SnackbarComponent } from './snackbar/snackbar.component';

@Injectable()
export class CustomOwlDateTimeIntl extends OwlDateTimeIntl {
  constructor(private translationService: TranslateService) {
    super();
    this.translationService.get('BUTTON.SAVE').subscribe(
      (save) => {
        this.setBtnLabel = save;
      }
    );
    this.translationService.get('BUTTON.CANCEL').subscribe(
      (cancel) => {
        this.cancelBtnLabel = cancel;
      }
    );
  }
}

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
    SnackbarComponent
  ],
  exports: [
    MatchComponent,
    ReactiveFormsModule,
    TranslateModule,
    FormsModule,
    SeasonchooserComponent,
    MaterialModule,
    FinalroundPipe,
    OwlDateTimeModule,
    OwlNativeDateTimeModule
  ],
  providers: [
    {provide: OwlDateTimeIntl, useClass: CustomOwlDateTimeIntl},
  ]
})
export class SharedModule { }
