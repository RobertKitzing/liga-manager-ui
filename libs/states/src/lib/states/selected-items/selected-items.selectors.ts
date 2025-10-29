import { createPropertySelectors, createSelector, Selector } from '@ngxs/store';
import { SelectedContextTypes, SelectedItemsState, SelectedItemsStateModel } from './selected-items.state';

export class SelectedItemsSelectors {

    static properties = createPropertySelectors<SelectedItemsStateModel>(SelectedItemsState);

    @Selector([SelectedItemsSelectors.properties.darkMode])
    static selectedDarkMode(darkMode: SelectedItemsStateModel['darkMode']) {
        return darkMode;
    }

    @Selector([SelectedItemsSelectors.properties.theme])
    static selectedTheme(theme: SelectedItemsStateModel['theme']) {
        return theme || 'default';
    }

    @Selector([SelectedItemsSelectors.properties.calendar])
    static selectedCalendarOptions(calendar: SelectedItemsStateModel['calendar']) {
        const teamIds = calendar?.teamIds?.split(',') || [];
        return {
            teamIds: !teamIds[0] ? [] : teamIds,
            selectedView: calendar?.selectedView || 'list',
            duration: calendar?.duration || { value: 1, type: 'week' },
        };
    }

    @Selector([SelectedItemsSelectors.properties.language])
    static selectedLanguage(selectedLanguage: SelectedItemsStateModel['language']) {
        return selectedLanguage;
    }

    static selectedTeamId(context: SelectedContextTypes) {
        return createSelector([SelectedItemsSelectors.properties.teamId],
            (teamId: SelectedItemsStateModel['teamId']) => {
                if (teamId && teamId[context]) {
                    if (teamId[context] === '0') {
                        return 'ALL';
                    }
                    return teamId[context];
                }
                return 'ALL';
            });
    }

    static selectedMatchDayId(context: SelectedContextTypes) {
        return createSelector([SelectedItemsSelectors.properties.matchDayId],
            (matchDayId: SelectedItemsStateModel['matchDayId']) => {
                return matchDayId && matchDayId[context];
            });
    }

    static selectedSeasonId(context: SelectedContextTypes) {
        return createSelector([SelectedItemsSelectors.properties.seasonId],
            (seasonId: SelectedItemsStateModel['seasonId']) => {
                return seasonId && seasonId[context];
            });
    }

    static selectedTournamentId(context: SelectedContextTypes) {
        return createSelector([SelectedItemsSelectors.properties.tournamentId],
            (tournamentId: SelectedItemsStateModel['tournamentId']) => {
                return tournamentId && tournamentId[context];
            });
    }

    static selectedTournamentRoundId(context: SelectedContextTypes) {
        return createSelector([SelectedItemsSelectors.properties.tournamentRoundId],
            (tournamentRoundId: SelectedItemsStateModel['tournamentRoundId']) => {
                return tournamentRoundId && tournamentRoundId[context];
            });
    }

}
