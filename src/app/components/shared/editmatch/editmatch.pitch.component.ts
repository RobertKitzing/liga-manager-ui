import { Component, OnInit, Inject } from '@angular/core';
import { MatchViewModel } from '../../../models/match.viewmodel';
import { MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-editmatch.pitch',
  templateUrl: './editmatch.pitch.component.html',
  styleUrls: ['./editmatch.pitch.component.css']
})
export class EditmatchPitchComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public match: MatchViewModel
  ) { }

  ngOnInit() {
  }

}
