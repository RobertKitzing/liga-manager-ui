import { MatDialogRef, MAT_DIALOG_DATA, MatSelectChange } from '@angular/material';
import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { TeamService } from '../../../../services/team.service';
import { DateTimeAdapter } from 'ng-pick-datetime';
import { I18Service } from '../../../../services/i18.service';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';
import { Team, CreateTournamentRoundGQL, TeamIdPair, AllTournamentListGQL, TournamentGQL } from 'src/api/graphql';
import { map } from 'rxjs/operators';
import { NotificationService } from 'src/app/services/notification.service';

export interface AddMatchData {
  round: number;
  tournamentId: string;
  teams: RoundTeam[];
  dates: {from: Date, to: Date};
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

  @ViewChild('planDateTo') planDateTo;
  @ViewChild('planDateFrom') planDateFrom;

  @ViewChild('home') home;
  @ViewChild('guest') guest;

  allTeams: Observable<Team.Fragment[]>;

  roundTeams: RoundTeam[] = new Array<RoundTeam>();
  newRoundPlanDateFrom: Date;
  newRoundPlanDateTo: Date;

  constructor(
    private allTournamentsQGL: AllTournamentListGQL,
    public dialogRef: MatDialogRef<EditTournamentRoundComponent>,
    public teamService: TeamService,
    dateTimeAdapter: DateTimeAdapter<any>,
    private translateService: TranslateService,
    private i18Service: I18Service,
    private createRoundGQL: CreateTournamentRoundGQL,
    private notify: NotificationService,
    private tournamentQGL: TournamentGQL,
    @Inject(MAT_DIALOG_DATA) public data: AddMatchData) {
    dateTimeAdapter.setLocale(this.i18Service.currentLang);
    this.translateService.onLangChange.subscribe(
      (lang) => {
        dateTimeAdapter.setLocale(lang);
      }
    );
    if (data.teams) {
      this.roundTeams = data.teams;
    }
    if (data.dates) {
      this.newRoundPlanDateFrom = data.dates.from;
      this.newRoundPlanDateTo = data.dates.to;
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
            from: new Date(this.newRoundPlanDateFrom).toDateString(),
            to: new Date(this.newRoundPlanDateTo).toDateString()
          },
          round: this.data.round,
          team_id_pairs: this.roundTeams.map((t) => ({ home_team_id: t.homeTeam.id, guest_team_id: t.guestTeam.id }))
        },
        {
          refetchQueries: [
            {query: this.allTournamentsQGL.document},
            {query: this.tournamentQGL.document, variables: {id: this.data.tournamentId}}
          ]
        }
      ).toPromise();
      this.notify.showSuccessNotification(this.translateService.instant('CREATE_TOURNAMENT_ROUND_SUCCESS'));
      this.dialogRef.close(true);
    } catch (error) {
      this.notify.showErrorNotification(this.translateService.instant('CREATE_TOURNAMENT__ROUND_ERROR'), error);
    }
  }

  setPlanDateFrom(event: any) {
    this.newRoundPlanDateFrom = event.value;
  }

  setPlanDateTo(event: any) {
    this.newRoundPlanDateTo = event.value;
  }

  isRoundValid(): boolean {
    return this.newRoundPlanDateFrom && this.newRoundPlanDateTo && this.roundTeams.length > 0;
  }
}
