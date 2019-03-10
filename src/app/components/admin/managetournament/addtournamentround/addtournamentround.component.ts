import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Component, OnInit, Inject } from '@angular/core';
import { TeamService } from '../../../../services/team.service';
import { DateTimeAdapter } from 'ng-pick-datetime';
import { I18Service } from '../../../../services/i18.service';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';
import { Team, AllTeamsGQL, CreateTournamentRoundGQL, TeamIdPair, AllTournamentListGQL, TournamentGQL } from 'src/api/graphql';
import { map } from 'rxjs/operators';

export interface AddMatchData {
  round: number;
  tournamentId: string;
}
interface RoundTeam {
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
    private allTeamsQGL: AllTeamsGQL,
    private createRoundGQL: CreateTournamentRoundGQL,
    private tournamentQGL: TournamentGQL,
    @Inject(MAT_DIALOG_DATA) public data: AddMatchData) {
    dateTimeAdapter.setLocale(this.i18Service.currentLang);
    this.translateService.onLangChange.subscribe(
      (lang) => {
        dateTimeAdapter.setLocale(lang);
      }
    );
  }

  async ngOnInit() {
    this.allTeams = this.allTeamsQGL.watch().valueChanges.pipe(
      map(({ data }) => data.allTeams.sort((a, b) => a.name.toLowerCase() > b.name.toLowerCase() ? 1 : -1))
    );
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

  removeTeam(tupel: TeamIdPair) {
    this.roundTeams = this.roundTeams.filter(t => t !== tupel);
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
      this.dialogRef.close(true);
    } catch (error) {
      console.log(error);
    }
  }

  setPlanDateFrom(event: any) {
    this.newRoundPlanDateFrom = event.value;
  }

  setPlanDateTo(event: any) {
    this.newRoundPlanDateTo = event.value;
  }
}
