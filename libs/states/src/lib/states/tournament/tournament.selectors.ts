import { createPropertySelectors, createSelector } from '@ngxs/store';
import { TournamentState as TournamentStateEnum } from '@liga-manager-api/graphql';
import { TournamentState, TournamentStateModel } from './tournament.state';
import { sortArrayBy } from '@liga-manager-ui/utils';

export class TournamentSelectors {

    static properties = createPropertySelectors<TournamentStateModel>(TournamentState);

    static tournaments(state?: TournamentStateEnum[] | null) {
        return createSelector([TournamentSelectors.properties.tournaments],
            (tournaments: TournamentStateModel['tournaments']) => {
                if (!tournaments) {
                    return [];
                }
                const filteredTournaments = tournaments.filter(
                    (tournament) => {
                        if (!tournament) {
                            return false;
                        }
                        if (!state) {
                            return true;
                        }
                        return state.includes(tournament.state);
                    },
                );
                return sortArrayBy(filteredTournaments, 'name', 'asc');
            });
    }

}
