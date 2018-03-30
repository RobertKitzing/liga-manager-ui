import { Observable } from 'rxjs/Observable';
import { I18nService } from '@app/core';
import { SubmitMatchResultBody, ScheduleMatchBody, Pitch, CreatePitchBody } from './../api/openapi';
import { TeamService } from './../service/team.service';
import { Client, Match } from '@app/api/openapi';
import { Logger } from './../core/logger.service';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, DateAdapter } from '@angular/material';
import { FormControl } from '@angular/forms';
import { startWith, map } from 'rxjs/operators';

const log = new Logger('EditMatchDialogComponent');

@Component({
    selector: 'app-edit-match-modal',
    templateUrl: 'editmatch.modal.html',
    styleUrls: ['editmatch.modal.scss']
  })
  export class EditMatchDialogComponent implements OnInit {

    stateCtrl: FormControl = new FormControl();
    filteredPitches: Observable<Pitch[] | Promise<Pitch[]>>;
    pitches: Pitch[];
    pitchLabel: string;
    pitchId: string;

    public match: Match;
    public kickoffTime: string;

    constructor(
      public dialogRef: MatDialogRef<EditMatchDialogComponent>,
      public apiClient: Client,
      public teamService: TeamService,
      private adapter: DateAdapter<any>,
      public i18Service: I18nService,
      @Inject(MAT_DIALOG_DATA) public data: any) {
    }

    filterPitches(searchTerm: string) {
      log.debug(searchTerm);
      return this.pitches.filter(p => p.label.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1);
    }

    async loadPitches(): Promise<Pitch[]> {
      return new Promise<Pitch[]>(
        (resolve) => {
          this.apiClient.getAllPitches().subscribe(
                (pitches) => {
                  console.log(pitches);
                  resolve(pitches);
                },
                (error) => {
                  resolve(null);
                }
              );
        }
      );
    }

    async ngOnInit() {
      this.adapter.setLocale(this.i18Service.language2Char);
      this.pitches = await this.loadPitches();
      this.filteredPitches = this.stateCtrl.valueChanges
      .pipe(
        startWith(''),
        map((pitch) => pitch ? this.filterPitches(pitch) : this.pitches.slice())
      );
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

    createNewPitch() {
      // const body: CreatePitchBody = new CreatePitchBody();
      // body.label = this.pitchLabel;
      // this.apiClient.createPitch(body).subscribe(
      //   (pitchId) => {
      //     log.debug(pitchId);
      //     this.pitchId = pitchId.id;
      //   }
      // );
      const pitch: Pitch = new Pitch();
      pitch.label = this.pitchLabel;
      pitch.id = Math.random().toString();
      this.pitches.push(pitch);
      log.debug(this.pitches);
    }

    setKickoffTime() {
      if (this.kickoffTime) {
        const time: string[] = this.kickoffTime.split(':');
        this.match.kickoff.setUTCHours(parseFloat(time[0]));
        this.match.kickoff.setUTCMinutes(parseFloat(time[1]));
      }
    }

    onDateChanged(event: any) {
      if (this.match.kickoff) {
        this.match.kickoff.setDate(this.match.kickoff.getDate() + 1);
        this.setKickoffTime();
      }
    }

    async onSaveClicked() {
      if (this.match.guest_score && this.match.home_score) {
        const result: SubmitMatchResultBody = new SubmitMatchResultBody;
        result.home_score = this.match.home_score;
        result.guest_score = this.match.guest_score;
        await this.apiClient.submitMatchResult(this.match.id, result).toPromise();
      }

      if (this.match.kickoff && this.kickoffTime) {
        const date: ScheduleMatchBody = new ScheduleMatchBody();
        date.kickoff = new Date(this.match.kickoff.toUTCString());
        await this.apiClient.scheduleMatch(this.match.id, date).toPromise();
      }
      this.dialogRef.close({matchId: this.match.id});
    }
}
