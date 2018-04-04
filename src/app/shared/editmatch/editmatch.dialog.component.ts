import { GOOGLE_MAPS_API_KEY } from '@app/app.module';
import { Observable } from 'rxjs/Observable';
import { I18nService, Logger } from '@app/core';
import { SubmitMatchResultBody, ScheduleMatchBody, Pitch, CreatePitchBody, LocateMatchBody } from '@app/api/openapi';
import { TeamService } from '@app/service/team.service';
import { Client, Match } from '@app/api/openapi';
import { Component, Inject, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, DateAdapter } from '@angular/material';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { startWith, map } from 'rxjs/operators';
import { } from '@types/googlemaps';

const log = new Logger('EditMatchDialogComponent');

export interface EditMatchdata {
  matchId: string;
}
@Component({
  selector: 'app-edit-match-modal',
  templateUrl: 'editmatch.dialog.component.html',
  styleUrls: ['editmatch.dialog.component.scss']
})
export class EditMatchDialogComponent implements OnInit {

  geocoder = new google.maps.Geocoder();
  places: google.maps.places.Autocomplete;
  stateCtrl: FormControl = new FormControl();
  filteredPitches: Observable<Pitch[]>;
  pitches: Pitch[];
  pitch: Pitch;
  showCreateNewPitch: boolean;
  public match: Match;
  public kickoffTime: string;
  adressSearch: string;

  newPitch: Pitch = new Pitch();
  newPitchLabelFormGroup: FormGroup;
  newPitchPlaceFormGroup: FormGroup;

  @ViewChild('adressAutoComplete') adressAutoComplete: any;

  constructor(
    public dialogRef: MatDialogRef<EditMatchDialogComponent>,
    public apiClient: Client,
    public teamService: TeamService,
    private adapter: DateAdapter<any>,
    public i18Service: I18nService,
    private cdRef: ChangeDetectorRef,
    private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: EditMatchdata,
    @Inject(GOOGLE_MAPS_API_KEY) public mapsApiKey: string) {
  }

  async ngOnInit() {

    this.newPitchLabelFormGroup = this.formBuilder.group({
      newpitchlabel: ['', Validators.required]
    });
    this.newPitchPlaceFormGroup = this.formBuilder.group({
      newpitchplace: ['', Validators.required]
    });

    this.adapter.setLocale(this.i18Service.language2Char);
    this.pitches = await this.loadPitches();
    this.filteredPitches = this.stateCtrl.valueChanges
      .pipe(
      startWith<string | Pitch>(''),
      map(value => typeof value === 'string' ? value : value.label),
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
        if (match.pitch_id) {
          this.apiClient.getPitch(match.pitch_id).subscribe(
            (pitch) => {
              this.pitch = pitch;
            }
          );
        }
      }
    );
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

  onPitchSelect(pitch: Pitch) {
    this.pitch = pitch;
    log.debug(pitch);
  }

  filterPitches(searchTerm: string): Pitch[] {
    return this.pitches.filter(p => p.label.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1);
  }

  displayPitch(pitch?: Pitch): string | undefined {
    return pitch ? pitch.label : undefined;
  }

  createNewPitch() {
    if (this.newPitch.location_latitude && this.newPitch.location_longitude) {
      const body: CreatePitchBody = new CreatePitchBody();
      body.label = this.newPitch.label;
      body.location_latitude = this.newPitch.location_latitude;
      body.location_longitude = this.newPitch.location_longitude;
      this.apiClient.createPitch(body).subscribe(
        async (pitchId) => {
          this.match.pitch_id = pitchId.id;
          this.pitches = await this.loadPitches();
          this.apiClient.getPitch(pitchId.id).subscribe(
            (pitch) => {
              this.pitch = pitch;
              this.showCreateNewPitch = false;
            }
          );
        }
      );
    }
  }

  onShowCreateNewPitch() {
    this.cdRef.detectChanges();
    log.debug(this.adressAutoComplete);
    this.places = new google.maps.places.Autocomplete(this.adressAutoComplete.nativeElement);
    this.places.addListener('place_changed', () => {
      const place = this.places.getPlace();
      this.newPitch.location_latitude = place.geometry.location.lat();
      this.newPitch.location_longitude = place.geometry.location.lng();
    });
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

    if (this.pitch) {
      const body: LocateMatchBody = new LocateMatchBody();
      body.pitch_id = this.pitch.id;
      await this.apiClient.locateMatch(this.match.id, body).toPromise();
    }
    this.dialogRef.close({ matchId: this.match.id });
  }
}
