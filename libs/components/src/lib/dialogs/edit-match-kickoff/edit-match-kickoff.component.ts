import { Component, inject } from '@angular/core';
import {
    FormControl,
    FormGroup,
    Validators,
    ReactiveFormsModule,
} from '@angular/forms';
import {
    MatDialogRef,
    MAT_DIALOG_DATA,
    MatDialogClose,
} from '@angular/material/dialog';
import { marker } from '@colsen1991/ngx-translate-extract-marker';
import { MatchService, NotificationService } from '@liga-manager-ui/services';
import { firstValueFrom } from 'rxjs';
import { Match, MatchDay } from '@liga-manager-api/graphql';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { TranslateModule } from '@ngx-translate/core';
import { EditMatchBaseComponent } from '../edit-match-base';
import { CustomDatePipe } from '@liga-manager-ui/pipes';
import { CypressSelectorDirective } from '@liga-manager-ui/directives';
import { MatCardModule } from '@angular/material/card';

@Component({
    selector: 'lima-edit-match-kickoff',
    templateUrl: './edit-match-kickoff.component.html',
    styleUrls: [],
    standalone: true,
    imports: [
        EditMatchBaseComponent,
        TranslateModule,
        MatIconModule,
        MatFormFieldModule,
        ReactiveFormsModule,
        MatInputModule,
        MatDatepickerModule,
        MatButtonModule,
        MatDialogClose,
        CustomDatePipe,
        CypressSelectorDirective,
        MatCardModule,
    ],
})
export class EditMatchKickoffComponent {

    newKickoff = new FormGroup({
        time: new FormControl<string>('', [Validators.required]),
        date: new FormControl<Date | null>(null, [Validators.required]),
    });

    data = inject<{ match: Match; matchDay: MatchDay }>(MAT_DIALOG_DATA);

    private notificationService = inject(NotificationService);

    private dialogRef = inject(MatDialogRef<EditMatchKickoffComponent>);

    private matchService = inject(MatchService);

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
            this.notificationService.showSuccessNotification(
                marker('EDIT_KICKOFF_SUCCESS'),
            );
            this.dialogRef.close(true);
        } catch (_error) {
            console.error(_error);
        }
    }

}
