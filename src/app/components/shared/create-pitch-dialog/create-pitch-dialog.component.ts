import { Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { FormControl, Validators, FormBuilder } from '@angular/forms';
import { Pitch } from 'src/api/graphql';
import { PitchService } from 'src/app/services/pitch.service';
import { MatDialogRef } from '@angular/material/dialog';
import { NotificationService } from 'src/app/services/notification.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-create-pitch-dialog',
  templateUrl: './create-pitch-dialog.component.html',
  styleUrls: ['./create-pitch-dialog.component.css']
})
export class CreatePitchDialogComponent implements OnInit {

  newPitchFormControl: FormControl;
  newPitch = <Pitch.Fragment>{};
  newPitchPlaceFormGroup: any;
  newPitchLabelExist: boolean;

  places: google.maps.places.Autocomplete;
  @ViewChild('adressAutoComplete', { static: true }) adressAutoComplete: any;

  constructor(
    private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<CreatePitchDialogComponent>,
    private pitchService: PitchService,
    private notify: NotificationService,
    private translateService: TranslateService
  ) {
    this.newPitchFormControl = new FormControl('', Validators.required);
    this.newPitchPlaceFormGroup = this.formBuilder.group({
      newpitchplace: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.places = new google.maps.places.Autocomplete(this.adressAutoComplete.nativeElement);
    this.places.addListener('place_changed', () => {
      const place = this.places.getPlace();
      this.newPitch.location_latitude = place.geometry.location.lat();
      this.newPitch.location_longitude = place.geometry.location.lng();
    });
  }
  
  async createNewPitch() {
    try {
      await this.pitchService.createNewPitch({
        ...this.newPitch,
        label: this.newPitchFormControl.value
      });
      this.dialogRef.close();
      this.notify.showSuccessNotification(this.translateService.instant('CREATE_PITCH_SUCCESS'));
    } catch (error) {
      this.notify.showErrorNotification(this.translateService.instant('CREATE_PITCH_ERROR'), error);
    }
  }
  checkNewPitchName() {
    this.pitchService.allPitches.subscribe(
      (pitches) => {
        const pitch = pitches.find(p => p.label === this.newPitchFormControl.value);
        if (pitch) {
          this.newPitchFormControl.setErrors({ pitchexist: true });
        } else {
          this.newPitchFormControl.setErrors(null);
          this.newPitchFormControl.updateValueAndValidity();
        }
      }
    );
  }

}
