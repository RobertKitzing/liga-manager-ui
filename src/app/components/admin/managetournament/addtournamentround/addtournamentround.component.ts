import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Component, OnInit, Inject } from '@angular/core';
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
}
export interface RoundTeam {
  homeTeam: Team.Fragment;
  guestTeam: Team.Fragment;
}
@Component({
  selector: 'app-addmatch',
  templateUrl: 'addtournamentround.component.html'
})
export class AddtournamentroundComponent implements OnInit {

  homeTeam: Team.Fragment;
  guestTeam: Team.Fragment;
  allTeams: Observable<Team.Fragment[]>;

  roundTeams: RoundTeam[] = new Array<RoundTeam>();
  newRoundPlanDateFrom: Date;
  newRoundPlanDateTo: Date;

  constructor(
    private allTournamentsQGL: AllTournamentListGQL,
    public dialogRef: MatDialogRef<AddtournamentroundComponent>,
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
  }

  ngOnInit() {
  }

  addTeam() {
    if (this.homeTeam !== this.guestTeam) {
      this.roundTeams.push({
        homeTeam: this.homeTeam,
        guestTeam: this.guestTeam
      });
      delete this.homeTeam;
      delete this.guestTeam;
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
            from: this.newRoundPlanDateFrom,
            to: this.newRoundPlanDateTo
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
      this.notify.showSuccessNotification(this.translateService.instant('CREATE_TOURNAMENT_SUCCESS'));
      this.dialogRef.close(true);
    } catch (error) {
      this.notify.showErrorNotification(this.translateService.instant('CREATE_TOURNAMENT_ERROR'), error);
    }
  }

  setPlanDateFrom(event: any) {
    this.newRoundPlanDateFrom = event.value;
  }

  setPlanDateTo(event: any) {
    this.newRoundPlanDateTo = event.value;
  }
}
