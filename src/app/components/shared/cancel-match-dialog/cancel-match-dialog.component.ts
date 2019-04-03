import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { Match, CancelMatchGQL, MatchPlanGQL } from 'src/api/graphql';
import { TranslateService } from '@ngx-translate/core';
import { NotificationService } from 'src/app/services/notification.service';
import { SeasonService } from 'src/app/services/season.service';

@Component({
  selector: 'app-cancel-match-dialog',
  templateUrl: './cancel-match-dialog.component.html',
  styleUrls: ['./cancel-match-dialog.component.css']
})
export class CancelMatchDialogComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public match: Match.Fragment,
    public dialogRef: MatDialogRef<CancelMatchDialogComponent>,
    private cancelMatchGQL: CancelMatchGQL,
    private translateService: TranslateService,
    private notify: NotificationService,
    private matchPlanGQL: MatchPlanGQL,
    private seasonService: SeasonService
  ) { }

  ngOnInit() {
  }

  async cancelMatch(reason: string) {
    // TODO: move to MatchServc
    try {
      await this.cancelMatchGQL.mutate({
        match_id: this.match.id,
        reason: reason
      }, {
          refetchQueries: [
            {
              query: this.matchPlanGQL.document,
              variables: { id: this.seasonService.currentSeason.getValue().id}
            }
          ]
        }).toPromise();
      this.notify.showSuccessNotification(this.translateService.instant('CANCEL_MATCH_SUCCESS'));
      this.dialogRef.close();
    } catch (error) {
      this.notify.showErrorNotification(this.translateService.instant('CANCEL_MATCH_ERROR'), error);
    }
  }
}
