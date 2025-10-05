import { createPropertySelectors, Selector } from '@ngxs/store';
import { sortArrayBy } from '@liga-manager-ui/utils';
import { TeamState, TeamStateModel } from './team.state';

export class TeamSelectors {

    static properties = createPropertySelectors<TeamStateModel>(TeamState);

    @Selector([TeamSelectors.properties.teams])
    static teams(teams: TeamStateModel['teams']) {
        return sortArrayBy(teams || [], 'name');
    }

}
