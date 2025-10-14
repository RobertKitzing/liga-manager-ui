import { TestBed } from '@angular/core/testing';
import { provideStore, Store } from '@ngxs/store';
import { SelectedItemsState } from './selected-items.state';
import { SelectedItemsSelectors } from './selected-items.selectors';
import { SetSelectedCalendarOptions, SetSelectedDarkMode, SetSelectedTheme } from './actions';
import { DarkModeAppearance } from '@aparajita/capacitor-dark-mode';

describe('SelectedItemsState', () => {

    let store: Store;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [provideStore([SelectedItemsState])],
        });

        store = TestBed.inject(Store);
    });

    it('it should get darkMode', () => {
        const darkMode = store.selectSnapshot(SelectedItemsSelectors.selectedDarkMode);
        expect(darkMode).toStrictEqual(DarkModeAppearance.system);
    });

    it('it should set darkMode', () => {
        const expectedDarkMode = DarkModeAppearance.dark;
        store.dispatch(new SetSelectedDarkMode(expectedDarkMode));
        const darkMode = store.selectSnapshot(SelectedItemsSelectors.selectedDarkMode);
        expect(darkMode).toStrictEqual(expectedDarkMode);
    });

    it('it should get theme', () => {
        const theme = store.selectSnapshot(SelectedItemsSelectors.selectedTheme);
        expect(theme).toStrictEqual('default');
    });

    it('it should set theme', () => {
        const expectedTheme = 'gondi';
        store.dispatch(new SetSelectedTheme(expectedTheme));
        let theme = store.selectSnapshot(SelectedItemsSelectors.selectedTheme);
        expect(theme).toStrictEqual(expectedTheme);
        store.dispatch(new SetSelectedTheme(undefined));
        theme = store.selectSnapshot(SelectedItemsSelectors.selectedTheme);
        expect(theme).toStrictEqual('default');
    });

    it('it should set calendarTeamIds', () => {
        store.dispatch(new SetSelectedCalendarOptions({ teamIds: 'test' }));
        let calendarTeamIds = store.selectSnapshot(SelectedItemsSelectors.selectedCalendarOptions).teamIds;
        expect(calendarTeamIds).toStrictEqual(['test']);

        store.dispatch(new SetSelectedCalendarOptions({ teamIds: 'test,test2' }));
        calendarTeamIds = store.selectSnapshot(SelectedItemsSelectors.selectedCalendarOptions).teamIds;
        expect(calendarTeamIds).toStrictEqual(['test', 'test2']);
    });

    it('it should get calendarTeamIds', () => {
        const calendarTeamIds = store.selectSnapshot(SelectedItemsSelectors.selectedCalendarOptions).teamIds;
        expect(calendarTeamIds).toStrictEqual([]);
    });

});