import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AllTournamentListGQL, AllTournamentList, TournamentGQL, MatchDay, CreateTournamentGQL, DeleteTournamentGQL } from '../../../../api/graphql';
import { map } from 'rxjs/operators';
import { Observable, empty } from 'rxjs';
import * as uuidv4 from 'uuid/v4';
import { ConfirmDialogComponent } from '../../shared/confirm-dialog/confirm-dialog.component';
import { TranslateService } from '@ngx-translate/core';
import { LocalStorage } from 'ngx-webstorage';
import { RoundTeam, EditTournamentRoundComponent } from './edit-tournament-round/edit-tournament-round.component';
import { I18Service } from 'src/app/services/i18.service';
import { NotificationService } from 'src/app/services/notification.service';

const MANAGE_TOURNAMENT_KEY = 'MANAGE_TOURNAMENT_KEY';
@Component({
  selector: 'app-managetournament',
  templateUrl: './managetournament.component.html',
  styleUrls: ['./managetournament.component.css']
})
export class ManagetournamentComponent implements OnInit {

  tournaments: Observable<AllTournamentList.AllTournaments[]>;
  @LocalStorage(MANAGE_TOURNAMENT_KEY)
  manageTournamentId: string = null;
  manageTournamentRounds: Observable<MatchDay.Fragment[]>;
  startTeamCount = 4;
  rounds: number[][];
  manageTournamentRoundCount: number;

  constructor(
    public dialog: MatDialog,
    private allTournamentsGQL: AllTournamentListGQL,
    private tournamentQGL: TournamentGQL,
    private createTournament: CreateTournamentGQL,
    private translateService: TranslateService,
    private deleteTournamentGQL: DeleteTournamentGQL,
    private notify: NotificationService,
    public i18Service: I18Service
  ) { }

  ngOnInit() {
    this.loadAllTournaments();
    if (this.manageTournamentId) {
      this.onTournamentSelected();
    }
  }

  private loadAllTournaments() {
    this.tournaments = this.allTournamentsGQL.watch().valueChanges.pipe(
      map(({ data }) => data.allTournaments)
    );
  }

  async createNewTournament(name: string) {
    await this.createTournament.mutate({
      id: uuidv4(),
      name: name
    },
      {
        refetchQueries: [
          { query: this.allTournamentsGQL.document }
        ]
      }).toPromise();
  }

  async onTournamentSelected() {
    this.manageTournamentRounds = this.tournamentQGL.watch(
      {
        id: this.manageTournamentId
      }
    ).valueChanges.pipe(
      map(
        (result) => {
          if (result.data.tournament && result.data.tournament.rounds) {
            this.manageTournamentRoundCount = result.data.tournament.rounds.length + 1;
            return result.data.tournament.rounds.sort((a, b) => a.number < b.number ? 1 : -1);
          } else {
            this.manageTournamentRoundCount = 1;
            return new Array<MatchDay.Fragment>();
          }
        })
    );
  }

  genRounds() {
    const startGameCount = Math.ceil(this.startTeamCount / 2);
    this.rounds = new Array<number[]>();
    for (let gameCount = startGameCount; gameCount >= 1; gameCount = (gameCount / 2)) {
      this.rounds.push(Array.from(new Array(gameCount), (val, index) => index + 1));
      if (gameCount % 2 !== 0 && gameCount !== 1) {
        break;
      }
    }
  }

  editRound(round: number) {
    if (round < this.manageTournamentRoundCount) {
      const confirmDialog = this.dialog.open(ConfirmDialogComponent, {
        data: {
          message: this.translateService.instant('CONFIRM_OVERWRITE_TOURNAMENT_ROUND', { round: round })
        }
      });
      confirmDialog.afterClosed().subscribe(
        (confirm) => {
          if (confirm) {
            const teams: Observable<{ teams: RoundTeam[], dates: { from: Date, to: Date } }> = this.manageTournamentRounds.pipe(
              map((data) => {
                const r = data.find(x => x.number === round);
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
    const dialogRef = this.dialog.open(EditTournamentRoundComponent, {
      data: { round: round, tournamentId: this.manageTournamentId, teams: teams, dates: dates },
      panelClass: 'my-full-screen-dialog'
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        // this.loadMatches(this.tournament.id);
      }
    });
  }

  deleteTournament(tournamentId: string) {
    this.tournaments.subscribe(
      (tournaments) => {
        const tournament = tournaments.find(x => x.id === tournamentId);
        if (!tournament) {
          return;
        }
        const confirmDialog = this.dialog.open(ConfirmDialogComponent, {
          data: {
            message: this.translateService.instant('CONFIRM_DELETE', { thing: tournament.name })
          }
        });
        confirmDialog.afterClosed().subscribe(
          async (confirm) => {
            if (confirm) {
              try {
                await this.deleteTournamentGQL.mutate({
                  tournament_id: tournamentId
                }, {
                  refetchQueries: [
                    { query: this.allTournamentsGQL.document}
                  ]
                }).toPromise();
                this.notify.showSuccessNotification(this.translateService.instant('DELETE_TOURNAMENT_SUCCESS'));
                delete this.manageTournamentRounds;
              } catch (error) {
                this.notify.showErrorNotification(this.translateService.instant('DELETE_TOURNAMENT_ERROR'), error);
              }
            }
          }
        );
      }
    );
  }
}
