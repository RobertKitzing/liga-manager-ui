import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CancelMatchComponent } from './cancel-match.component';
import { MatDialogModule } from '@angular/material/dialog';
import { TranslateModule } from '@ngx-translate/core';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { CustomDateModule } from 'src/app/pipes/custom-date/custom-date.module';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { EditMatchBaseModule } from '../edit-match-base/edit-match-base.module';
import { MatAutocompleteModule } from '@angular/material/autocomplete';


@NgModule({
  declarations: [
    CancelMatchComponent
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
    MatAutocompleteModule,
  ]
})
export class CancelMatchModule { }
