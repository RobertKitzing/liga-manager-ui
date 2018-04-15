import { FormControl, Validators, FormGroup } from '@angular/forms';
import { Logger } from '@app/core';
import { TeamService } from '@app/service/team.service';
import { Team, Client, CreateUserBody, CreateUserBodyRole } from '@app/api/openapi';
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

    // createUserForm: FormGroup;
    email: FormControl;
    firstName: FormControl;
    lastName: FormControl;
    password: FormControl;

    constructor(
        public teamService: TeamService,
        private apiClient: Client) {

        this.email = new FormControl('', [Validators.required, Validators.email]);
        this.firstName = new FormControl('', [Validators.required]);
        this.lastName = new FormControl('', [Validators.required]);
        this.password = new FormControl('', [
            Validators.required,
            Validators.minLength(6)
        ]);
    }

    async ngOnInit() {
        this.teamList = await this.teamService.loadTeams();
        // this.createUserForm = new FormGroup({
        //     email: new FormControl('', [Validators.required, Validators.email]),
        //     firstName: new FormControl('', [Validators.required]),
        //     lastName: new FormControl('', [Validators.required]),
        //     password: new FormControl('', [Validators.required, Validators.minLength(6)])
        // });
    }

    onChangeTeamSelect(event: MatSelectChange) {
        this.userTeamList = event.value;
    }

    createUser() {
        const body = new CreateUserBody();

        body.email = this.newUserName.toLowerCase();
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
