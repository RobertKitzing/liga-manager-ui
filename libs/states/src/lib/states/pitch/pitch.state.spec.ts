import { TestBed } from '@angular/core/testing';
import { provideStore, Store } from '@ngxs/store';
import { PitchState } from './pitch.state';
import { PitchSelectors } from './pitch.selector';
import { aPitch, CreatePitchGQL, DeletePitchGQL, PitchesGQL } from '@liga-manager-api/graphql';
import { Injectable } from '@angular/core';
import { CreatePitch, DeletePitch } from './actions';

@Injectable()
class PitchesGQLMock {

    watch = () => jest.fn();

}

@Injectable()
class CreatePitchGQLMock {

    mutate = () => jest.fn();

}

@Injectable()
class DeletePitchGQLMock {

    mutate = () => jest.fn();

}

describe('PitchState', () => {

    let store: Store;

    let createPitchGQL: CreatePitchGQL;

    let deletePitchGQL: DeletePitchGQL;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                provideStore(
                    [PitchState],
                ),
                {
                    provide: PitchesGQL,
                    useClass: PitchesGQLMock,
                },
                {
                    provide: CreatePitchGQL,
                    useClass: CreatePitchGQLMock,
                },
                {
                    provide: DeletePitchGQL,
                    useClass: DeletePitchGQLMock,
                },
            ],
        });

        store = TestBed.inject(Store);

        createPitchGQL = TestBed.inject(CreatePitchGQL);

        deletePitchGQL = TestBed.inject(DeletePitchGQL);

    });

    it('should have no pitches', () => {
        expect(store.selectSnapshot(PitchSelectors.pitches)).toStrictEqual([]);
    });

    it('should create a pitch', () => {

        const pitch = aPitch({ label: 'new', contact: undefined });

        const spy = jest.spyOn(createPitchGQL, 'mutate');

        store.dispatch(new CreatePitch(pitch));

        expect(spy.mock.calls[0][0]).toEqual(pitch);
    });

    it('should delete a pitch', () => {

        const pitch = aPitch({ label: 'new', contact: undefined });

        const spy = jest.spyOn(deletePitchGQL, 'mutate');

        const payload = { pitch_id: pitch.id };

        store.dispatch(new DeletePitch(payload, pitch.label));

        expect(spy.mock.calls[0][0]).toEqual(payload);
    });

});
