import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditMatchResultComponent } from './edit-match-result.component';
import { MatDialogModule } from '@angular/material/dialog';
import { TranslateModule } from '@ngx-translate/core';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { CustomDateModule } from 'src/app/pipes/custom-date/custom-date.module';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { EditMatchBaseModule } from '../edit-match-base/edit-match-base.module';



@NgModule({
  declarations: [
    EditMatchResultComponent
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
  ]
})
export class EditMatchResultModule { }
