import { AddMatchComponent } from './tournament.addmatch.dialog';
import { I18nService } from './../core/i18n.service';
import { TeamService } from './../service/team.service';
import { MatDialog } from '@angular/material';
import { EditMatchDialogComponent } from './../shared/editmatch.modal';
import { AuthenticationService } from './../core/authentication/authentication.service';
import { Tournament, Client, Team, CreateTournamentBody } from './../api/openapi';
import { SeasonService } from '@app/service/season.service';
import { Match } from '@app/api/openapi';
import { Component, OnInit } from '@angular/core';
import { Logger } from '@app/core';
const log = new Logger('TournamentComponent');

@Component({
  selector: 'app-tournament',
  templateUrl: './tournament.component.html',
  styleUrls: ['./tournament.component.scss']
})
export class TournamentComponent implements OnInit {

  tournament: Tournament;
  tournaments: Tournament[];
  isLoadingTournaments: boolean;
  rounds: number[] = new Array<number>();
  matches: Match[];
  isLoadingMatches: boolean;
  matchDay = 1;
  editMode: boolean;
  teams: Team[];
  newTournament: string;

  constructor(public authService: AuthenticationService,
              public dialog: MatDialog,
              private apiClient: Client,
              public teamService: TeamService,
              public i18Service: I18nService) { }

  ngOnInit() {
    this.loadTournaments();
    this.teams = this.teamService.getAllTeams();
  }

  loadTournaments() {
    this.isLoadingTournaments = true;
    this.apiClient.getAllTournaments().subscribe(
      (tournaments) => {
        this.tournaments = tournaments;
      },
      (error) => {

      },
      () => {
        this.isLoadingTournaments = false;
      }
    );
  }

  selectedTournamentChanged(tournament: Tournament) {
    this.rounds = new Array<number>();
    this.matches = new Array<Match>();
    this.tournament = tournament;
    for (let r = 0; r < tournament.rounds; r++) {
      this.rounds.push(r + 1);
    }
    this.loadMatches(tournament.id);
  }

  loadMatches(tournamenId: string) {
    log.debug(tournamenId);
    this.apiClient.getMatchesInTournament(tournamenId).subscribe(
      (matches) => {
        this.matches = matches;
        log.debug(matches);
      }
    );
  }

  tournamentCompare(c1: Tournament, c2: Tournament) {
    return c1 && c2 && c1.name === c2.name;
  }

  test() {
    log.debug('test');
  }
  openEditDialog(matchId: string) {
    log.debug(matchId);
    const dialogRef = this.dialog.open(EditMatchDialogComponent, {
      data: { matchId: matchId }
    });

    dialogRef.afterClosed().subscribe(
      (result) => {
        if (result) {
          this.updateSingleMatch(result.matchId);
        }
    });
  }

  updateSingleMatch(matchId: string)  {
    this.apiClient.getMatch(matchId).subscribe(
      (match) => {
          // if (j !== -1) {
          //   this.matches[j] = match;
          // }
      }
    );
  }

  addRound() {
    this.rounds.push(this.rounds.length + 1);
    log.debug(this.rounds);
  }

  removeRound() {
    this.rounds.splice(this.rounds.length - 1, 1);
  }

  addMatch(round: number) {
    const dialogRef = this.dialog.open(AddMatchComponent, {
        data: { round: round, tournamentId: this.tournament.id}
      });
      dialogRef.afterClosed().subscribe(
        (result) => {
          if (result) {
            this.loadMatches(this.tournament.id);
          }
      });
  }

  removeMatch(matchId: string, round: number) {
    this.matches = this.matches.filter(m => m.id !== matchId);
  }

  setHomeTeam(matchId: string, teamId: string, round: number) {
    const match: Match = this.matches.find(m => m.id === matchId);
    log.debug(match);
    match.home_team_id = teamId;
  }

  setGuestTeam(matchId: string, teamId: string) {
    const match: Match = this.matches.find(m => m.id === matchId);
    match.guest_team_id = teamId;
    log.debug(match);
  }

  getMatchesInRound(round: number): Match[] {
    return this.matches.filter(m => m.match_day === round);
  }

  addTournament() {
    const body: CreateTournamentBody = new CreateTournamentBody();
    body.name = this.newTournament;
    this.apiClient.createTournament(body).subscribe(
      () => {
        this.loadTournaments();
      }
    );
  }
}
