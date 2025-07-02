import { Component, signal } from '@angular/core';
import { FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { TeamService } from '@liga-manager-ui/services';
import { firstValueFrom, map, startWith, switchMap } from 'rxjs';
import { Maybe, Team } from '@liga-manager-api/graphql';
import { AsyncPipe } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { TranslateModule } from '@ngx-translate/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CypressSelectorDirective } from '@liga-manager-ui/directives';
import { TeamSearchComponent } from '../../shared/components/team-search/team-search.component';

@Component({
    selector: 'lima-manage-teams',
    templateUrl: './manage-teams.component.html',
    standalone: true,
    imports: [
        MatFormFieldModule,
        TranslateModule,
        MatInputModule,
        ReactiveFormsModule,
        MatTableModule,
        MatButtonModule,
        MatIconModule,
        AsyncPipe,
        CypressSelectorDirective,
        TeamSearchComponent,
    ],
})
export class ManageTeamsComponent {

    displayedColumns: string[] = ['team', 'action'];

    newTeam = new FormControl('', [Validators.required]);

    newTeamName = new FormControl('', [Validators.required]);

    searchTeam = new FormControl();

    addTeamMode = false;

    editTeamId = '';

    teams = signal<Maybe<Maybe<Team>[]> | undefined>([]);

    teams$ = this.searchTeam.valueChanges.pipe(
        startWith(null),
        switchMap((searchTerm) =>
            !searchTerm
                ? this.teamService.allTeams$
                : this.teamService.allTeams$.pipe(
                    map((x) =>
                        x?.filter((y) =>
                            y?.name
                                .toLocaleLowerCase()
                                .includes(searchTerm.toLocaleLowerCase()),
                        ),
                    ),
                ),
        ),
    );

    constructor(private teamService: TeamService) {}

    editTeam(team: Team) {
        this.editTeamId = team.id;
        this.newTeamName.setValue(team.name);
    }

    async addNewTeam(name: string) {
        await firstValueFrom(this.teamService.createTeam(name));
        this.addTeamMode = false;
    }

    async deleteTeam(team_id: string) {
        console.log(team_id);
        await firstValueFrom(this.teamService.deleteTeam({ team_id }));
    }

    async renameTeam(team_id: string, new_name: string) {
        await firstValueFrom(
            this.teamService.renameTeam({ team_id, new_name }),
        );
        this.editTeamId = '';
    }

}
