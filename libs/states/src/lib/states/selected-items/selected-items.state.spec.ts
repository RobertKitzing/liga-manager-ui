import { TestBed } from '@angular/core/testing';
import { provideStore, Store } from '@ngxs/store';
import { SelectedItemsState } from './selected-items.state';
import { SelectedItemsSelectors } from './selected-items.selectors';
import { SetSelectedCalendarTeamIds, SetSelectedDarkMode } from './actions';
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

    it('it should set calendarTeamIds', () => {
        store.dispatch(new SetSelectedCalendarTeamIds('test'));
        let calendarTeamIds = store.selectSnapshot(SelectedItemsSelectors.selectedCalendarTeamIds);
        expect(calendarTeamIds).toStrictEqual(['test']);

        store.dispatch(new SetSelectedCalendarTeamIds('test,test2'));
        calendarTeamIds = store.selectSnapshot(SelectedItemsSelectors.selectedCalendarTeamIds);
        expect(calendarTeamIds).toStrictEqual(['test', 'test2']);
    });

    it('it should get calendarTeamIds', () => {
        const calendarTeamIds = store.selectSnapshot(SelectedItemsSelectors.selectedCalendarTeamIds);
        expect(calendarTeamIds).toStrictEqual(['']);
    });

    it('it should set calendarTeamIds', () => {
        store.dispatch(new SetSelectedCalendarTeamIds('test'));
        let calendarTeamIds = store.selectSnapshot(SelectedItemsSelectors.selectedCalendarTeamIds);
        expect(calendarTeamIds).toStrictEqual(['test']);

        store.dispatch(new SetSelectedCalendarTeamIds('test,test2'));
        calendarTeamIds = store.selectSnapshot(SelectedItemsSelectors.selectedCalendarTeamIds);
        expect(calendarTeamIds).toStrictEqual(['test', 'test2']);
    });

});