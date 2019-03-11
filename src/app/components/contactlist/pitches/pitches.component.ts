import { Component, OnInit } from '@angular/core';
import { PitchService } from '../../../services/pitch.service';

@Component({
  selector: 'app-pitches',
  templateUrl: './pitches.component.html',
  styleUrls: ['./pitches.component.css']
})
export class PitchesComponent implements OnInit {

  constructor(
    public pitchService: PitchService
  ) { }

  async ngOnInit() {
  }

}
