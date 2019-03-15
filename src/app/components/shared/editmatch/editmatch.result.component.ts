import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatSnackBar } from '@angular/material';
import { MatchService } from '../../../services/match.service';
import { SnackbarComponent } from '../snackbar/snackbar.component';
import { TranslateService } from '@ngx-translate/core';
import { Match } from 'src/api/graphql';

@Component({
  selector: 'app-editmatchresult',
  templateUrl: './editmatch.result.component.html',
  styleUrls: ['./editmatch.result.component.css']
})
export class EditmatchResultComponent implements OnInit {

  home_score: number;
  guest_score: number;

  constructor(
    @Inject(MAT_DIALOG_DATA) public match: Match.Fragment,
    private matchService: MatchService,
    private dialogRef: MatDialogRef<EditmatchResultComponent>,
    public snackBar: MatSnackBar,
    public translateService: TranslateService
  ) {
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
          this.snackBar.openFromComponent(SnackbarComponent, {
            data: {
              message: this.translateService.instant('EDIT_RESULT_ERROR')
            },
            panelClass: ['alert', 'alert-danger'],
          });
        });
    }
  }
}
