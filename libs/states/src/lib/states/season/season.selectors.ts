import { createPropertySelectors, createSelector } from '@ngxs/store';
import { SeasonState as SeasonStateEnum } from '@liga-manager-api/graphql';
import { SeasonState, SeasonStateModel } from './season.state';

export class SeasonSelectors {

    static properties = createPropertySelectors<SeasonStateModel>(SeasonState);

    static seasons(state?: SeasonStateEnum[] | null) {
        return createSelector([SeasonSelectors.properties.seasons],
            (seasons: SeasonStateModel['seasons']) => {
                if (!seasons) {
                    return [];
                }
                const filteredSeasons = seasons.filter(
                    (season) => {
                        if (!season) {
                            return false;
                        }
                        if (!state) {
                            return true;
                        }
                        return state.includes(season.state);
                    },
                );
                return [...filteredSeasons].sort((a, b) => {
                    const aStartDate =
                        a?.match_days?.find((x) => x?.number === 1)?.start_date ||
                        '';
                    const bStartDate =
                        b?.match_days?.find((x) => x?.number === 1)?.start_date ||
                        '';
                    if (aStartDate < bStartDate) {
                        return 1;
                    }
                    if (aStartDate > bStartDate) {
                        return -1;
                    }
                    return 0;
                });
            });
    }

}
