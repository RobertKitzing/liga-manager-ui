import { Component, OnInit } from '@angular/core';
import { Client, Tournament } from '../../../api';
import { MatSelectChange } from '@angular/material';
import { MatchViewModel } from '../../models/match.viewmodel';
import { MatchService } from '../../services/match.service';

@Component({
  selector: 'app-tournament',
  templateUrl: './tournament.component.html',
  styleUrls: ['./tournament.component.css']
})
export class TournamentComponent implements OnInit {

  tournaments: Tournament[];
  get tournament(): Tournament {
    return JSON.parse(localStorage.getItem('SELECTED_TOURNAMENT'));
  }
  set tournament(t: Tournament) {
    localStorage.setItem('SELECTED_TOURNAMENT', JSON.stringify(t));
  }

  matches: MatchViewModel[][];

  constructor(
    private apiClient: Client,
    private matchService: MatchService
  ) { }

  ngOnInit() {
    this.apiClient.getAllTournaments().subscribe(
      (tournaments) => {
        this.tournaments = tournaments;
        if (this.tournament) {
          this.tournamentChanged();
        }
      }
    );
  }

  tournamentCompare(c1: Tournament, c2: Tournament) {
    return c1 && c2 && c1.id === c2.id;
  }

  tournamentChanged() {
    console.log(this.tournament);
    this.apiClient.getMatchesInTournament(this.tournament.id).subscribe(
      (matches) => {
        const mvw = this.matchService.matchConverterArray(matches);
        this.matches = new Array<MatchViewModel[]>();
        for (let round = 0; round < this.tournament.rounds; round++) {
          this.matches[round] = mvw.filter(m => m.match_day === (round + 1));
        }
        console.log(this.matches);
        this.matches = this.matches.reverse();
      }
    );
  }
}
