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
  
  addMatch(round: number) {
    const dialogRef = this.dialog.open(AddtournamentroundComponent, {
        data: { round: round, tournamentId: this.manageTournament.id}
      });
      dialogRef.afterClosed().subscribe(
        (result) => {
          if (result) {
            // this.loadMatches(this.tournament.id);
          }
      });
}
}
