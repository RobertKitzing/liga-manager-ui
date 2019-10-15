import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatchService } from '../../../services/match.service';
import { TranslateService } from '@ngx-translate/core';
import { Match } from 'src/api/graphql';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-editmatchresult',
  templateUrl: './editmatch.result.component.html',
  styleUrls: ['./editmatch.result.component.css']
})
export class EditmatchResultComponent implements OnInit {

  home_score: number;
  guest_score: number;

  constructor(
    @Inject(MAT_DIALOG_DATA) public match: Match.Fragment,
    private matchService: MatchService,
    private dialogRef: MatDialogRef<EditmatchResultComponent>,
    public notify: NotificationService,
    public translateService: TranslateService
  ) {
    this.home_score = this.match.home_score;
    this.guest_score = this.match.guest_score;
  }

  ngOnInit() {

  }

  async onSaveClicked() {
    if (this.matchService.isValidResult(this.home_score) && this.matchService.isValidResult(this.guest_score)) {
      try {
        await this.matchService.submitMatchResult(this.match.id, this.home_score, this.guest_score);
        this.notify.showSuccessNotification(this.translateService.instant('EDIT_RESULT_SUCCESS'));
        this.dialogRef.close(true);
      } catch (error) {
        this.notify.showErrorNotification(this.translateService.instant('EDIT_RESULT_ERROR'), error);
      }
    } else {
      this.notify.showErrorNotification(this.translateService.instant('ENTER_VALID_RESULT'));
    }
  }
}
