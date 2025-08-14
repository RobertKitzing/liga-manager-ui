import { Component, DestroyRef, inject, Inject } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import {
    MatDialogRef,
    MAT_DIALOG_DATA,
    MatDialogClose,
    MatDialog,
    MatDialogModule,
} from '@angular/material/dialog';
import { marker } from '@colsen1991/ngx-translate-extract-marker';
import {
    MatchService,
    NotificationService,
    PitchService,
} from '@liga-manager-ui/services';
import { firstValueFrom } from 'rxjs';
import { Match, MatchDay, Pitch } from '@liga-manager-api/graphql';
import { MatButtonModule } from '@angular/material/button';
import { MatOptionModule } from '@angular/material/core';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { TranslateModule } from '@ngx-translate/core';
import { PitchAutoCompleteComponent } from '../../components';
import { AsyncPipe } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { EditPitchDialogComponent } from '../edit-pitch';
import { defaultDialogConfig } from '../default-dialog-config';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
    selector: 'lima-edit-match-pitch',
    templateUrl: './edit-match-pitch.component.html',
    styleUrls: [],
    standalone: true,
    imports: [
        TranslateModule,
        MatIconModule,
        MatFormFieldModule,
        MatInputModule,
        MatAutocompleteModule,
        ReactiveFormsModule,
        MatOptionModule,
        MatButtonModule,
        MatDialogClose,
        PitchAutoCompleteComponent,
        AsyncPipe,
        MatCardModule,
        MatDialogModule,
    ],
})
export class EditMatchPitchComponent {

    newMatchPitchFC = new FormControl<Pitch | undefined>(undefined, [ Validators.required ]);

    private dialog = inject(MatDialog);

    private destroyRef = inject(DestroyRef);

    constructor(
        @Inject(MAT_DIALOG_DATA)
        public data: { match: Match; matchDay: MatchDay },
        private notificationService: NotificationService,
        private dialogRef: MatDialogRef<EditMatchPitchComponent>,
        private matchService: MatchService,
        public pitchService: PitchService,
    ) {}

    async onSaveClicked() {
        if (!this.newMatchPitchFC.valid) {
            return;
        }
        try {
            await firstValueFrom(
                this.matchService.locateMatch({
                    match_id: this.data.match.id,
                    pitch_id: this.newMatchPitchFC.value!.id,
                }),
            );
            this.notificationService.showSuccessNotification(
                marker('EDIT_PITCH_SUCCESS'),
            );
            this.dialogRef.close(true);
        } catch (_error) {
            console.error(_error);
            // throw error
        }
    }

    createPitch() {
        this.dialog.open(EditPitchDialogComponent,
            {
                ...defaultDialogConfig,
            },
        ).afterClosed().pipe(
            takeUntilDestroyed(this.destroyRef),
        ).subscribe(
            (pitch) => {
                if (pitch) {
                    this.newMatchPitchFC.setValue(pitch);
                }
            },
        )
    }

}
