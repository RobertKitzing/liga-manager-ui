import { TestBed } from '@angular/core/testing';
import { Actions, ofActionDispatched, provideStore, Store } from '@ngxs/store';
import { SeasonState } from './season.state';
import { SeasonSelectors } from './season.selectors';
import { aDatePeriod, AddPenaltyDocument, AddTeamToSeasonDocument, aMatchAppointment, aRankingPenalty, aSeason, CreateMatchesForSeasonDocument, CreateSeasonDocument, DeleteSeasonDocument, EndSeasonDocument, RemovePenaltyDocument, RemoveTeamFromSeasonDocument, ReplaceTeamInSeasonDocument, ScheduleAllMatchesForMatchDayDocument, ScheduleAllMatchesForSeasonDocument, SeasonListDocument, SeasonState as SeasonStateEnum, StartSeasonDocument } from '@liga-manager-api/graphql';
import { ApolloTestingController, ApolloTestingModule } from 'apollo-angular/testing';
import { AddPenalty, AddTeamToSeason, CreateMatchesForSeason, CreateSeason, DeleteSeason, EndSeason, RemovePenalty, RemoveTeamFromSeason, ReplaceTeamInSeason, RescheduleMatchDays, ScheduleAllMatchesForMatchDay, ScheduleAllMatchesForSeason, SetSeasons, StartSeason } from './actions';
import { SetSelectedSeason } from '../selected-items';
import { firstValueFrom, tap } from 'rxjs';

describe('SeasonState', () => {

    let controller: ApolloTestingController;
    let actions: Actions;
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
        actions = TestBed.inject(Actions);
    });

    afterEach(() => {
        controller.verify();
    });

    it('should have seasons', () => {
        expect(store.selectSnapshot(SeasonSelectors.seasons())).toStrictEqual([]);
    });

    it('should set seasons', () => {
        const seasons = [ aSeason() ];
        store.dispatch(new SetSeasons(seasons));

        expect(store.selectSnapshot(SeasonSelectors.seasons())).toStrictEqual(seasons);
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

    it('should create a season', () => {

        const season = aSeason({ name: 'test', id: 'testId' });

        const action = new CreateSeason({ name: season.name, season_id: season.id });
        store.dispatch(action);

        const op = controller.expectOne(CreateSeasonDocument);
        expect(op.operation.variables).toStrictEqual(action.payload);
    });

    it('should start a season', () => {

        const season = aSeason({ name: 'test', id: 'testId' });

        const action = new StartSeason({ season_id: season.id }, season.name);
        store.dispatch(action);

        const op = controller.expectOne(StartSeasonDocument);
        expect(op.operation.variables).toStrictEqual(action.payload);
    });

    it('should end a season', () => {

        const season = aSeason({ name: 'test', id: 'testId' });

        const action = new EndSeason({ season_id: season.id }, season.name);
        store.dispatch(action);

        const op = controller.expectOne(EndSeasonDocument);
        op.flushData({ endSeason: true });
        expect(op.operation.variables).toStrictEqual(action.payload);

        return firstValueFrom(
            actions.pipe(
                ofActionDispatched(SetSelectedSeason),
                tap(
                    (action) => {
                        controller.expectOne(SeasonListDocument);
                        expect(action.context).toBe('administration');
                        expect(action.id).toBeUndefined();
                    },
                ),
            ),
        );
    });

    it('should delete a season', () => {

        const season = aSeason({ name: 'test', id: 'testId' });

        const action = new DeleteSeason({ season_id: season.id }, season.name);
        store.dispatch(action);

        const op = controller.expectOne(DeleteSeasonDocument);
        op.flushData({ deleteSeason: true });
        expect(op.operation.variables).toStrictEqual(action.payload);

        return firstValueFrom(
            actions.pipe(
                ofActionDispatched(SetSelectedSeason),
                tap(
                    (action) => {
                        controller.expectOne(SeasonListDocument);
                        expect(action.context).toBe('administration');
                        expect(action.id).toBeUndefined();
                    },
                ),
            ),
        );
    });

    it('should add a penalty', () => {

        const penalty = aRankingPenalty();

        const action = new AddPenalty({
            id: penalty.id,
            points: penalty.points,
            reason: penalty.reason,
            season_id: 'seasonId',
            team_id: 'teamId',
        });
        store.dispatch(action);

        const op = controller.expectOne(AddPenaltyDocument);
        expect(op.operation.variables).toStrictEqual(action.payload);
    });

    it('should remove a penalty', () => {

        const penalty = aRankingPenalty();

        const action = new RemovePenalty({
            ranking_penalty_id: penalty.id,
            season_id: 'seasonId',
        });
        store.dispatch(action);

        const op = controller.expectOne(RemovePenaltyDocument);
        expect(op.operation.variables).toStrictEqual(action.payload);
    });

    it('should add a team to a season', () => {

        const action = new AddTeamToSeason(
            {
                season_id: 'test',
                team_id: 'test',
            },
            'test',
            'test',
        );
        store.dispatch(action);

        const op = controller.expectOne(AddTeamToSeasonDocument);
        expect(op.operation.variables).toStrictEqual(action.payload);
    });

    it('should remove a team from a season', () => {

        const action = new RemoveTeamFromSeason(
            {
                season_id: 'test',
                team_id: 'test',
            },
            'test',
            'test',
        );
        store.dispatch(action);

        const op = controller.expectOne(RemoveTeamFromSeasonDocument);
        expect(op.operation.variables).toStrictEqual(action.payload);
    });

    it('should replace a team in a season', () => {

        const action = new ReplaceTeamInSeason(
            {
                season_id: 'test',
                current_team_id: 'test',
                replacement_team_id: 'test2',
            },
            'test',
        );
        store.dispatch(action);

        const op = controller.expectOne(ReplaceTeamInSeasonDocument);
        expect(op.operation.variables).toStrictEqual(action.payload);
    });

    it('should create matches for a season', () => {

        const action = new CreateMatchesForSeason(
            {
                dates: [],
                season_id: 'test',
            },
        );
        store.dispatch(action);

        const op = controller.expectOne(CreateMatchesForSeasonDocument);
        expect(op.operation.variables).toStrictEqual(action.payload);
    });

    it('should reschedule matchdays for a season', () => {

        const date_period = aDatePeriod();
        const action = new RescheduleMatchDays(
            [
                {
                    date_period,
                    match_day_id: 'test',
                },
            ],
            'test',
        );
        store.dispatch(action);

        const op = controller.expectOne('RescheduleMatchDays');
        expect(op.operation.operationName).toStrictEqual('RescheduleMatchDays');
    });

    it('should schedule all matches for a matchday of a season', () => {

        const match_appointments = aMatchAppointment();
        const action = new ScheduleAllMatchesForMatchDay(
            {
                match_day_id: 'test',
                match_appointments,
            },
            'season',
        );
        store.dispatch(action);

        const op = controller.expectOne(ScheduleAllMatchesForMatchDayDocument);
        expect(op.operation.variables).toStrictEqual(action.payload);
    });

    it('should schedule all matches of a season', () => {

        const match_appointments = aMatchAppointment();
        const action = new ScheduleAllMatchesForSeason(
            {
                season_id: 'test',
                match_appointments,
            },
        );
        store.dispatch(action);

        const op = controller.expectOne(ScheduleAllMatchesForSeasonDocument);
        expect(op.operation.variables).toStrictEqual(action.payload);
    });

});
