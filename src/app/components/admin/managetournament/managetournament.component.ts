import { Component, OnInit } from '@angular/core';
import { Tournament, Client, CreateTournamentBody } from '../../../../api';
import { MatDialog } from '@angular/material';
import { AddtournamentroundComponent } from './addtournamentround/addtournamentround.component';

@Component({
  selector: 'app-managetournament',
  templateUrl: './managetournament.component.html',
  styleUrls: ['./managetournament.component.css']
})
export class ManagetournamentComponent implements OnInit {

  tournaments: Tournament[];
  manageTournament: Tournament;
  startTeamCount = 4;
  createRoundNr: number;
  rounds: number[][];

  constructor(
    private apiClient: Client,
    public dialog: MatDialog
  ) { }

  ngOnInit() {
    this.loadAllTournaments();
  }

  private loadAllTournaments() {
    this.apiClient.getAllTournaments().subscribe((tournaments) => {
      this.tournaments = tournaments;
    });
  }

  createNewTournament(name: string) {
    this.apiClient.createTournament(<CreateTournamentBody>{ name: name }).subscribe(
      (id) => {
        this.loadAllTournaments();
      }
    );
  }

  onTournamentSelected() {
    // this.createRoundNr = this.manageTournament + 1;
    // TODO: implementieren
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
    // TODO: implentieren
    // if (this.createRoundNr <= this.manageTournament.rounds) {
    //   if (!confirm('Warning, this will override existing Round!')) {
    //     return;
    //   }
    // }
    const dialogRef = this.dialog.open(AddtournamentroundComponent, {
      data: { round: this.createRoundNr, tournamentId: this.manageTournament.id },
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
