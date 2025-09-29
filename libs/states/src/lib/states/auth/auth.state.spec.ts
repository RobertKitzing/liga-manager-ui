import { TestBed } from '@angular/core/testing';
import { provideStore, Store } from '@ngxs/store';
import { AuthState } from './auth.state';
import { AuthStateSelectors } from './auth.selectors';
import { GetAuthenticatedUser, Login, Logout, SetToken } from './actions';
import { aMatch, aTeam, aUser, AuthenticatedUserGQL, UserRole } from '@liga-manager-api/graphql';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';

@Injectable()
class AuthenticatedUserGQLMock {

    fetch = () => jest.fn();

}

describe('AuthState', () => {

    let store: Store;
    let authenticatedUserGQL: AuthenticatedUserGQL;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                provideStore([AuthState]),
                {
                    provide: AuthenticatedUserGQL,
                    useClass: AuthenticatedUserGQLMock,
                },
            ],
        });

        store = TestBed.inject(Store);
        authenticatedUserGQL = TestBed.inject(AuthenticatedUserGQL);
    });

    it('it should get the token', () => {
        const token = store.selectSnapshot(AuthStateSelectors.properties.token);
        expect(token).toBe(token);
    });

    it('it should set the token', () => {
        const expectedToken = 'test';
        store.dispatch(new SetToken(expectedToken));
        const token = store.selectSnapshot(AuthStateSelectors.properties.token);
        expect(token).toBe(expectedToken);
    });

    it('it should logout correctly', () => {
        const expectedToken = 'test';
        store.dispatch(new SetToken(expectedToken));
        store.dispatch(new Logout());
        const token = store.selectSnapshot(AuthStateSelectors.properties.token);
        expect(token).toBe(undefined);
    });

    it('it should get the authenticated user', () => {
        store.dispatch(new SetToken('test'));
        const expectedUser = aUser();
        jest.spyOn(authenticatedUserGQL, 'fetch').mockReturnValue(of({
            loading: false,
            networkStatus: 1,
            data: { authenticatedUser: expectedUser },
        }));
        store.dispatch(new GetAuthenticatedUser());
        const user = store.selectSnapshot(AuthStateSelectors.properties.user);
        expect(user).toBe(expectedUser);
    });

    it('it should login', () => {
        store.dispatch(new SetToken('test'));
        const expectedUser = aUser();
        const spy = jest.spyOn(authenticatedUserGQL, 'fetch').mockReturnValue(of({
            loading: false,
            networkStatus: 1,
            data: { authenticatedUser: expectedUser },
        }));
        const loginContext = { username: 'user', password: 'pass' };
        store.dispatch(new Login(loginContext));
        const user = store.selectSnapshot(AuthStateSelectors.properties.user);
        expect(user).toBe(expectedUser);
        expect(spy).toHaveBeenCalledWith(
            undefined,
            {
                fetchPolicy: 'network-only',
                context: {
                    loginContext,
                },
            },
        );
    });

    it('it check if the user is a admin', () => {
        store.dispatch(new SetToken('test'));
        const expectedUser = aUser({ role: UserRole.Admin });
        jest.spyOn(authenticatedUserGQL, 'fetch').mockReturnValue(of({
            loading: false,
            networkStatus: 1,
            data: { authenticatedUser: expectedUser },
        }));
        store.dispatch(new GetAuthenticatedUser());
        const result = store.selectSnapshot(AuthStateSelectors.isAdmin);
        expect(result).toBe(true);
    });

    it('it check if the user is a team admin', () => {
        store.dispatch(new SetToken('test'));
        const expectedUser = aUser({ role: UserRole.TeamManager });
        jest.spyOn(authenticatedUserGQL, 'fetch').mockReturnValue(of({
            loading: false,
            networkStatus: 1,
            data: { authenticatedUser: expectedUser },
        }));
        store.dispatch(new GetAuthenticatedUser());
        const result = store.selectSnapshot(AuthStateSelectors.isTeamAdmin);
        expect(result).toBe(true);
    });

    it('it check if the user is a team admin for a team', () => {
        store.dispatch(new SetToken('test'));
        const team = aTeam();
        const expectedUser = aUser({ role: UserRole.TeamManager, teams: [ team ] });
        jest.spyOn(authenticatedUserGQL, 'fetch').mockReturnValue(of({
            loading: false,
            networkStatus: 1,
            data: { authenticatedUser: expectedUser },
        }));
        store.dispatch(new GetAuthenticatedUser());
        const result = store.selectSnapshot(AuthStateSelectors.isTeamAdminForTeam(team.id));
        expect(result).toBe(true);
    });

    it('it check if the user can edit a match as admin', () => {
        store.dispatch(new SetToken('test'));
        const home_team = aTeam({ id: 'home' });
        const guest_team = aTeam({ id: 'guest' });
        const expectedUser = aUser({ role: UserRole.Admin });
        const match = aMatch({ home_team, guest_team });
        jest.spyOn(authenticatedUserGQL, 'fetch').mockReturnValue(of({
            loading: false,
            networkStatus: 1,
            data: { authenticatedUser: expectedUser },
        }));
        store.dispatch(new GetAuthenticatedUser());
        const result = store.selectSnapshot(AuthStateSelectors.canEditMatch(match));
        expect(result).toBe(true);
    });

    it('it check if the user can edit a match for home_team', () => {
        store.dispatch(new SetToken('test'));
        const home_team = aTeam({ id: 'home' });
        const guest_team = aTeam({ id: 'guest' });
        const expectedUser = aUser({ role: UserRole.TeamManager, teams: [ home_team ] });
        const match = aMatch({ home_team, guest_team });
        jest.spyOn(authenticatedUserGQL, 'fetch').mockReturnValue(of({
            loading: false,
            networkStatus: 1,
            data: { authenticatedUser: expectedUser },
        }));
        store.dispatch(new GetAuthenticatedUser());
        const result = store.selectSnapshot(AuthStateSelectors.canEditMatch(match));
        expect(result).toBe(true);
    });

    it('it check if the user can edit a match for guest_team', () => {
        store.dispatch(new SetToken('test'));
        const home_team = aTeam({ id: 'home' });
        const guest_team = aTeam({ id: 'guest' });
        const expectedUser = aUser({ role: UserRole.TeamManager, teams: [ guest_team ] });
        const match = aMatch({ home_team, guest_team });
        jest.spyOn(authenticatedUserGQL, 'fetch').mockReturnValue(of({
            loading: false,
            networkStatus: 1,
            data: { authenticatedUser: expectedUser },
        }));
        store.dispatch(new GetAuthenticatedUser());
        const result = store.selectSnapshot(AuthStateSelectors.canEditMatch(match));
        expect(result).toBe(true);
    });

});
