import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Tournament } from '../../../../api/graphql';
import { map, tap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { ConfirmDialogComponent } from '../../shared/confirm-dialog/confirm-dialog.component';
import { TranslateService } from '@ngx-translate/core';
import { LocalStorage } from 'ngx-webstorage';
import { RoundTeam, EditTournamentRoundComponent } from './edit-tournament-round/edit-tournament-round.component';
import { I18Service } from 'src/app/services/i18.service';
import { NotificationService } from 'src/app/services/notification.service';
import { TournamentService } from 'src/app/services/tournament.service';

const MANAGE_TOURNAMENT_KEY = 'MANAGE_TOURNAMENT_KEY';
@Component({
  selector: 'app-manage-tournaments',
  templateUrl: './manage-tournaments.component.html',
  styleUrls: ['./manage-tournaments.component.css']
})
export class ManageTournamentsComponent implements OnInit {

  @LocalStorage(MANAGE_TOURNAMENT_KEY)
  manageTournamentId: string;

  manageTournament: Observable<Tournament>;
  startTeamCount = 4;
  rounds: number[][];
  manageTournamentRoundCount: number;

  constructor(
    public dialog: MatDialog,
    public i18Service: I18Service,
    public tournamentService: TournamentService,
    private translateService: TranslateService,
    private notify: NotificationService,
  ) { }

  ngOnInit() {
    if (this.manageTournamentId) {
      this.onTournamentSelected();
    }
  }

  async createNewTournament(name: string) {
    try {
      await this.tournamentService.createNewTournament(name);
      this.notify.showSuccessNotification(this.translateService.instant('CREATE_TOURNAMENT_SUCCESS'));
    } catch (error) {
      this.notify.showSuccessNotification(this.translateService.instant('CREATE_TOURNAMENT_ERROR'));
    }
  }

  async onTournamentSelected() {
    this.manageTournament = this.tournamentService.getTournament({ id: this.manageTournamentId }).pipe(
      tap(
        (t) => {
          this.manageTournamentRoundCount = t.rounds?.length || 0;
        }
      )
    );
  }

  editRound(round: number) {
    if (round <= this.manageTournamentRoundCount) {
      const confirmDialog = this.dialog.open(ConfirmDialogComponent, {
        data: {
          message: this.translateService.instant('CONFIRM_OVERWRITE_TOURNAMENT_ROUND', { round: round })
        }
      });
      confirmDialog.afterClosed().subscribe(
        (confirm) => {
          if (confirm) {
            const teams: Observable<{ teams: RoundTeam[], dates: { from: Date, to: Date } }> = this.manageTournament.pipe(
              map((data) => {
                const r = data.rounds.find(x => x.number === round);
                return {
                  teams: r.matches.map(y => ({ homeTeam: y.home_team, guestTeam: y.guest_team })),
                  dates: { from: new Date(r.start_date), to: new Date(r.end_date) }
                };
              })
            );
            const sub = teams.subscribe(
              (t) => {
                this.openEditDialog(round, t.teams, t.dates);
                sub.unsubscribe();
              }
            );
          }
        }
      );
    } else {
      this.openEditDialog(round);
    }
  }

  private openEditDialog(round: number, teams?: RoundTeam[], dates?: { from: Date, to: Date }) {
    this.dialog.open(EditTournamentRoundComponent, {
      data: { round: round, tournamentId: this.manageTournamentId, teams: teams, dates: dates },
      panelClass: 'my-full-screen-dialog'
    });
  }

  deleteTournament(tournament: Tournament) {
    const confirmDialog = this.dialog.open(ConfirmDialogComponent, {
      data: {
        message: this.translateService.instant('CONFIRM_DELETE', { thing: tournament.name })
      }
    });
    confirmDialog.afterClosed().subscribe(
      async (confirm) => {
        if (confirm) {
          try {
            await this.tournamentService.deleteTournament(tournament);
            this.notify.showSuccessNotification(this.translateService.instant('DELETE_TOURNAMENT_SUCCESS'));
            this.manageTournament = of(null);
          } catch (error) {
            this.notify.showErrorNotification(this.translateService.instant('DELETE_TOURNAMENT_ERROR'), error);
          }
        }
      }
    );
  }
}
