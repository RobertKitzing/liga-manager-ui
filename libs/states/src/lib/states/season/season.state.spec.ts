import { TestBed } from '@angular/core/testing';
import { provideStore, Store } from '@ngxs/store';
import { SeasonState } from './season.state';
import { SeasonSelectors } from './season.selectors';
import { aSeason, SeasonListGQL, SeasonState as SeasonStateEnum } from '@liga-manager-api/graphql';
import { ApolloTestingController, ApolloTestingModule } from 'apollo-angular/testing';

describe('SeasonState', () => {

    let controller: ApolloTestingController;

    let seasonListGQL: SeasonListGQL;

    let store: Store;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [ ApolloTestingModule ],
            providers: [
                provideStore(
                    [SeasonState],
                ),
            ],
        });

        store = TestBed.inject(Store);
        controller = TestBed.inject(ApolloTestingController);
        seasonListGQL = TestBed.inject(SeasonListGQL);

        controller.expectOne(seasonListGQL.document);
    });

    afterEach(() => {
        controller.verify();
    });

    it('should have seasons', () => {
        expect(store.selectSnapshot(SeasonSelectors.seasons())).toStrictEqual([]);
    });

    it('should have a seasons', () => {
        const season = aSeason();
        store.reset({
            season: { seasons: [ season ] },
        });
        expect(store.selectSnapshot(SeasonSelectors.seasons())[0]).toBe(season);
    });

    it('should filter seasons', () => {
        const seasons = [
            aSeason({ state: SeasonStateEnum.Ended }),
            aSeason({ state: SeasonStateEnum.Preparation }),
            aSeason({ state: SeasonStateEnum.Progress }),
        ];
        store.reset({
            season: { seasons },
        });
        expect(store.selectSnapshot(SeasonSelectors.seasons([SeasonStateEnum.Ended]))[0]).toBe(seasons[0]);
        expect(store.selectSnapshot(SeasonSelectors.seasons([SeasonStateEnum.Preparation]))[0]).toBe(seasons[1]);
        expect(store.selectSnapshot(SeasonSelectors.seasons([SeasonStateEnum.Progress]))[0]).toBe(seasons[2]);

        expect(store.selectSnapshot(SeasonSelectors.seasons([SeasonStateEnum.Ended, SeasonStateEnum.Progress]))).toHaveLength(2);
    });

});
