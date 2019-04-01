import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Pitch, PitchesGQL } from 'src/api/graphql';
import { map } from 'rxjs/operators';
import { PitchService } from 'src/app/services/pitch.service';

@Component({
  selector: 'app-managepitches',
  templateUrl: './managepitches.component.html',
  styleUrls: ['./managepitches.component.css']
})
export class ManagepitchesComponent implements OnInit {

  constructor(
    public pitchService: PitchService
  ) { }

  ngOnInit() {

  }

  deletePitch(pitch: Pitch.Fragment) {

  }
}
