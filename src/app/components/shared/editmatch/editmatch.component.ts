import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';
import { MatchViewModel } from '../../../models/match.viewmodel';
import { MatchService } from '../../../services/match.service';

@Component({
  selector: 'app-editmatch',
  templateUrl: './editmatch.component.html',
  styleUrls: ['./editmatch.component.css']
})
export class EditmatchComponent implements OnInit {

  home_score: number;
  guest_score: number;

  constructor(
    @Inject(MAT_DIALOG_DATA) public match: MatchViewModel,
    private matchService: MatchService) {
   }

  ngOnInit() {
  }

  onSaveClicked() {
    this.matchService.submitMatchResult(this.match.id, this.home_score, this.guest_score);
  }

}
