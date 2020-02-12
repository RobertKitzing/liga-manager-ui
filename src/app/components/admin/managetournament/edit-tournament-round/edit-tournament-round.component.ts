import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { TeamService } from '../../../../services/team.service';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';
import { Team, CreateTournamentRoundGQL, AllTournamentListGQL, TournamentGQL } from 'src/api/graphql';
import { NotificationService } from 'src/app/services/notification.service';
import { DateAdapter } from '@angular/material/core';

export interface AddMatchData {
  round: number;
  tournamentId: string;
  teams: RoundTeam[];
  dates: { from: Date, to: Date };
}
export interface RoundTeam {
  homeTeam: Team.Fragment;
  guestTeam: Team.Fragment;
}
@Component({
  selector: 'app-edit-tournament-round',
  templateUrl: 'edit-tournament-round.component.html'
})
export class EditTournamentRoundComponent implements OnInit {

  planDateTo: Date;
  planDateFrom: Date;

  @ViewChild('home', { static: true }) home;
  @ViewChild('guest', { static: true }) guest;

  allTeams: Observable<Team.Fragment[]>;

  roundTeams: RoundTeam[] = new Array<RoundTeam>();

  constructor(
    private allTournamentsQGL: AllTournamentListGQL,
    public dialogRef: MatDialogRef<EditTournamentRoundComponent>,
    public teamService: TeamService,
    private translateService: TranslateService,
    private createRoundGQL: CreateTournamentRoundGQL,
    private notify: NotificationService,
    private tournamentQGL: TournamentGQL,
    private dateAdapter: DateAdapter<any>,
    @Inject(MAT_DIALOG_DATA) public data: AddMatchData) {

    this.translateService.onLangChange.subscribe(
      (lang) => {
        this.dateAdapter.setLocale(lang);
      }
    );
    this.dateAdapter.setLocale(this.translateService.currentLang);
    if (data.teams) {
      this.roundTeams = data.teams;
    }
    if (data.dates) {
      this.planDateFrom = data.dates.from;
      this.planDateTo = data.dates.to;
    }
  }

  ngOnInit() {
  }

  addTeam(homeTeam: Team.Fragment, guestTeam: Team.Fragment) {

    if (homeTeam && guestTeam && homeTeam !== guestTeam) {
      this.roundTeams.push({
        homeTeam: homeTeam,
        guestTeam: guestTeam
      });
      this.home.value = null;
      this.guest.value = null;
    }
  }

  removeTeam(index: number) {
    this.roundTeams.splice(index, 1);
  }

  async createRound() {
    try {
      await this.createRoundGQL.mutate(
        {
          tournament_id: this.data.tournamentId,
          date_period: {
            from: new Date(this.planDateFrom).toDateString(),
            to: new Date(this.planDateTo).toDateString()
          },
          round: this.data.round,
          team_id_pairs: this.roundTeams.map((t) => ({ home_team_id: t.homeTeam.id, guest_team_id: t.guestTeam.id }))
        },
        {
          refetchQueries: [
            { query: this.allTournamentsQGL.document },
            { query: this.tournamentQGL.document, variables: { id: this.data.tournamentId } }
          ]
        }
      ).toPromise();
      this.notify.showSuccessNotification(this.translateService.instant('CREATE_TOURNAMENT_ROUND_SUCCESS'));
      this.dialogRef.close(true);
    } catch (error) {
      this.notify.showErrorNotification(this.translateService.instant('CREATE_TOURNAMENT__ROUND_ERROR'), error);
    }
  }

  isRoundValid(): boolean {
    return this.planDateFrom && this.planDateTo && this.roundTeams.length > 0 && this.planDateFrom < this.planDateTo;
  }
}
