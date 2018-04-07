import { CreateUserBody, CreateUserBodyRole } from './../api/openapi';
import { Logger } from '@app/core';
import { TeamService } from '@app/service/team.service';
import { Team, Client } from '@app/api/openapi';
import { Component, OnInit } from '@angular/core';
import { MatSelectChange } from '@angular/material';

const log = new Logger('AdminComponent');
@Component({
    selector: 'app-admin',
    templateUrl: 'admin.component.html',
    styleUrls: ['admin.component.scss']
})

export class AdminComponent implements OnInit {

    teamList: Team[];
    userTeamList: string[] = new Array<string>();
    newUserName: string;
    newPassword: string;

    newVorname: string;
    newNachname: string;
    userRole: CreateUserBodyRole;

    CreateUserBodyRole = CreateUserBodyRole;

    constructor(public teamService: TeamService,
                private apiClient: Client) { }

    async ngOnInit() {
        this.teamList = await this.teamService.loadTeams();
    }

    onChangeTeamSelect(event: MatSelectChange) {
        this.userTeamList = event.value;
    }

    createUser() {
        const body = new CreateUserBody();

        body.email = this.newUserName;
        body.password = this.newPassword;
        body.teams = this.userTeamList;
        body.first_name = this.newVorname;
        body.last_name = this.newNachname;
        body.role = CreateUserBodyRole.Team_manager;
        this.apiClient.createUser(body).subscribe(
            (res) => {
                alert('user created');
            }
        );
    }
}
