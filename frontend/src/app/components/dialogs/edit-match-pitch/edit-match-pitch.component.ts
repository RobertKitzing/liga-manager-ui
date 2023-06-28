import { Component, Inject } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { marker } from '@biesbjerg/ngx-translate-extract-marker';
import { MatchService, NotificationService, PitchService } from '@lima/shared/services';
import { firstValueFrom, map, startWith, switchMap } from 'rxjs';
import { Match, MatchDay, Pitch } from 'src/api/graphql';

@Component({
    selector: 'lima-edit-match-pitch',
    templateUrl: './edit-match-pitch.component.html',
    styleUrls: [],
})
export class EditMatchPitchComponent {
    newMatchPitch = new FormControl();

    filteredPitches = this.newMatchPitch.valueChanges.pipe(
        startWith<string | Pitch>(''),
        map((value) => (typeof value === 'string' ? value : value.label)),
        switchMap(() => this.pitchService.allPitches$),
        map((x) => {
            return this.newMatchPitch.value &&
                typeof this.newMatchPitch.value === 'string'
                ? x?.filter((y) =>
                      y?.label
                          .toLowerCase()
                          .includes(this.newMatchPitch.value.toLowerCase())
                  )
                : x;
        })
    );

    constructor(
        @Inject(MAT_DIALOG_DATA)
        public data: { match: Match; matchDay: MatchDay },
        private notify: NotificationService,
        private dialogRef: MatDialogRef<EditMatchPitchComponent>,
        private matchService: MatchService,
        private pitchService: PitchService
    ) {}

    async onSaveClicked() {
        try {
            await firstValueFrom(
                this.matchService.locateMatch({
                    match_id: this.data.match.id,
                    pitch_id: this.newMatchPitch.value.id,
                })
            );
            this.notify.showSuccessNotification(marker('EDIT_PITCH_SUCCESS'));
            this.dialogRef.close(true);
        } catch (error) {
            // throw error
        }
    }

    displayPitch(pitch?: Pitch): string {
        return pitch ? pitch.label : '';
    }
}
