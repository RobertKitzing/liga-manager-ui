import { I18nService } from './../core/i18n.service';
import { TeamService } from './../service/team.service';
import { MatDialog } from '@angular/material';
import { EditMatchDialogComponent } from './../shared/editmatch.modal';
import { AuthenticationService } from './../core/authentication/authentication.service';
import { Tournament, Client } from './../api/openapi';
import { SeasonService } from '@app/service/season.service';
import { Match } from '@app/api/openapi';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tournament',
  templateUrl: './tournament.component.html',
  styleUrls: ['./tournament.component.scss']
})
export class TournamentComponent implements OnInit {

  tournament: Tournament;
  tournaments: Tournament[];
  isLoadingTournaments: boolean;
  matches: Match[];
  isLoadingMatches: boolean;
  matchDay = 1;

  constructor(public authService: AuthenticationService,
              public dialog: MatDialog,
              private apiClient: Client,
              public teamService: TeamService,
              public i18Service: I18nService) { }

  ngOnInit() {
    this.apiClient.getAllTournaments().subscribe(
      (tournaments) => {
        this.tournaments = tournaments;
      }
    );
  }

  selectedTournamentChanged(tournament: Tournament) {
    this.apiClient.getMatchesInTournament(tournament.id).subscribe(
      (matches) => {
        this.matches = matches;
      }
    );
  }

  tournamentCompare(c1: Tournament, c2: Tournament) {
    return c1 && c2 && c1.name === c2.name;
  }

  openEditDialog(matchId: string) {
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
          const j: number = this.matches.findIndex(x => x.id === matchId);
          if (j !== -1) {
            this.matches[j] = match;
          }
      }
    );
  }
}
