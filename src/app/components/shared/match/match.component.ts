import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ContactComponent } from '../contact/contact.component';
import { MatDialog } from '@angular/material';
import { AuthenticationService } from '../../../services/authentication.service';
import { EditmatchResultComponent } from '../editmatch/editmatch.result.component';
import { EditmatchTimeComponent } from '../editmatch/editmatch.time.component';
import { EditmatchPitchComponent } from '../editmatch/editmatch.pitch.component';
import { I18Service } from '../../../services/i18.service';
import { TranslateService } from '@ngx-translate/core';
import { Match } from 'src/api/graphql';
import { MatchService } from '../../../services/match.service';
import { NotificationService } from 'src/app/services/notification.service';
import { CancelMatchDialogComponent } from '../cancel-match-dialog/cancel-match-dialog.component';

@Component({
  selector: 'app-match',
  templateUrl: './match.component.html',
  styleUrls: ['./match.component.css']
})
export class MatchComponent implements OnInit {

  @Input() match: Match.Fragment;
  @Input() tournament: boolean;
  @Input() hideIfPlayed: boolean;

  @Output() matchUpdated = new EventEmitter<string>();

  constructor(
    public dialog: MatDialog,
    public authService: AuthenticationService,
    public i18Service: I18Service,
    public notify: NotificationService,
    public matchService: MatchService,
    public translateService: TranslateService) {
  }

  ngOnInit() {
  }

  openEditResultDialog() {
    const dialogRef = this.dialog.open(EditmatchResultComponent, {
      data: this.match,
      panelClass: 'my-full-screen-dialog'
    });

    dialogRef.afterClosed().subscribe(
      async (result) => {
        if (result) {
          this.matchUpdated.emit(this.match.id);
        }
      });
  }

  openEditPitchDialog() {
    const dialogRef = this.dialog.open(EditmatchPitchComponent, {
      data: this.match, panelClass: 'my-full-screen-dialog'
    });

    dialogRef.afterClosed().subscribe(
      async (result) => {
        if (result) {
          this.matchUpdated.emit(this.match.id);
        }
      });
  }

  openEditTimeDialog() {
    const dialogRef = this.dialog.open(EditmatchTimeComponent, {
      data: this.match, panelClass: 'my-full-screen-dialog'
    });

    dialogRef.afterClosed().subscribe(
      (result) => {
        if (result) {
          this.matchUpdated.emit(this.match.id);
        }
      });
  }

  openContactModal() {
    this.dialog.open(ContactComponent, {
      data: {
        teams: [
          this.match.home_team,
          this.match.guest_team
        ],
        pitch: this.match.pitch
      },
      panelClass: 'my-full-screen-dialog'
    });
  }

  openCancelMatchDialog() {
    const dialogRef = this.dialog.open(CancelMatchDialogComponent, {
      data: this.match, panelClass: 'my-full-screen-dialog'
    });

    dialogRef.afterClosed().subscribe(
      (result) => {
        if (result) {
          this.matchUpdated.emit(this.match.id);
        }
      });
  }

  isNumber(val) {
    return typeof val === 'number';
  }
}
