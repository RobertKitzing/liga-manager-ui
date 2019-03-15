import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { AddtournamentroundComponent } from './addtournamentround/addtournamentround.component';
import { AllTournamentListGQL, AllTournamentList, TournamentGQL, MatchDay, CreateTournamentGQL } from '../../../../api/graphql';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import * as uuidv4 from 'uuid/v4';

@Component({
  selector: 'app-managetournament',
  templateUrl: './managetournament.component.html',
  styleUrls: ['./managetournament.component.css']
})
export class ManagetournamentComponent implements OnInit {

  tournaments: Observable<AllTournamentList.AllTournaments[]>;
  manageTournamentId: string;
  manageTournamentRounds: Observable<MatchDay.Fragment[]>;
  startTeamCount = 4;
  createRoundNr: number;
  rounds: number[][];
  manageTournamentRoundCount: number;

  constructor(
    public dialog: MatDialog,
    private allTournamentsQGL: AllTournamentListGQL,
    private tournamentQGL: TournamentGQL,
    private createTournament: CreateTournamentGQL
  ) { }

  ngOnInit() {
    this.loadAllTournaments();
  }

  private loadAllTournaments() {
    this.tournaments = this.allTournamentsQGL.watch().valueChanges.pipe(
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
          {query: this.allTournamentsQGL.document}
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
          if (result.data.tournament.rounds) {
            this.manageTournamentRoundCount = result.data.tournament.rounds.length;
          } else {
            this.manageTournamentRoundCount = 0;
          }
          this.createRoundNr = this.manageTournamentRoundCount;
          return result.data.tournament.rounds;
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

  editRound() {
    if (this.createRoundNr < this.manageTournamentRoundCount) {
      if (!confirm('Warning, this will override existing Round!')) {
        return;
      }
    }
    const dialogRef = this.dialog.open(AddtournamentroundComponent, {
      data: { round: this.createRoundNr, tournamentId: this.manageTournamentId },
      panelClass: 'my-full-screen-dialog'
    });
    dialogRef.afterClosed().subscribe(
      (result) => {
        if (result) {
          // this.loadMatches(this.tournament.id);
        }
      });
  }
}
