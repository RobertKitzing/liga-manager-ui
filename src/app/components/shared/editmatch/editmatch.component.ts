import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
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
    private matchService: MatchService,
    private dialogRef: MatDialogRef<EditmatchComponent>) {
      this.home_score = match.home_score;
      this.guest_score = match.guest_score;
   }

  ngOnInit() {
  }

  async onSaveClicked() {
    let success: boolean;
    if (this.home_score >= 0 && this.guest_score >= 0) {
      success = await this.matchService.submitMatchResult(this.match.id, this.home_score, this.guest_score);
    }
    if (success) {
      this.dialogRef.close(true);
    }
  }
}
