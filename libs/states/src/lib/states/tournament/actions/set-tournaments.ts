import { TournamentStateModel } from '../tournament.state';

export class SetTournaments {

    static readonly type = '[TournamentState] SetTournaments';

    constructor(
        public tournaments: TournamentStateModel['tournaments'],
    ) {}

}