import { Component, OnInit } from '@angular/core';
import { Client, Tournament, Team } from '../../../api';
import { MatchViewModel } from '../../models/match.viewmodel';
import { MatchService } from '../../services/match.service';

@Component({
  selector: 'app-tournament',
  templateUrl: './tournament.component.html',
  styleUrls: ['./tournament.component.css']
})
export class TournamentComponent implements OnInit {

  tournaments: Tournament[];
  winnerLastRound: Team[];

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
    this.apiClient.getMatchesInTournament(this.tournament.id).subscribe(
      (matches) => {
        const mvw = this.matchService.matchConverterArray(matches);
        this.matches = new Array<MatchViewModel[]>();
        for (let round = 0; round < this.tournament.rounds; round++) {
          this.matches[round] = mvw.filter(m => m.match_day === (round + 1));
        }
        this.matches = this.matches.reverse();
        this.getWinner();
      }
    );
  }

  getWinner() {
    this.winnerLastRound = new Array<Team>();
    this.matches[0].forEach(
      (match) => {
        if (match.home_score != null && match.guest_score != null && match.home_score >= 0 && match.guest_score >= 0) {
          this.winnerLastRound.push(match.home_score > match.guest_score ? match.home_team : match.guest_team);
        }
      });
    this.winnerLastRound = this.winnerLastRound.sort((a, b) => a.name.toLowerCase() > b.name.toLowerCase() ? 1 : -1);
  }

  newWinner(match: MatchViewModel) {
    if (match.home_score != null && match.guest_score != null && match.home_score >= 0 && match.guest_score >= 0) {
      if (match.home_score > match.guest_score) {
        this.winnerLastRound = this.winnerLastRound.filter(t => t.id !== match.guest_team_id);
        this.winnerLastRound.push(match.home_team);
      } else {
        this.winnerLastRound = this.winnerLastRound.filter(t => t.id !== match.home_team_id);
        this.winnerLastRound.push(match.guest_team);
      }

      this.winnerLastRound = this.winnerLastRound.sort((a, b) => a.name.toLowerCase() > b.name.toLowerCase() ? 1 : -1);
    }
  }
}
