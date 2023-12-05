import { AsyncPipe, JsonPipe } from '@angular/common';
import { Component } from '@angular/core';
import { TeamService } from '@lima/shared/services';

@Component({
    selector: 'lima-contacs',
    templateUrl: './contacs.component.html',
    standalone: true,
    imports: [
        AsyncPipe,
        JsonPipe,
    ],
})
export class ContacsComponent {

    allTeams$ = this.teamService.allTeams$;

    constructor(
        private teamService: TeamService,
    ) {

    }

}
