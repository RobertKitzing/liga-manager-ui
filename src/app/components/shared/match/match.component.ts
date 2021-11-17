import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ContactComponent } from '../contact/contact.component';
import { MatDialog } from '@angular/material/dialog';
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

  @Input() seasonId: string;
  @Input() tournamentId: string;
  @Input() match: Match.Fragment;
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
      data: this.match
    });
    dialogRef.afterClosed().subscribe(
      (result) => {
        if (result) {
          this.emitChanges();
        }
      });
  }

  private emitChanges() {
    this.matchUpdated.emit(this.match.id);
    if (this.tournamentId) {
      this.matchService.tournamentMatchUpdated.next({ tournamentId: this.tournamentId, matchId: this.match.id });
    } else {
      this.matchService.seasonMatchUpdated.next({ seasonId: this.seasonId, matchId: this.match.id });
    }
  }

  openEditPitchDialog() {
    const dialogRef = this.dialog.open(EditmatchPitchComponent, {
      data: this.match, panelClass: 'my-full-screen-dialog'
    });

    dialogRef.afterClosed().subscribe(
      (result) => {
        if (result) {
          this.emitChanges();
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
          this.emitChanges();
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
          this.emitChanges();
        }
      });
  }

  isHomeWinner(): boolean {
    return this.tournamentId && this.match.home_score > this.match.guest_score;
  }

  isGuestWinner(): boolean {
    return this.tournamentId && this.match.home_score < this.match.guest_score;
  }

  isNumber(val) {
    return typeof val === 'number';
  }
}
