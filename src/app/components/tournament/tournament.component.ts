import { Component, OnInit } from '@angular/core';
import { Client, Tournament, Team, Match_day } from '../../../api';
import { MatchViewModel } from '../../models/match.viewmodel';
import { MatchService } from '../../services/match.service';
import { I18Service } from '../../services/i18.service';

@Component({
  selector: 'app-tournament',
  templateUrl: './tournament.component.html',
  styleUrls: ['./tournament.component.less']
})
export class TournamentComponent implements OnInit {

  tournaments: Tournament[];
  winnerLastRound: Team[];
  tournamentRounds: Match_day[];

  get tournament(): Tournament {
    return JSON.parse(localStorage.getItem('SELECTED_TOURNAMENT'));
  }
  set tournament(t: Tournament) {
    localStorage.setItem('SELECTED_TOURNAMENT', JSON.stringify(t));
  }

  matches: MatchViewModel[][];

  constructor(
    private apiClient: Client,
    private matchService: MatchService,
    public i18Service: I18Service
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

  async tournamentChanged() {
    this.matches = null;
    const matches = await this.matchService.getMatchesInTournament(this.tournament.id);
    this.tournamentRounds = await this.matchService.getRoundsInTournament(this.tournament.id);
    this.matches = new Array<MatchViewModel[]>();
    for (let round = 0; round < this.tournamentRounds.length; round++) {
      this.matches[round] = matches.filter(m => this.getRound(m.match_day_id).number === round);
    }
    this.matches = this.matches.reverse();
    this.getWinner();
  }

  getRound(matchDayId: string): Match_day {
    return this.tournamentRounds.find(t => t.id === matchDayId);
  }

  getWinner() {
    this.winnerLastRound = new Array<Team>();
    if (this.matches[0]) {
      this.matches[0].forEach(
        (match) => {
          if (match.home_score != null && match.guest_score != null && match.home_score >= 0 && match.guest_score >= 0) {
            this.winnerLastRound.push(match.home_score > match.guest_score ? match.home_team : match.guest_team);
          }
        });
      this.winnerLastRound = this.winnerLastRound.sort((a, b) => a.name.toLowerCase() > b.name.toLowerCase() ? 1 : -1);
    }
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
