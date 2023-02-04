import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Match, MatchDay } from 'src/api/graphql';

@Component({
  selector: 'lima-edit-match-result',
  templateUrl: './edit-match-result.component.html',
  styleUrls: ['./edit-match-result.component.scss']
})
export class EditMatchResultComponent {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: {match: Match, matchDay: MatchDay},
  ) {
    
  }

  onSaveClicked() {

  }
}
