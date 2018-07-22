import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';
import { MatchViewModel } from 'src/app/models/match.viewmodel';

@Component({
  selector: 'app-editmatch.time',
  templateUrl: './editmatch.time.component.html',
  styleUrls: ['./editmatch.time.component.css']
})
export class EditmatchTimeComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public match: MatchViewModel,
  ) { }

  ngOnInit() {
  }

}
