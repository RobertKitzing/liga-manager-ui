import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TranslateService } from '@ngx-translate/core';
import { firstValueFrom } from 'rxjs';
import { Match, MatchDay } from 'src/api/graphql';
import { MatchService } from 'src/app/services/match.service';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'lima-edit-match-kickoff',
  templateUrl: './edit-match-kickoff.component.html',
  styleUrls: []
})
export class EditMatchKickoffComponent {

  newKickoff = new FormControl();

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { match: Match, matchDay: MatchDay },
    private notify: NotificationService,
    private translateService: TranslateService,
    private dialogRef: MatDialogRef<EditMatchKickoffComponent>,
    private matchService: MatchService,
  ) {

  }

  async onSaveClicked() {

  }
}
