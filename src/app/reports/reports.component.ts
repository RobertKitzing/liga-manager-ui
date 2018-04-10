import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Match, Client } from '@app/api/openapi';
import { TeamService } from '@app/service/team.service';
import { AuthenticationService } from '@app/core';
import { WebsocketService } from '@app/service/websocket.service';

@Component({
    selector: 'app-reports',
    templateUrl: 'reports.component.html'
})
export class ReportsComponent implements OnInit {

    reportContent: string;
    match: Match;
    editMode: boolean;
    get mode(): string {
        return this.editMode ?  'editor' : 'preview';
    }

    constructor(private route: ActivatedRoute,
        public teamService: TeamService,
        public authService: AuthenticationService,
        private wsService: WebsocketService,
        private api: Client) { }

    async ngOnInit() {
        this.wsService.reportSent.subscribe(
            (report) => {
                console.log(report);
                if (report) {
                    this.reportContent = report.content;
                }
            }
        );
        this.route.queryParams.subscribe(
            async (params) => {
                this.getReport(params.matchId);
                this.match = await this.api.getMatch(params.matchId).toPromise();
            }
        );
    }

    getReport(matchId: any): any {
        this.wsService.send({type: 'getReport', data: matchId});
    }

    sendReport() {
        console.log('saveReport');
        this.wsService.send({ type: 'saveReport', data: { matchId: this.match.id, content: this.reportContent}});
    }
}
