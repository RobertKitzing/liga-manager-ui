import { Component, inject } from '@angular/core';
import {
    FormControl,
    FormGroup,
    Validators,
    ReactiveFormsModule,
} from '@angular/forms';
import { MatDialogRef, MatDialogClose, MatDialogModule } from '@angular/material/dialog';
import { marker } from '@colsen1991/ngx-translate-extract-marker';
import { firstValueFrom } from 'rxjs';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { TranslateModule } from '@ngx-translate/core';
import { CypressSelectorDirective } from '@liga-manager-ui/directives';
import { MatCardModule } from '@angular/material/card';
import { format, formatISO, parseISO, set } from 'date-fns';
import { fromZonedTime } from 'date-fns-tz';
import { DateTimeComponent } from '../../components';
import { EditMatchBaseComponent } from '../edit-match-base';
import { AppSettingsSelectors } from '@liga-manager-ui/states';
import { select } from '@ngxs/store';

@Component({
    selector: 'lima-edit-match-kickoff',
    templateUrl: './edit-match-kickoff.component.html',
    styleUrls: [],
    standalone: true,
    imports: [
        TranslateModule,
        MatIconModule,
        MatFormFieldModule,
        ReactiveFormsModule,
        MatInputModule,
        MatDatepickerModule,
        MatButtonModule,
        MatDialogClose,
        CypressSelectorDirective,
        MatCardModule,
        DateTimeComponent,
        MatDialogModule,
        MatCardModule,
    ],
})
export class EditMatchKickoffComponent extends EditMatchBaseComponent {

    localTimeZone = select(AppSettingsSelectors.localTimeZone);

    newKickoff = new FormGroup({
        time: new FormControl<string>('', [Validators.required]),
        date: new FormControl<Date | null>(null, [Validators.required]),
    });

    private dialogRef = inject(MatDialogRef<EditMatchKickoffComponent>);

    constructor() {
        super();
        if (this.data.match.kickoff) {
            const kickoff = parseISO(this.data.match.kickoff);
            this.newKickoff.controls.date.setValue(kickoff);
            this.newKickoff.controls.time.setValue(format(kickoff, 'HH:mm'));
        }
    }

    async onSaveClicked() {
        let kickoff = this.newKickoff.value.date;
        if (!kickoff) {
            return;
        }
        const time = this.newKickoff.value.time?.split(':');
        if (time) {
            kickoff = set(kickoff, { hours: +time[0], minutes: +time[1]});
        }

        try {
            await firstValueFrom(
                this.matchService.scheduleMatch({
                    match_id: this.data.match.id,
                    kickoff: formatISO(fromZonedTime(kickoff, this.localTimeZone() )),
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
