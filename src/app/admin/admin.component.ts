import { TeamService } from '@app/service/team.service';
import { Team } from '@app/api/openapi';
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-admin',
    templateUrl: 'admin.component.html',
    styleUrls: ['admin.component.scss']
})

export class AdminComponent implements OnInit {

    teamList: Team[];
    userTeamList: Team[];

    constructor(public teamService: TeamService) { }

    async ngOnInit() {
        this.teamList = await this.teamService.loadTeams();
    }

    test() {
        console.log(this.userTeamList);
    }
}
