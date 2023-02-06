import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TranslateService } from '@ngx-translate/core';
import { firstValueFrom, map, startWith, switchMap } from 'rxjs';
import { Match, MatchDay, Pitch } from 'src/api/graphql';
import { MatchService } from 'src/app/services/match.service';
import { NotificationService } from 'src/app/services/notification.service';
import { PitchService } from 'src/app/services/pitch.service';

@Component({
  selector: 'lima-cancel-match',
  templateUrl: './cancel-match.component.html',
  styleUrls: []
})
export class CancelMatchComponent {

  cancelMatchReason = new FormControl('', [Validators.required, Validators.maxLength(255)]);
  
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { match: Match, matchDay: MatchDay },
    private notify: NotificationService,
    private translateService: TranslateService,
    private dialogRef: MatDialogRef<CancelMatchComponent>,
    private matchService: MatchService,
  ) {

    this.cancelMatchReason.valueChanges.subscribe(
      () => {
        console.log(this.cancelMatchReason.errors)
      }
    );
  }

  async onSaveClicked() {
    try {
      await firstValueFrom(this.matchService.cancelMatch({match_id: this.data.match.id, reason: this.cancelMatchReason.value!}));
      this.notify.showSuccessNotification(this.translateService.instant('CANCEL_MATCH_SUCCESS'));
      this.dialogRef.close(true);
    } catch (error) {
      throw error
    }
  }

}
