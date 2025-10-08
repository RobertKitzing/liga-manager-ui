import { SeasonStateModel } from '../season.state';

export class SetSeasons {

    static readonly type = '[SeasonState] SetSeasons';

    constructor(
        public seasons: SeasonStateModel['seasons'],
    ) {

    }

}
