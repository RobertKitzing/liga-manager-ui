import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DateTimeAdapter } from 'ng-pick-datetime';
import { TranslateService } from '@ngx-translate/core';
import { I18Service } from '../../../services/i18.service';
import { MatchService } from '../../../services/match.service';
import { Match } from 'src/api/graphql';

@Component({
  selector: 'app-editmatch.time',
  templateUrl: './editmatch.time.component.html',
  styleUrls: ['./editmatch.time.component.css']
})
export class EditmatchTimeComponent implements OnInit {

  matchKickoff: Date;

  constructor(
    @Inject(MAT_DIALOG_DATA) public match: Match.Fragment,
    dateTimeAdapter: DateTimeAdapter<any>,
    private translateService: TranslateService,
    public i18Service: I18Service,
    private dialogRef: MatDialogRef<EditmatchTimeComponent>,
    private matchService: MatchService
  ) {
    dateTimeAdapter.setLocale(this.i18Service.currentLang);
    this.translateService.onLangChange.subscribe(
      (lang) => {
        dateTimeAdapter.setLocale(lang);
      }
    );
  }

  ngOnInit() {
  }

  kickoffSet(event: any) {
    this.matchKickoff = event.value;
  }

  onSaveClicked() {
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
