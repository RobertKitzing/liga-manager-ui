import { Component, OnInit, Inject, ChangeDetectorRef, ViewChild } from '@angular/core';
import { MatchViewModel } from '../../../models/match.viewmodel';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { Observable } from 'rxjs';
import { Pitch, LocateMatchBody, Client, CreatePitchBody } from 'src/api';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { startWith, map } from 'rxjs/operators';
import { PitchService } from '../../../services/pitch.service';
import { } from '@types/googlemaps';

@Component({
  selector: 'app-editmatch.pitch',
  templateUrl: './editmatch.pitch.component.html',
  styleUrls: ['./editmatch.pitch.component.css']
})
export class EditmatchPitchComponent implements OnInit {

  newMatchPitch: Pitch;
  filteredPitches: Observable<Pitch[]>;
  stateCtrl: FormControl = new FormControl();
  showCreateNewPitch: boolean;

  newPitch: Pitch = new Pitch();
  newPitchFormControl: FormControl;
  newPitchPlaceFormGroup: FormGroup;
  newPitchLabelExist: boolean;

  places: google.maps.places.Autocomplete;
  @ViewChild('adressAutoComplete') adressAutoComplete: any;

  constructor(
    @Inject(MAT_DIALOG_DATA) public match: MatchViewModel,
    private pitchService: PitchService,
    private apiClient: Client,
    private cdRef: ChangeDetectorRef,
    private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<EditmatchPitchComponent>
  ) {
    this.newPitchFormControl = new FormControl('', Validators.required);
    this.newPitchPlaceFormGroup = this.formBuilder.group({
      newpitchplace: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.filteredPitches = this.stateCtrl.valueChanges
      .pipe(
        startWith<string | Pitch>(''),
        map(value => typeof value === 'string' ? value : value.label),
        map((pitch) => pitch ? this.filterPitches(pitch) : this.pitchService.pitches.slice())
      );
  }

  filterPitches(searchTerm: string): Pitch[] {
    return this.pitchService.pitches.filter(p => p.label.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1);
  }

  displayPitch(pitch?: Pitch): string | undefined {
    return pitch ? pitch.label : undefined;
  }

  onPitchSelect(pitch: Pitch) {
    this.match.pitch = pitch;
  }

  onSaveClicked() {
    const body: LocateMatchBody = new LocateMatchBody();
    body.pitch_id = this.newMatchPitch.id;
    this.apiClient.locateMatch(this.match.id, body).subscribe(
      () => {
        this.dialogRef.close(true);
      },
      (error) => {
        this.dialogRef.close(false);
      }
    );
  }

  onShowCreateNewPitch() {
    this.cdRef.detectChanges();
    this.places = new google.maps.places.Autocomplete(this.adressAutoComplete.nativeElement);
    this.places.addListener('place_changed', () => {
      const place = this.places.getPlace();
      this.newPitch.location_latitude = place.geometry.location.lat();
      this.newPitch.location_longitude = place.geometry.location.lng();
    });
  }

  createNewPitch() {
    if (this.newPitch.location_latitude && this.newPitch.location_longitude) {
      const body: CreatePitchBody = new CreatePitchBody();
      body.label = this.newPitch.label;
      body.location_latitude = this.newPitch.location_latitude;
      body.location_longitude = this.newPitch.location_longitude;
      this.apiClient.createPitch(body).subscribe(
        async (pitchId) => {
          this.newPitch.id = pitchId.id;
          this.newMatchPitch = this.newPitch;
          this.pitchService.pitchAdded.next(null);
        }
      );
    }
  }
  checkNewPitchName() {
    const pitch = this.pitchService.pitches.find(p => p.label === this.newPitch.label);
    if (pitch) {
      this.newPitchFormControl.setErrors({ pitchexist: true });
    } else {
      this.newPitchFormControl.setErrors(null);
      this.newPitchFormControl.updateValueAndValidity();
    }
  }
}
