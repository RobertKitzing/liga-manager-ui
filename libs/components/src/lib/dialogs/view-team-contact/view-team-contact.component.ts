import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { Team } from '@liga-manager-api/graphql';
import { TranslateModule } from '@ngx-translate/core';
import { TeamContactComponent } from '../../components';
import { MatButtonModule } from '@angular/material/button';

@Component({
    selector: 'lima-view-team-contact',
    standalone: true,
    imports: [
        TeamContactComponent,
        MatDialogModule,
        TranslateModule,
        MatButtonModule,
    ],
    templateUrl: './view-team-contact.component.html',
})
export class ViewTeamContactComponent {

    constructor(
        @Inject(MAT_DIALOG_DATA) public data: Team,
    ) {

    }

}
