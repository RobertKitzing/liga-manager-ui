import { SubmitMatchResultBody, ScheduleMatchBody } from './../api/openapi';
import { TeamService } from './../service/team.service';
import { Client, Match } from '@app/api/openapi';
import { Logger } from './../core/logger.service';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

const log = new Logger('EditMatchDialogComponent');

@Component({
    selector: 'app-edit-match-modal',
    templateUrl: 'editmatch.modal.html',
  })
  export class EditMatchDialogComponent implements OnInit {

    public match: Match;
    public kickoffTime: string;

    constructor(
      public dialogRef: MatDialogRef<EditMatchDialogComponent>,
      public apiClient: Client,
      public teamService: TeamService,
      @Inject(MAT_DIALOG_DATA) public data: any) {
        log.debug(data);
    }

    ngOnInit() {
      this.apiClient.getMatch(this.data.matchId).subscribe(
        (match) => {
          this.match = match;
          if (match.kickoff) {
            log.debug(match.kickoff.getHours() + ':' + match.kickoff.getMinutes());
            this.kickoffTime = match.kickoff.getHours() + ':' + match.kickoff.getMinutes();
          }
        }
      );
    }

    async onSaveClicked() {
      if (this.match.home_score && this.match.guest_score) {
        const result: SubmitMatchResultBody = new SubmitMatchResultBody;
        result.home_score = this.match.home_score;
        result.guest_score = this.match.guest_score;
        await this.apiClient.submitMatchResult(this.match.id, result).toPromise();
        if (this.match.kickoff) {
          const date: ScheduleMatchBody = new ScheduleMatchBody();
          const time: string[] = this.kickoffTime.split(':');
          log.debug(time);
          log.debug(this.match.kickoff);
          this.match.kickoff.setHours(23);
          this.match.kickoff.setHours(42);
          log.debug(this.match.kickoff);
          date.kickoff = new Date(this.match.kickoff);
          await this.apiClient.scheduleMatch(this.match.id, date).toPromise();
        }
        this.dialogRef.close({matchId: this.match.id});
      }
    }
}
