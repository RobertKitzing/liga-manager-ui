import { Component, OnInit, Input } from '@angular/core';
import { ContactComponent } from '../contact/contact.component';
import { MatDialog, MatSnackBar } from '@angular/material';
import { AuthenticationService } from '../../../services/authentication.service';
import { EditmatchResultComponent } from '../editmatch/editmatch.result.component';
import { EditmatchTimeComponent } from '../editmatch/editmatch.time.component';
import { EditmatchPitchComponent } from '../editmatch/editmatch.pitch.component';
import { I18Service } from '../../../services/i18.service';
import { SnackbarComponent } from '../snackbar/snackbar.component';
import { TranslateService } from '@ngx-translate/core';
import { Match } from 'src/api/graphql';
import { MatchService } from '../../../services/match.service';

@Component({
  selector: 'app-match',
  templateUrl: './match.component.html',
  styleUrls: ['./match.component.css']
})
export class MatchComponent implements OnInit {

  @Input() match: Match.Fragment;
  @Input() tournament: boolean;
  @Input() hideIfPlayed: boolean;

  constructor(
    public dialog: MatDialog,
    public authService: AuthenticationService,
    public i18Service: I18Service,
    public snackBar: MatSnackBar,
    public matchService: MatchService,
    public translateService: TranslateService) {
  }

  ngOnInit() {
  }

  openEditResultDialog(match: Match.Fragment) {
    const dialogRef = this.dialog.open(EditmatchResultComponent, {
      data: match,
      panelClass: 'my-full-screen-dialog'
    });

    dialogRef.afterClosed().subscribe(
      async (result) => {
        if (result) {
          this.snackBar.openFromComponent(SnackbarComponent, {
            data: {
              message: this.translateService.instant('RESULT_SAVE_SUCCESS')
            },
            panelClass: ['alert', 'alert-success']
          });
        }
      });
  }

  openEditPitchDialog(match: Match.Fragment) {
    const dialogRef = this.dialog.open(EditmatchPitchComponent, {
      data: match, panelClass: 'my-full-screen-dialog'
    });

    dialogRef.afterClosed().subscribe(
      async (result) => {
        if (result) {
          this.snackBar.openFromComponent(SnackbarComponent, {
            data: {
              message: this.translateService.instant('PITCH_SAVE_SUCCESS')
            },
            panelClass: ['alert', 'alert-success']
          });
        }
      });
  }

  openEditTimeDialog(match: Match.Fragment) {
    const dialogRef = this.dialog.open(EditmatchTimeComponent, {
      data: match, panelClass: 'my-full-screen-dialog'
    });

    dialogRef.afterClosed().subscribe(
      (result) => {
        if (result) {
          this.snackBar.openFromComponent(SnackbarComponent, {
            data: {
              message: this.translateService.instant('TIME_SAVE_SUCCESS')
            },
            panelClass: ['alert', 'alert-success']
          });
        }
      });
  }

  openContactModal() {
    this.dialog.open(ContactComponent, {
      data: [
        this.match.home_team,
        this.match.guest_team
      ],
      panelClass: 'my-full-screen-dialog'
    });
  }

  isNumber(val) {
    return typeof val === 'number';
  }
}
