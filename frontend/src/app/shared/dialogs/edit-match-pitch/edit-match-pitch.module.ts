import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditMatchPitchComponent } from './edit-match-pitch.component';
import { MatDialogModule } from '@angular/material/dialog';
import { TranslateModule } from '@ngx-translate/core';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { EditMatchBaseModule } from '../edit-match-base';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { CustomDateModule } from '@lima/shared/pipes';

@NgModule({
    declarations: [EditMatchPitchComponent],
    imports: [
        CommonModule,
        MatDialogModule,
        TranslateModule.forChild(),
        MatInputModule,
        CustomDateModule,
        ReactiveFormsModule,
        MatButtonModule,
        EditMatchBaseModule,
        MatIconModule,
        MatAutocompleteModule,
    ],
})
export class EditMatchPitchModule {}
