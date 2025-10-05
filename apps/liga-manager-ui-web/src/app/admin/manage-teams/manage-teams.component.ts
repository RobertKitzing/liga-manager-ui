import { Component, inject, signal } from '@angular/core';
import { FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { NotificationService, TeamService } from '@liga-manager-ui/services';
import { firstValueFrom, map, startWith, switchMap } from 'rxjs';
import { Maybe, Team } from '@liga-manager-api/graphql';
import { AsyncPipe } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CypressSelectorDirective } from '@liga-manager-ui/directives';
import { TeamSearchComponent } from '@liga-manager-ui/components';
import { MatCardModule } from '@angular/material/card';
import { CreateTeam, DeleteTeam, RenameTeam, TeamSelectors } from '@liga-manager-ui/states';
import { Store } from '@ngxs/store';

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
        MatCardModule,
    ],
})
export class ManageTeamsComponent {

    private store = inject(Store);

    private teamService = inject(TeamService);

    private notificationService = inject(NotificationService);

    private translateService = inject(TranslateService);

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
                ? this.store.select(TeamSelectors.teams)
                : this.store.select(TeamSelectors.teams).pipe(
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

    editTeam(team: Team) {
        this.editTeamId = team.id;
        this.newTeamName.setValue(team.name);
    }

    async addNewTeam(name: string) {
        await firstValueFrom(this.store.dispatch( new CreateTeam(name)));
        this.addTeamMode = false;
    }

    deleteTeam(team_id: string, name: string) {
        this.store.dispatch( new DeleteTeam({ team_id}, name));
    }

    async renameTeam(team_id: string, new_name: string, oldName: string) {
        await firstValueFrom(
            this.store.dispatch(new RenameTeam({ team_id, new_name }, oldName)),
        );
        this.editTeamId = '';
    }

}
