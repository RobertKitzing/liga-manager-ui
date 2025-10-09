import { TestBed } from '@angular/core/testing';
import { provideStore, Store } from '@ngxs/store';
import { PitchState } from './pitch.state';
import { PitchSelectors } from './pitch.selector';
import { aPitch, CreatePitchDocument, DeletePitchDocument } from '@liga-manager-api/graphql';
import { CreatePitch, DeletePitch } from './actions';
import { ApolloTestingController, ApolloTestingModule } from 'apollo-angular/testing';

describe('PitchState', () => {

    let controller: ApolloTestingController;

    let store: Store;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [ ApolloTestingModule ],
            providers: [
                provideStore(
                    [PitchState],
                ),
            ],
        });

        controller = TestBed.inject(ApolloTestingController);

        store = TestBed.inject(Store);

    });

    afterEach(() => {
        controller.verify();
    });

    it('should have no pitches', () => {
        const pitches = store.selectSnapshot(PitchSelectors.pitches);
        expect(pitches).toStrictEqual([]);
    });

    it('should create a pitch', () => {

        const pitch = aPitch({ label: 'new', contact: undefined });

        store.dispatch(new CreatePitch(pitch));
        const op = controller.expectOne(CreatePitchDocument);
        expect(op.operation.variables).toStrictEqual(pitch);

    });

    it('should delete a pitch', () => {

        const pitch = aPitch({ label: 'new', contact: undefined });

        const payload = { pitch_id: pitch.id };

        store.dispatch(new DeletePitch(payload, pitch.label));
        const op = controller.expectOne(DeletePitchDocument);
        expect(op.operation.variables).toStrictEqual(payload);
    });

});
