import { Component, OnInit, Inject, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { TranslateService } from '@ngx-translate/core';
import { I18Service } from '../../../services/i18.service';
import { MatchService } from '../../../services/match.service';
import { Match } from 'src/api/graphql';
import { DateAdapter } from '@angular/material/core';

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
    @Inject(MAT_DIALOG_DATA) public match: Match.Fragment,
    private translateService: TranslateService,
    public i18Service: I18Service,
    private dialogRef: MatDialogRef<EditmatchTimeComponent>,
    private matchService: MatchService,
    private dateAdapter: DateAdapter<any>,
  ) {
    this.translateService.onLangChange.subscribe(
      (lang) => {
        this.dateAdapter.setLocale(lang);
      }
    );
    this.dateAdapter.setLocale(this.translateService.currentLang);
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
