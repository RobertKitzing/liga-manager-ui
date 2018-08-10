import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { MatchViewModel } from 'src/app/models/match.viewmodel';
import { DateTimeAdapter } from 'ng-pick-datetime';
import { Client, ScheduleMatchBody } from '../../../../api';
import { TranslateService } from '@ngx-translate/core';
import { I18Service } from '../../../services/i18.service';

@Component({
  selector: 'app-editmatch.time',
  templateUrl: './editmatch.time.component.html',
  styleUrls: ['./editmatch.time.component.css']
})
export class EditmatchTimeComponent implements OnInit {

  matchKickoff: Date;

  constructor(
    @Inject(MAT_DIALOG_DATA) public match: MatchViewModel,
    dateTimeAdapter: DateTimeAdapter<any>,
    private translateService: TranslateService,
    public i18Service: I18Service,
    private dialogRef: MatDialogRef<EditmatchTimeComponent>,
    private apiCLient: Client
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
    this.apiCLient.scheduleMatch(this.match.id, <ScheduleMatchBody>{ kickoff: this.matchKickoff }).subscribe(
      (t) => {
        this.dialogRef.close(true);
      }
    );
  }
}
