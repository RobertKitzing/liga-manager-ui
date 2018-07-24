import { Component, OnInit, Input } from '@angular/core';
import { MatchViewModel } from '../../../models/match.viewmodel';
import { ContactComponent } from '../contact/contact.component';
import { MatDialog } from '@angular/material';
import { Team } from '../../../../api';
import { MatchService } from '../../../services/match.service';
import { AuthenticationService } from '../../../services/authentication.service';
import { EditmatchResultComponent } from '../editmatch/editmatch.result.component';
import { EditmatchTimeComponent } from '../editmatch/editmatch.time.component';
import { EditmatchPitchComponent } from '../editmatch/editmatch.pitch.component';
import { I18Service } from '../../../services/i18.service';

@Component({
  selector: 'app-match',
  templateUrl: './match.component.html',
  styleUrls: ['./match.component.css']
})
export class MatchComponent implements OnInit {

  @Input() match: MatchViewModel;

  constructor(
    public dialog: MatDialog,
    private matchService: MatchService,
    public authService: AuthenticationService,
    public i18Service: I18Service) { }

  ngOnInit() {
  }

  openEditResultDialog(match: MatchViewModel) {
    const dialogRef = this.dialog.open(EditmatchResultComponent, {
      data:  match
    });

    dialogRef.afterClosed().subscribe(
      async (result) => {
        if (result) {
          this.match = await this.matchService.updateSingleMatch(match.id);
          // this.pitchAdded.emit(true);
          // this.matchService.updateMatch(matchId);
        }
      });
  }

  openEditPitchDialog(match: MatchViewModel) {
    const dialogRef = this.dialog.open(EditmatchPitchComponent, {
      data:  match
    });

    dialogRef.afterClosed().subscribe(
      async (result) => {
        if (result) {
          this.match = await this.matchService.updateSingleMatch(match.id);
          // this.pitchAdded.emit(true);
          // this.matchService.updateMatch(matchId);
        }
      });
  }

  openEditTimeDialog(match: MatchViewModel) {
    const dialogRef = this.dialog.open(EditmatchTimeComponent, {
      data:  match
    });

    dialogRef.afterClosed().subscribe(
      async (result) => {
        if (result) {
          this.match = await this.matchService.updateSingleMatch(match.id);
          // this.pitchAdded.emit(true);
          // this.matchService.updateMatch(matchId);
        }
      });
  }

  openContactModal() {
    const contacts = new Array<Team>();
    contacts.push(this.match.home_team);
    contacts.push(this.match.guest_team);
    this.dialog.open(ContactComponent, { data: contacts });
  }
}
