import { SetRoundBody, Team_pairs } from './../api/openapi';
import { Client, Team } from '@app/api/openapi';
import { TeamService } from './../service/team.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Component, OnInit, Inject } from '@angular/core';
import { Logger } from '@app/core';

const log = new Logger('AddMatchComponent');

export interface AddMatchData {
    round: number;
    tournamentId: string;
}


@Component({
    selector: 'app-addmatch',
    templateUrl: 'tournament.addmatch.dialog.html'
})
export class AddMatchComponent implements OnInit {

    homeTeamId: string;
    guestTeamId: string;

    teams: Team_pairs[] = new Array<Team_pairs>();
    teamList: Team[];
    newRoundPlanDate: Date;

    constructor(
        public dialogRef: MatDialogRef<AddMatchComponent>,
        public teamService: TeamService,
        private apiClient: Client,
        @Inject(MAT_DIALOG_DATA) public data: AddMatchData) { }

    ngOnInit() {
        this.teamList = this.teamService.getAllTeams();
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
        body.planned_for = this.newRoundPlanDate;
        body.team_pairs = this.teams;
        log.debug(this.teams);
        log.debug(body);
        this.apiClient.setRound(this.data.tournamentId, this.data.round, body).subscribe(
            () => {
                this.dialogRef.close(true);
            }, (error) => {
            }
        );
    }
    onDateChanged(event: any) {
        this.newRoundPlanDate.setDate( this.newRoundPlanDate.getDate() + 1);
        log.debug(this.newRoundPlanDate);
    }
}
