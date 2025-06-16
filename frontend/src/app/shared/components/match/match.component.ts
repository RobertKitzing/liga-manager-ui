import { NgClass } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { Router } from '@angular/router';
import { Match, MatchDay, Team } from '@api/graphql';
import { defaultDialogConfig } from '@lima/app.config';
import { CancelMatchComponent, EditMatchKickoffComponent, EditMatchPitchComponent, EditMatchResultComponent } from '@lima/shared/dialogs';
import { ViewTeamContactComponent } from '@lima/shared/dialogs/view-team-contact';
import { CustomDateModule, NumberPipe } from '@lima/shared/pipes';
import { TeamLogoPipe } from '@lima/shared/pipes/team-logo';
import { AuthenticationService } from '@lima/shared/services';
import { TranslateModule } from '@ngx-translate/core';

@Component({
    selector: 'lima-match',
    standalone: true,
    imports: [
        TranslateModule,
        CustomDateModule,
        TeamLogoPipe,
        NgClass,
        MatIconModule,
        MatMenuModule,
        MatButtonModule,
        NumberPipe,
    ],
    templateUrl: './match.component.html',
})
export class MatchComponent {

  @Input({ required: true })
  match!: Match
  
  @Input({ required: true })
  matchDay!: MatchDay

  @Input()
  markLooser = false;

  constructor(
    private dialog: MatDialog,
    private router: Router,
    public authService: AuthenticationService,
  ) {
  }

  get dialogData() {
    return {
      match: this.match,
      matchDay: this.matchDay,
    }
  }

  canEditMatch(match: Match) {
    if (this.router.url.includes('history')) {
      return false;
    }
    return (
        this.authService.canEditMatch(match)
    );
  }

  openEditResultDialog() {
    this.dialog.open(EditMatchResultComponent, {
        ...defaultDialogConfig,
        data: this.dialogData,
    });
  }

  openEditPitchDialog() {
    this.dialog.open(EditMatchPitchComponent, {
        ...defaultDialogConfig,
        data: this.dialogData,
    });
  }

  openViewContactDialog(team: Team) {
    this.dialog.open(ViewTeamContactComponent, {
        ...defaultDialogConfig,
        data: team,
    });
  }

  openCancelMatchDialog() {
    this.dialog.open(CancelMatchComponent, {
        ...defaultDialogConfig,
        data: this.dialogData,
    });
  }

  openEditKickoffDialog() {
    this.dialog.open(EditMatchKickoffComponent, {
        ...defaultDialogConfig,
        data: this.dialogData,
    });
  }

  isHomeWinner(): boolean {
    return this.markLooser && (this.match?.home_score || 0) > (this.match?.guest_score || 0);
  }

  isGuestWinner(): boolean {
    return this.markLooser && (this.match?.home_score || 0) < (this.match?.guest_score || 0);
  }

}
