import { TestBed } from '@angular/core/testing';
import { provideStore, Store } from '@ngxs/store';
import { PitchState } from './pitch.state';
import { PitchSelectors } from './pitch.selector';
import { aPitch, CreatePitchGQL, DeletePitchGQL, PitchesGQL } from '@liga-manager-api/graphql';
import { CreatePitch, DeletePitch } from './actions';
import { ApolloTestingController, ApolloTestingModule } from 'apollo-angular/testing';

describe('PitchState', () => {

    let controller: ApolloTestingController;

    let store: Store;

    let pitchesGQL: PitchesGQL;

    let createPitchGQL: CreatePitchGQL;

    let deletePitchGQL: DeletePitchGQL;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [ ApolloTestingModule ],
            providers: [
                provideStore(
                    [PitchState],
                ),
                PitchesGQL,
                CreatePitchGQL,
                DeletePitchGQL,
            ],
        });

        controller = TestBed.inject(ApolloTestingController);

        store = TestBed.inject(Store);

        pitchesGQL = TestBed.inject(PitchesGQL);

        createPitchGQL = TestBed.inject(CreatePitchGQL);

        deletePitchGQL = TestBed.inject(DeletePitchGQL);

        controller.expectOne(pitchesGQL.document);
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
        const op = controller.expectOne(createPitchGQL.document);

        expect(op.operation.variables).toStrictEqual(pitch);
    });

    it('should delete a pitch', () => {

        const pitch = aPitch({ label: 'new', contact: undefined });

        const payload = { pitch_id: pitch.id };

        store.dispatch(new DeletePitch(payload, pitch.label));

        const op = controller.expectOne(deletePitchGQL.document);

        expect(op.operation.variables).toStrictEqual(payload);
    });

});
