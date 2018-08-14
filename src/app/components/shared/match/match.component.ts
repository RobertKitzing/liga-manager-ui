import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { MatchViewModel } from '../../../models/match.viewmodel';
import { ContactComponent } from '../contact/contact.component';
import { MatDialog, MatSnackBar } from '@angular/material';
import { Team } from '../../../../api';
import { MatchService, MatchUpdateMessage } from '../../../services/match.service';
import { AuthenticationService } from '../../../services/authentication.service';
import { EditmatchResultComponent } from '../editmatch/editmatch.result.component';
import { EditmatchTimeComponent } from '../editmatch/editmatch.time.component';
import { EditmatchPitchComponent } from '../editmatch/editmatch.pitch.component';
import { I18Service } from '../../../services/i18.service';
import { SnackbarComponent } from '../snackbar/snackbar.component';
import { TranslateService } from '@ngx-translate/core';
import { WebsocketService } from '../../../services/websocket.service';
import { WebSocketMessageTypes } from 'shared/models/websocket.model';

@Component({
  selector: 'app-match',
  templateUrl: './match.component.html',
  styleUrls: ['./match.component.css']
})
export class MatchComponent implements OnInit {

  @Input() match: MatchViewModel;
  @Input() tournament: boolean;
  @Output() resultUpdated: EventEmitter<MatchViewModel> = new EventEmitter<MatchViewModel>();

  constructor(
    public dialog: MatDialog,
    private matchService: MatchService,
    public authService: AuthenticationService,
    public i18Service: I18Service,
    public snackBar: MatSnackBar,
    public translateService: TranslateService,
    private websocketService: WebsocketService) {

    this.matchService.matchUpdated.subscribe(
      async (msg) => {
        if (this.match.id === msg.matchId) {
          this.match = null;
          this.match = await this.matchService.updateSingleMatch( msg.matchId);
        }
      });
  }

  ngOnInit() {
  }

  openEditResultDialog(match: MatchViewModel) {
    const dialogRef = this.dialog.open(EditmatchResultComponent, {
      data: match,
      panelClass: 'my-full-screen-dialog'
    });

    dialogRef.afterClosed().subscribe(
      async (result) => {
        if (result) {
          this.match = await this.matchService.updateSingleMatch(match.id);
          this.resultUpdated.emit(this.match);
          this.sendMatchUpdatedMsg();
          this.snackBar.openFromComponent(SnackbarComponent, {
            data: {
              message: this.translateService.instant('RESULT_SAVE_SUCCESS')
            },
            panelClass: ['alert', 'alert-success']
          });
        }
      });
  }

  openEditPitchDialog(match: MatchViewModel) {
    const dialogRef = this.dialog.open(EditmatchPitchComponent, {
      data: match, panelClass: 'my-full-screen-dialog'
    });

    dialogRef.afterClosed().subscribe(
      async (result) => {
        if (result) {
          this.match = await this.matchService.updateSingleMatch(match.id);
          this.sendMatchUpdatedMsg();
          this.snackBar.openFromComponent(SnackbarComponent, {
            data: {
              message: this.translateService.instant('PITCH_SAVE_SUCCESS')
            },
            panelClass: ['alert', 'alert-success']
          });
        }
      });
  }

  openEditTimeDialog(match: MatchViewModel) {
    const dialogRef = this.dialog.open(EditmatchTimeComponent, {
      data: match, panelClass: 'my-full-screen-dialog'
    });

    dialogRef.afterClosed().subscribe(
      async (result) => {
        if (result) {
          this.match = await this.matchService.updateSingleMatch(match.id);
          this.sendMatchUpdatedMsg();
          this.snackBar.openFromComponent(SnackbarComponent, {
            data: {
              message: this.translateService.instant('TIME_SAVE_SUCCESS')
            },
            panelClass: ['alert', 'alert-success']
          });
        }
      });
  }

  sendMatchUpdatedMsg() {
    this.websocketService.send(
      {
        type: WebSocketMessageTypes.MATCH_UPDATED,
        data:  <MatchUpdateMessage> {
          matchId: this.match.id,
          homeTeamName: this.match.home_team.name,
          guestTeamName: this.match.guest_team.name,
        }
      }
    );
  }

  openContactModal() {
    const contacts = new Array<string>();
    contacts.push(this.match.home_team.id);
    contacts.push(this.match.guest_team.id);
    this.dialog.open(ContactComponent, {
      data: contacts,
      panelClass: 'my-full-screen-dialog'
    });
  }

  isNumber(val) {
    return typeof val === 'number';
  }
}
