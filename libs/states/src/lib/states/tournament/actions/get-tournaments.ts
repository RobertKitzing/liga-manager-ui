export class GetTournaments {

    static readonly type = '[TournamentState] GetTournaments';

    constructor(
        public forceReload?: boolean,
    ) {

    }

}
