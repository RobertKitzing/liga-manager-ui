import { AsyncPipe } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { Maybe, Team } from '@liga-manager-api/graphql';
import { TeamService } from '@liga-manager-ui/services';
import { TranslateModule } from '@ngx-translate/core';

@Component({
    selector: 'lima-team-chooser',
    standalone: true,
    imports: [AsyncPipe, ReactiveFormsModule, MatSelectModule, TranslateModule],
    templateUrl: './team-chooser.component.html',
})
export class TeamChooserComponent {
    @Input({ required: true })
    selectedTeamFC!: FormControl<Team | null>;

    @Input()
    teams!: Maybe<Team>[];

    constructor(public teamService: TeamService) {}
}
