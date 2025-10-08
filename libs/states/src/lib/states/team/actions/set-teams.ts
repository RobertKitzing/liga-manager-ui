import { TeamStateModel } from '../team.state';

export class SetTeams {

    static readonly type = '[TeamState] SetTeams';

    constructor(
        public teams: TeamStateModel['teams'],
    ) {

    }

}