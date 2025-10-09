import { Injectable } from '@angular/core';
import { Action, State, StateContext } from '@ngxs/store';
import { SetSelectedCalendarTeamIds, SetSelectedDarkMode, SetSelectedMatchDay, SetSelectedSeason, SetSelectedTeam, SetSelectedTheme, SetSelectedTournament, SetSelectedTournamentRound } from './actions';
import { patch } from '@ngxs/store/operators';
import { SetSelectedLanguage } from './actions/set-selected-language';
import { DarkModeAppearance } from '@aparajita/capacitor-dark-mode';

export interface Language {
    code: string;
    direction?: string;
}

export type SelectedContextTypes = 'history' | 'progress' | 'team-management' | 'administration';

export interface SelectedItemsStateModel {
    seasonId: {[ context in SelectedContextTypes ]?: string }
    matchDayId: {[ context in SelectedContextTypes ]?: string }
    teamId: {[ context in SelectedContextTypes ]?: string }
    tournamentId: {[ context in SelectedContextTypes ]?: string }
    tournamentRoundId: {[ context in SelectedContextTypes ]?: string }
    language?: Language;
    calendarTeamIds: string;
    theme: string;
    darkMode: DarkModeAppearance | null;
}

@State<SelectedItemsStateModel>({
    name: 'selected_items',
    defaults: {
        seasonId: {},
        matchDayId: {},
        teamId: {},
        tournamentId: {},
        tournamentRoundId: {},
        language: undefined,
        calendarTeamIds: '',
        theme: 'default',
        darkMode: DarkModeAppearance.system,
    },
})
@Injectable()
export class SelectedItemsState {

    @Action(SetSelectedDarkMode)
    setSelectedDarkMode({ patchState }: StateContext<SelectedItemsStateModel>, action: SetSelectedDarkMode) {
        patchState({ darkMode: action.darkMode });
    }

    @Action(SetSelectedTheme)
    setSelectedTheme({ patchState }: StateContext<SelectedItemsStateModel>, action: SetSelectedTheme) {
        patchState({ theme: action.theme });
    }

    @Action(SetSelectedCalendarTeamIds)
    setSelectedCalendarTeamIds({ patchState }: StateContext<SelectedItemsStateModel>, action: SetSelectedCalendarTeamIds) {
        patchState({ calendarTeamIds: action.payload });
    }

    @Action(SetSelectedLanguage)
    setSelectedLanguage({ patchState }: StateContext<SelectedItemsStateModel>, action: SetSelectedLanguage) {
        patchState({ language: action.payload });
    }

    @Action(SetSelectedMatchDay)
    setSelectedMatchDay({ setState }: StateContext<SelectedItemsStateModel>, action: SetSelectedMatchDay) {
        setState(
            patch({
                matchDayId: patch({[action.context]: action.id}),
            }),
        );
    }

    @Action(SetSelectedSeason)
    setSelectedSeason({ setState }: StateContext<SelectedItemsStateModel>, action: SetSelectedSeason) {
        setState(
            patch({
                seasonId: patch({[action.context]: action.id}),
            }),
        );
    }

    @Action(SetSelectedTeam)
    setSelectedTeam({ setState }: StateContext<SelectedItemsStateModel>, action: SetSelectedTeam) {
        setState(
            patch({
                teamId: patch({[action.context]: action.id}),
            }),
        );
    }

    @Action(SetSelectedTournament)
    setSelectedTournament({ setState }: StateContext<SelectedItemsStateModel>, action: SetSelectedTournament) {
        setState(
            patch({
                tournamentId: patch({[action.context]: action.id}),
            }),
        );
    }

    @Action(SetSelectedTournamentRound)
    setSelectedTournamentRound({ setState }: StateContext<SelectedItemsStateModel>, action: SetSelectedTournamentRound) {
        setState(
            patch({
                tournamentRoundId: patch({[action.context]: action.id}),
            }),
        );
    }

}
