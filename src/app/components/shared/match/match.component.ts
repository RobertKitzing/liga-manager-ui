import { Component, OnInit, Input, ViewEncapsulation } from '@angular/core';
import { MatchViewModel } from '../../../models/match.viewmodel';
import { ContactComponent } from '../contact/contact.component';
import { MatDialog } from '@angular/material';
import { Team, Match } from '../../../../api';
import { EditmatchComponent } from '../editmatch/editmatch.component';
import { MatchService } from '../../../services/match.service';
import { AuthenticationService } from '../../../services/authentication.service';

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
    public authService: AuthenticationService) { }

  ngOnInit() {
  }

  openEditDialog(match: MatchViewModel) {
    const dialogRef = this.dialog.open(EditmatchComponent, {
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
