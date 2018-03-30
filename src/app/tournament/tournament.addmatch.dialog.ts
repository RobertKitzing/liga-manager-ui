import { Team_id_tuple } from './../api/openapi';
import { Client, Team } from '@app/api/openapi';
import { TeamService } from './../service/team.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Component, OnInit, Inject } from '@angular/core';

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

    teams: Team_id_tuple[] = new Array<Team_id_tuple>();
    teamList: Team[];

    constructor(
        public dialogRef: MatDialogRef<AddMatchComponent>,
        public teamService: TeamService,
        private apiClient: Client,
        @Inject(MAT_DIALOG_DATA) public data: AddMatchData) { }

    ngOnInit() {
        this.teamList = this.teamService.getAllTeams();
     }

    addTeam() {
        this.teams.push(<Team_id_tuple>{home_team_id: this.homeTeamId, guest_team_id: this.guestTeamId});
        this.teamList = this.teamList.filter(t => t.id !== this.homeTeamId);
        this.teamList = this.teamList.filter(t => t.id !== this.guestTeamId);
        delete this.homeTeamId;
        delete this.guestTeamId;
    }

    removeTeam(tupel: Team_id_tuple) {
        this.teams = this.teams.filter(t => t !== tupel);
    }

    createMatch() {
        this.apiClient.setRound(this.data.tournamentId, this.data.round, this.teams).subscribe(
            () => {
                this.dialogRef.close(true);
            }, (error) => {
                console.log(error);
                this.dialogRef.close(false);
            }
        );
    }
}
