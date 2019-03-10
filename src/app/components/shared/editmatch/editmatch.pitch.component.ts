import { Component, OnInit, Inject, ChangeDetectorRef, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { Observable } from 'rxjs';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { map, startWith, switchMapTo } from 'rxjs/operators';
import { PitchService } from '../../../services/pitch.service';
import { Match, Pitch } from 'src/api/graphql';
import { MatchService } from '../../../services/match.service';

@Component({
  selector: 'app-editmatch.pitch',
  templateUrl: './editmatch.pitch.component.html',
  styleUrls: ['./editmatch.pitch.component.css']
})
export class EditmatchPitchComponent implements OnInit {

  newMatchPitch: FormControl = new FormControl();
  filteredPitches: Observable<Pitch.Fragment[]>;
  showCreateNewPitch: boolean;

  newPitch: Pitch.Fragment;
  newPitchFormControl: FormControl;
  newPitchPlaceFormGroup: FormGroup;
  newPitchLabelExist: boolean;

  places: google.maps.places.Autocomplete;
  @ViewChild('adressAutoComplete') adressAutoComplete: any;

  constructor(
    @Inject(MAT_DIALOG_DATA) public match: Match.Fragment,
    private pitchService: PitchService,
    private matchService: MatchService,
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
    this.filteredPitches = this.newMatchPitch.valueChanges.pipe(
      startWith<string | Pitch.Fragment>(''),
      map(value => typeof value === 'string' ? value : value.label),
      switchMapTo(this.pitchService.pitches),
      map(x => {
        return (this.newMatchPitch.value && (typeof this.newMatchPitch.value === 'string')) ?
          x.filter(y => y.label.toLowerCase().includes(this.newMatchPitch.value.toLowerCase())) : [];
      })
    );
  }

  displayPitch(pitch?: Pitch.Fragment): string | undefined {
    return pitch ? pitch.label : undefined;
  }

  onPitchSelect(pitch: Pitch.Fragment) {
    this.match.pitch = pitch;
  }

  async onSaveClicked() {
    try {
      await this.matchService.locateMatch(this.match.id, this.newMatchPitch.value.id);
      this.dialogRef.close(true);
    } catch (error) {
      console.error(error);
    }
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
    // if (this.newPitch.location_latitude && this.newPitch.location_longitude) {
    //   const body: CreatePitchBody = new CreatePitchBody();
    //   body.label = this.newPitch.label;
    //   body.location_latitude = this.newPitch.location_latitude;
    //   body.location_longitude = this.newPitch.location_longitude;
    //   this.apiClient.createPitch(body).subscribe(
    //     async (pitchId) => {
    //       this.newPitch.id = pitchId.id;
    //       this.newMatchPitch.setValue(this.newPitch);
    //       this.pitchService.pitchAdded.next(null);
    //     }
    //   );
    // }
  }
  checkNewPitchName() {
    // const pitch = this.pitchService.pitches.find(p => p.label === this.newPitch.label);
    // if (pitch) {
    //   this.newPitchFormControl.setErrors({ pitchexist: true });
    // } else {
    //   this.newPitchFormControl.setErrors(null);
    //   this.newPitchFormControl.updateValueAndValidity();
    // }
  }
}
