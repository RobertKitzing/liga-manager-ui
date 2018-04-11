import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Match, Client } from '@app/api/openapi';
import { TeamService } from '@app/service/team.service';
import { AuthenticationService } from '@app/core';
import { WebsocketService } from '@app/service/websocket.service';
import { MatSnackBar } from '@angular/material';

@Component({
    selector: 'app-reports',
    templateUrl: 'reports.component.html',
    styleUrls: ['reports.component.scss']
})
export class ReportsComponent implements OnInit {

    private _reportContent: string;

    get reportContent(): string {
        if (this.editMode) {
            return this._reportContent;
        }
        return this.publish ? this._reportContent : '';
    }

    set reportContent(value: string) {
        this._reportContent = value;
    }

    autoSave: boolean = true;
    autoSaveTimer: number = 10000;

    match: Match;
    editMode: boolean;
    publish: boolean = false;

    get mode(): string {
        return this.editMode ?  'editor' : 'preview';
    }

    constructor(private route: ActivatedRoute,
        public teamService: TeamService,
        public authService: AuthenticationService,
        private wsService: WebsocketService,
        private api: Client,
        private snackBar: MatSnackBar) { }

    async ngOnInit() {
        this.wsService.reportSent.subscribe(
            (report) => {
                console.log(report);
                if (report) {
                    this.reportContent = report.content;
                    this.publish = report.publish;
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
        this.wsService.send({ type: 'saveReport', data: {
            matchId: this.match.id,
            content: this.reportContent,
            publish: this.publish}});

            this.snackBar.open('saved', '', {
                duration: 800,
              });
    }

    editModeChanged() {
        if (this.editMode) {
            this.getReport(this.match.id);
        }
    }
}
