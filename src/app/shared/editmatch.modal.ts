import { I18nService } from '@app/core';
import { SubmitMatchResultBody, ScheduleMatchBody } from './../api/openapi';
import { TeamService } from './../service/team.service';
import { Client, Match } from '@app/api/openapi';
import { Logger } from './../core/logger.service';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, DateAdapter } from '@angular/material';

const log = new Logger('EditMatchDialogComponent');

@Component({
    selector: 'app-edit-match-modal',
    templateUrl: 'editmatch.modal.html',
    styleUrls: ['editmatch.modal.scss']
  })
  export class EditMatchDialogComponent implements OnInit {

    public match: Match;
    public kickoffTime: string;

    constructor(
      public dialogRef: MatDialogRef<EditMatchDialogComponent>,
      public apiClient: Client,
      public teamService: TeamService,
      private adapter: DateAdapter<any>,
      public i18Service: I18nService,
      @Inject(MAT_DIALOG_DATA) public data: any) {
        this.adapter.setLocale(this.i18Service.language2Char);
    }

    ngOnInit() {
      this.apiClient.getMatch(this.data.matchId).subscribe(
        (match) => {
          this.match = match;
          if (match.kickoff) {
            log.debug(match.kickoff.getHours());
            log.debug(match.kickoff.getUTCHours());
            const utcTime: Date = new Date(match.kickoff.toUTCString());
            log.debug(utcTime);
            this.kickoffTime = match.kickoff.getHours().toString().padStart(2, '0') + ':' +
                               match.kickoff.getMinutes().toString().padStart(2, '0');
          }
        }
      );
    }

    setKickoffTime() {
      if (this.kickoffTime) {
        const time: string[] = this.kickoffTime.split(':');
        this.match.kickoff.setUTCHours(parseFloat(time[0]));
        this.match.kickoff.setUTCMinutes(parseFloat(time[1]));
      }
    }

    onDateChanged() {
      this.setKickoffTime();
    }

    async onSaveClicked() {
      const result: SubmitMatchResultBody = new SubmitMatchResultBody;
      result.home_score = this.match.home_score;
      result.guest_score = this.match.guest_score;
      await this.apiClient.submitMatchResult(this.match.id, result).toPromise();
      if (this.match.kickoff) {
        const date: ScheduleMatchBody = new ScheduleMatchBody();
        date.kickoff = this.match.kickoff;
        await this.apiClient.scheduleMatch(this.match.id, date).toPromise();
      }
      this.dialogRef.close({matchId: this.match.id});
    }
}
