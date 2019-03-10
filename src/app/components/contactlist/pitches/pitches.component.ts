import { Component, OnInit } from '@angular/core';
import { PitchService } from '../../../services/pitch.service';
import { Pitch } from '../../../../api';

@Component({
  selector: 'app-pitches',
  templateUrl: './pitches.component.html',
  styleUrls: ['./pitches.component.css']
})
export class PitchesComponent implements OnInit {

  public pitches: Pitch[];

  constructor(
    private pitchService: PitchService
  ) { }

  async ngOnInit() {
    // this.pitches = await this.pitchService.loadPitches();
  }

}
