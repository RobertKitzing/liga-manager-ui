import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditMatchKickoffComponent } from './edit-match-kickoff.component';
import { MatDialogModule } from '@angular/material/dialog';
import { TranslateModule } from '@ngx-translate/core';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { CustomDateModule } from 'src/app/pipes/custom-date/custom-date.module';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { EditMatchBaseModule } from '../edit-match-base/edit-match-base.module';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { DateAdapter, MatNativeDateModule } from '@angular/material/core';
import { CustomDateAdapter } from 'src/app/custom-date-adapter';


@NgModule({
  declarations: [
    EditMatchKickoffComponent
  ],
  imports: [
    CommonModule,
    MatDialogModule,
    TranslateModule,
    MatInputModule,
    CustomDateModule,
    ReactiveFormsModule,
    MatButtonModule,
    EditMatchBaseModule,
    MatIconModule,
    CustomDateModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    MatNativeDateModule,
  ],
  providers: [
    {
      provide: DateAdapter,
      useClass: CustomDateAdapter,
    }
  ]
})
export class EditMatchKickoffModule { }
