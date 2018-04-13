import { Component, OnInit } from '@angular/core';
import { Team } from '@app/api/openapi';
import { TeamService } from '@app/service/team.service';
import { TranslateService } from '@ngx-translate/core';
import { MatSnackBar } from '@angular/material';

@Component({
    selector: 'app-add-team',
    templateUrl: 'addteam.component.html'
})
export class AddTeamComponent implements OnInit {

    allTeams: Team[];

    constructor(private teamService: TeamService,
        private snackBar: MatSnackBar,
        private translateService: TranslateService) { }

    async ngOnInit() {
        await this.loadAllTeams();
    }

    async addNewTeam(teamName: string) {
        if (await this.teamService.addNewTeam(teamName)) {
            this.snackBar.open(this.translateService.instant('NEW_TEAM_CREATED', { name: teamName }), '', {
                duration: 500,
            });
            this.loadAllTeams();
        }
    }

    async loadAllTeams() {
        const teams = await this.teamService.loadTeams();
        this.allTeams = teams.sort((t1, t2) => (t1.name.toLowerCase() < t2.name.toLowerCase() ? -1 : 1));
    }
}
