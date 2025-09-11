import { Component, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { TranslateModule } from '@ngx-translate/core';
import { TeamChooserComponent } from '../../components';
import { Maybe, Team } from '@liga-manager-api/graphql';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { SeasonService } from '@liga-manager-ui/services';
import { v4 as uuidv4 } from 'uuid';
import { firstValueFrom } from 'rxjs';

export interface EditPenaltyDialogData {
    teams: Maybe<Team>[];
    seasonId: string | undefined,
}

@Component({
    selector: 'lima-edit-penalty',
    imports: [
        TranslateModule,
        MatDialogModule,
        ReactiveFormsModule,
        MatInputModule,
        MatFormFieldModule,
        MatIconModule,
        MatButtonModule,
        TeamChooserComponent,
    ],
    templateUrl: './edit-penalty.component.html',
})
export class EditPenaltyComponent {

    data = inject<EditPenaltyDialogData>(MAT_DIALOG_DATA);

    private seasonService = inject(SeasonService);

    penaltyFormGroup = new FormGroup(
        {
            team: new FormControl<Team | null>(null, [Validators.required]),
            points: new FormControl<number>(0, { nonNullable: true, validators: [ Validators.required ]}),
            reason: new FormControl('', { nonNullable: true, validators: [ Validators.required ]}),
        },
    );

    async onSaveClicked() {
        try {
            await firstValueFrom(this.seasonService.addPenalty({
                season_id: this.data.seasonId || '',
                id: uuidv4(),
                team_id: this.penaltyFormGroup.value.team?.id || '',
                points: this.penaltyFormGroup.value.points!,
                reason: this.penaltyFormGroup.value.reason!,
            }));
        } catch(error) {
            console.error(error);
        }
    }

}
