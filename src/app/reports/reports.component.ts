import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Match, Client } from '@app/api/openapi';
import { TeamService } from '@app/service/team.service';
import { TdTextEditorComponent } from '@covalent/text-editor';

@Component({
    selector: 'app-reports',
    templateUrl: 'reports.component.html'
})
export class ReportsComponent implements OnInit {

    reportContent: string;
    options = {
        lineWrapping: true,
        autofocus: true,
        promptURLs: true,
        spellChecker: false
    };
    match: Match;

    constructor(private route: ActivatedRoute,
        public teamService: TeamService,
        private api: Client) { }

    async ngOnInit() {
        this.route.queryParams.subscribe(
            async (params) => {
                this.match = await this.api.getMatch(params.matchId).toPromise();
            }
        );
    }

    customMarkdownParser(text: string) {
        console.log(text);
    }
}
