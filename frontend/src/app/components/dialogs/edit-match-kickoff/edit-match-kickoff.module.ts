import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditMatchKickoffComponent } from './edit-match-kickoff.component';
import { MatDialogModule } from '@angular/material/dialog';
import { TranslateModule } from '@ngx-translate/core';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { EditMatchBaseModule } from '../edit-match-base/edit-match-base.module';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { DateAdapter, MatNativeDateModule } from '@angular/material/core';
import { CustomDateModule } from '@lima/shared/pipes';
import { CustomDateAdapter } from '@lima/shared/utils';

@NgModule({
    declarations: [EditMatchKickoffComponent],
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
        CustomDateModule,
        ReactiveFormsModule,
        MatDatepickerModule,
        MatNativeDateModule,
    ],
    providers: [
        {
            provide: DateAdapter,
            useClass: CustomDateAdapter,
        },
    ],
})
export class EditMatchKickoffModule {}
