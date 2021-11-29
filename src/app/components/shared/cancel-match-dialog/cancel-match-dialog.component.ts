import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Match, CancelMatchGQL, SeasonGQL } from 'src/api/graphql';
import { TranslateService } from '@ngx-translate/core';
import { NotificationService } from 'src/app/services/notification.service';
import { SeasonService } from 'src/app/services/season.service';
import { MatchService } from 'src/app/services/match.service';

@Component({
  selector: 'app-cancel-match-dialog',
  templateUrl: './cancel-match-dialog.component.html',
  styleUrls: ['./cancel-match-dialog.component.css']
})
export class CancelMatchDialogComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public match: Match,
    public dialogRef: MatDialogRef<CancelMatchDialogComponent>,
    private translateService: TranslateService,
    private notify: NotificationService,
    private matchService: MatchService,
  ) { }

  ngOnInit() {
  }

  async cancelMatch(reason: string) {
    try {
      await this.matchService.cancelMatch(this.match.id, reason);
      this.notify.showSuccessNotification(this.translateService.instant('CANCEL_MATCH_SUCCESS'));
      this.dialogRef.close();
    } catch (error) {
      this.notify.showErrorNotification(this.translateService.instant('CANCEL_MATCH_ERROR'), error);
    }
  }
}
