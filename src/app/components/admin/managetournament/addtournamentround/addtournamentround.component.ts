import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Component, OnInit, Inject } from '@angular/core';
import { Team_pairs, Team, Client, SetRoundBody, Date_period } from '../../../../../api';
import { TeamService } from '../../../../services/team.service';
import { DateTimeAdapter } from 'ng-pick-datetime';
import { I18Service } from '../../../../services/i18.service';
import { TranslateService } from '@ngx-translate/core';


export interface AddMatchData {
  round: number;
  tournamentId: string;
}

@Component({
  selector: 'app-addmatch',
  templateUrl: 'addtournamentround.component.html'
})
export class AddtournamentroundComponent implements OnInit {

  homeTeamId: string;
  guestTeamId: string;

  teams: Team_pairs[] = new Array<Team_pairs>();
  teamList: Team[];
  newRoundPlanDate: Date;

  constructor(
    public dialogRef: MatDialogRef<AddtournamentroundComponent>,
    public teamService: TeamService,
    private apiClient: Client,
    dateTimeAdapter: DateTimeAdapter<any>,
    private translateService: TranslateService,
    private i18Service: I18Service,
    @Inject(MAT_DIALOG_DATA) public data: AddMatchData) {
      dateTimeAdapter.setLocale(this.i18Service.currentLang);
      this.translateService.onLangChange.subscribe(
        (lang) => {
          dateTimeAdapter.setLocale(lang);
        }
      );
    }

  async ngOnInit() {
    this.teamList = await this.teamService.loadTeams();
  }

  addTeam() {
    const teamPair: Team_pairs = new Team_pairs();
    teamPair.guest_team_id = this.guestTeamId.toString();
    teamPair.home_team_id = this.homeTeamId.toString();
    this.teams.push(teamPair);
    this.teamList = this.teamList.filter(t => t.id !== this.homeTeamId);
    this.teamList = this.teamList.filter(t => t.id !== this.guestTeamId);
    delete this.homeTeamId;
    delete this.guestTeamId;
  }

  removeTeam(tupel: Team_pairs) {
    this.teams = this.teams.filter(t => t !== tupel);
  }

  createMatch() {
    const body = new SetRoundBody();
    body.date_period = new Date_period();
    body.team_pairs = this.teams;
    this.apiClient.setRound(this.data.tournamentId, this.data.round, body).subscribe(
      () => {
        this.dialogRef.close(true);
      }, (error) => {
      }
    );
  }

  planDateSet(event: any) {
    this.newRoundPlanDate = event.value;
  }
}
