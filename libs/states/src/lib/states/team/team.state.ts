import { DestroyRef, inject, Injectable } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Action, NgxsOnInit, State, StateContext } from '@ngxs/store';
import { CreateTeamGQL, DeleteTeamGQL, RenameTeamGQL, TeamListGQL, TeamListQuery } from '@liga-manager-api/graphql';
import { CreateTeam, DeleteTeam, RenameTeam } from './actions';
import { v4 as uuidv4 } from 'uuid';

export interface TeamStateModel {
    teams: TeamListQuery['allTeams'];
}

@State<TeamStateModel>({
    name: 'team',
    defaults: {
        teams: [],
    },
})
@Injectable()
export class TeamState implements NgxsOnInit {

    private teamListGQL = inject(TeamListGQL);

    private createTeamQL = inject(CreateTeamGQL);

    private deleteTeamGQL = inject(DeleteTeamGQL);

    private renameTeamGQL = inject(RenameTeamGQL);

    private destroyRef = inject(DestroyRef);

    ngxsOnInit(ctx: StateContext<TeamStateModel>): void {
        this.teamListGQL.watch().valueChanges.pipe(
            takeUntilDestroyed(this.destroyRef),
        ).subscribe(
            (result) => {
                ctx.patchState({ teams: result.data.allTeams });
            },
        );
    }

    @Action(CreateTeam)
    createTeam(_: StateContext<TeamStateModel>, action: CreateTeam) {
        return this.createTeamQL.mutate(
            {
                id: uuidv4(),
                name: action.name,
            },
            {
                refetchQueries: [
                    {
                        query: this.teamListGQL.document,
                    },
                ],
            },
        );
    }

    @Action(DeleteTeam)
    deleteTeam(_: StateContext<TeamStateModel>, action: DeleteTeam) {
        return this.deleteTeamGQL.mutate(
            action.payload,
            {
                refetchQueries: [
                    {
                        query: this.teamListGQL.document,
                    },
                ],
            },
        );
    }

    @Action(RenameTeam)
    renameTeam(_: StateContext<TeamStateModel>, action: RenameTeam) {
        return this.renameTeamGQL.mutate(
            action.payload,
            {
                refetchQueries: [
                    {
                        query: this.teamListGQL.document,
                    },
                ],
            },
        );
    }

}
