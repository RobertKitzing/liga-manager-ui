import { TestBed } from '@angular/core/testing';
import { provideStore, Store } from '@ngxs/store';
import { SelectedItemsState } from './selected-items.state';
import { SelectedItemsSelectors } from './selected-items.selectors';
import { SetSelectedCalendarTeamIds } from './actions';

describe('SelectedItemsState', () => {

    let store: Store;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [provideStore([SelectedItemsState])],
        });

        store = TestBed.inject(Store);
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