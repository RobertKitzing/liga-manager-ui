import { Component, OnInit, Inject, Input } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { MatchViewModel } from '../../../models/match.viewmodel';
import { MatchService } from '../../../services/match.service';

@Component({
  selector: 'app-editmatchresult',
  templateUrl: './editmatch.result.component.html',
  styleUrls: ['./editmatch.result.component.css']
})
export class EditmatchResultComponent implements OnInit {

  home_score: number;
  guest_score: number;

  constructor(
    @Inject(MAT_DIALOG_DATA) public match: MatchViewModel,
    private matchService: MatchService,
    private dialogRef: MatDialogRef<EditmatchResultComponent>) {
    this.home_score = this.match.home_score;
    this.guest_score = this.match.guest_score;
  }

  ngOnInit() {

  }

  onSaveClicked() {
    if (this.matchService.isValidResult(this.home_score) && this.matchService.isValidResult(this.guest_score)) {
      this.matchService.submitMatchResult(this.match.id, this.home_score, this.guest_score)
        .then( () => {
          this.dialogRef.close(true);
        })
        .catch( (error) => {
          console.log(error);
        });
    }
  }

  // onCancelResultClicked() {
  //   this.matchService.
  // }
}
