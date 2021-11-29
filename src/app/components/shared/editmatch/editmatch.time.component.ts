import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { I18Service } from '../../../services/i18.service';
import { MatchService } from '../../../services/match.service';
import { Match } from 'src/api/graphql';

@Component({
  selector: 'app-editmatch.time',
  templateUrl: './editmatch.time.component.html',
  styleUrls: ['./editmatch.time.component.css'],
})
export class EditmatchTimeComponent implements OnInit {

  kickoffDate: Date;
  kickoffTime: string;

  matchKickoff: Date;

  constructor(
    @Inject(MAT_DIALOG_DATA) public match: Match,
    public i18Service: I18Service,
    private dialogRef: MatDialogRef<EditmatchTimeComponent>,
    private matchService: MatchService,
  ) {
  }

  ngOnInit() {
  }

  kickoffChanged() {
    try {
      if (this.kickoffTime) {
        this.kickoffDate.setHours(+this.kickoffTime.split(':')[0]);
        this.kickoffDate.setMinutes(+this.kickoffTime.split(':')[1]);
        this.matchKickoff = new Date(this.kickoffDate.getTime());
      } else {
        delete this.matchKickoff;
      }
    } catch (error) {
      delete this.matchKickoff;
    }
  }

  onSaveClicked() {
    if (this.matchKickoff) {
      this.matchService.scheduleMatch(this.match.id, this.matchKickoff)
      .then(
        () => {
          this.dialogRef.close(true);
        }
      )
      .catch(
        (error) => {
          console.error(error);
        }
      );
    }
  }
}
