import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogClose } from '@angular/material/dialog';
import { marker } from '@biesbjerg/ngx-translate-extract-marker';
import { MatchService, NotificationService } from '@lima/shared/services';
import { firstValueFrom } from 'rxjs';
import { Match, MatchDay } from 'src/api/graphql';
import { CustomDateModule } from '../../pipes/custom-date/custom-date.module';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { TranslateModule } from '@ngx-translate/core';
import { EditMatchBaseModule } from '../edit-match-base/edit-match-base.module';

@Component({
    selector: 'lima-edit-match-kickoff',
    templateUrl: './edit-match-kickoff.component.html',
    styleUrls: [],
    standalone: true,
    imports: [
        EditMatchBaseModule,
        TranslateModule,
        MatIconModule,
        MatFormFieldModule,
        ReactiveFormsModule,
        MatInputModule,
        MatDatepickerModule,
        MatButtonModule,
        MatDialogClose,
        CustomDateModule,
    ],
})
export class EditMatchKickoffComponent {

    newKickoff = new FormGroup({
        time: new FormControl<string>('', [Validators.required]),
        date: new FormControl<Date | null>(null, [Validators.required]),
    });

    constructor(
        @Inject(MAT_DIALOG_DATA)
        public data: { match: Match; matchDay: MatchDay },
        private notify: NotificationService,
        private dialogRef: MatDialogRef<EditMatchKickoffComponent>,
        private matchService: MatchService,
    ) {}

    async onSaveClicked() {
        const kickoff = this.newKickoff.value.date as Date;
        const time = this.newKickoff.value.time?.split(':');
        if (time) {
            kickoff.setHours(+time[0]);
            kickoff.setMinutes(+time[1]);
        }

        try {
            await firstValueFrom(
                this.matchService.scheduleMatch({
                    match_id: this.data.match.id,
                    kickoff,
                }),
            );
            this.notify.showSuccessNotification(marker('EDIT_KICKOFF_SUCCESS'));
            this.dialogRef.close(true);
        } catch (error) {
            // throw error
        }
    }

}
