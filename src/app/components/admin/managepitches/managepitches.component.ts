import { Component, OnInit, TemplateRef } from '@angular/core';
import { Observable } from 'rxjs';
import { Pitch, PitchesGQL } from 'src/api/graphql';
import { map } from 'rxjs/operators';
import { PitchService } from 'src/app/services/pitch.service';
import { MatDialog } from '@angular/material';
import { EditPitchContactDialogComponent } from '../../shared/edit-pitch-contact-dialog/edit-pitch-contact-dialog.component';

@Component({
  selector: 'app-managepitches',
  templateUrl: './managepitches.component.html',
  styleUrls: ['./managepitches.component.css']
})
export class ManagepitchesComponent implements OnInit {

  constructor(
    public pitchService: PitchService,
    private dialog: MatDialog
  ) { }

  ngOnInit() {

  }

  deletePitch(pitch: Pitch.Fragment) {

  }

  createNewPitch() {

  }

  editPitchContact(pitch: Pitch.Fragment) {
    this.dialog.open(EditPitchContactDialogComponent,
      {
        data: pitch
      });
  }
}
