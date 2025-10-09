import { TestBed } from '@angular/core/testing';
import { Actions, ofActionSuccessful, provideStore, Store } from '@ngxs/store';
import { AuthState } from './auth.state';
import { AuthStateSelectors } from './auth.selectors';
import { GetAuthenticatedUser, Login, Logout, SetToken } from './actions';
import { aMatch, aTeam, aUser, AuthenticatedUserDocument, AuthenticatedUserGQL, UserRole } from '@liga-manager-api/graphql';
import { firstValueFrom, of, tap } from 'rxjs';
import { ApolloTestingController, ApolloTestingModule } from 'apollo-angular/testing';

describe('AuthState', () => {

    let controller: ApolloTestingController;
    let store: Store;
    let authenticatedUserGQL: AuthenticatedUserGQL;

    let actions: Actions;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [ ApolloTestingModule ],
            providers: [
                provideStore([AuthState]),
            ],
        });

        controller = TestBed.inject(ApolloTestingController);
        store = TestBed.inject(Store);
        authenticatedUserGQL = TestBed.inject(AuthenticatedUserGQL);
        actions = TestBed.inject(Actions);
    });

    afterEach(() => {
        controller.verify();
    });

    it('it should get the token', () => {
        const token = store.selectSnapshot(AuthStateSelectors.properties.token);
        expect(token).toBe(token);
    });

    it('it should set the token', () => {
        const expectedToken = 'test';
        store.dispatch(new SetToken(expectedToken));
        controller.expectOne(AuthenticatedUserDocument);
        const token = store.selectSnapshot(AuthStateSelectors.properties.token);
        expect(token).toBe(expectedToken);
    });

    it('it should logout correctly', () => {
        const expectedToken = 'test';
        store.dispatch(new SetToken(expectedToken));
        controller.expectOne(AuthenticatedUserDocument);
        store.dispatch(new Logout());
        const token = store.selectSnapshot(AuthStateSelectors.properties.token);
        expect(token).toBe(undefined);
    });

    it('it should get the authenticated user', () => {
        store.dispatch(new SetToken('test'));
        const authenticatedUser = aUser();
        controller.expectOne(AuthenticatedUserDocument).flushData({ authenticatedUser });
        store.dispatch(new GetAuthenticatedUser());
        return firstValueFrom(
            actions.pipe(
                ofActionSuccessful(GetAuthenticatedUser),
                tap(
                    () => {
                        const user = store.selectSnapshot(AuthStateSelectors.properties.user);
                        expect(user?.email).toBe(authenticatedUser.email);
                        expect(user?.id).toBe(authenticatedUser.id);
                    },
                ),
            ),
        );
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
        controller.expectOne(AuthenticatedUserDocument);
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
        const authenticatedUser = aUser({ role: UserRole.Admin });
        controller.expectOne(AuthenticatedUserDocument).flushData({ authenticatedUser });
        store.dispatch(new GetAuthenticatedUser());
        return firstValueFrom(
            actions.pipe(
                ofActionSuccessful(GetAuthenticatedUser),
                tap(
                    () => {
                        const result = store.selectSnapshot(AuthStateSelectors.isAdmin);
                        expect(result).toBe(true);
                    },
                ),
            ),
        );
    });

    it('it check if the user is a team admin', () => {
        store.dispatch(new SetToken('test'));
        const authenticatedUser = aUser({ role: UserRole.TeamManager });
        controller.expectOne(AuthenticatedUserDocument).flushData({ authenticatedUser });
        store.dispatch(new GetAuthenticatedUser());
        return firstValueFrom(
            actions.pipe(
                ofActionSuccessful(GetAuthenticatedUser),
                tap(
                    () => {
                        const result = store.selectSnapshot(AuthStateSelectors.isTeamAdmin);
                        expect(result).toBe(true);
                    },
                ),
            ),
        );
    });

    it('it check if the user is a team admin for a team', () => {
        store.dispatch(new SetToken('test'));
        const team = aTeam();
        const authenticatedUser = aUser({ role: UserRole.TeamManager, teams: [ team ] });
        controller.expectOne(AuthenticatedUserDocument).flushData({ authenticatedUser });
        store.dispatch(new GetAuthenticatedUser());
        return firstValueFrom(
            actions.pipe(
                ofActionSuccessful(GetAuthenticatedUser),
                tap(
                    () => {
                        const result = store.selectSnapshot(AuthStateSelectors.isTeamAdminForTeam(team.id));
                        expect(result).toBe(true);
                    },
                ),
            ),
        );
    });

    it('it check if the user can edit a match as admin', () => {
        store.dispatch(new SetToken('test'));
        const home_team = aTeam({ id: 'home' });
        const guest_team = aTeam({ id: 'guest' });
        const match = aMatch({ home_team, guest_team });
        const authenticatedUser = aUser({ role: UserRole.Admin });
        controller.expectOne(AuthenticatedUserDocument).flushData({ authenticatedUser });
        store.dispatch(new GetAuthenticatedUser());
        return firstValueFrom(
            actions.pipe(
                ofActionSuccessful(GetAuthenticatedUser),
                tap(
                    () => {
                        const result = store.selectSnapshot(AuthStateSelectors.canEditMatch(match));
                        expect(result).toBe(true);
                    },
                ),
            ),
        );
    });

    it('it check if the user can edit a match for home_team', () => {
        store.dispatch(new SetToken('test'));
        const home_team = aTeam({ id: 'home' });
        const guest_team = aTeam({ id: 'guest' });
        const match = aMatch({ home_team, guest_team });
        const authenticatedUser = aUser({ role: UserRole.TeamManager, teams: [ home_team ] });
        controller.expectOne(AuthenticatedUserDocument).flushData({ authenticatedUser });
        store.dispatch(new GetAuthenticatedUser());
        return firstValueFrom(
            actions.pipe(
                ofActionSuccessful(GetAuthenticatedUser),
                tap(
                    () => {
                        const result = store.selectSnapshot(AuthStateSelectors.canEditMatch(match));
                        expect(result).toBe(true);
                    },
                ),
            ),
        );
    });

    it('it check if the user can edit a match for guest_team', () => {
        store.dispatch(new SetToken('test'));
        const home_team = aTeam({ id: 'home' });
        const guest_team = aTeam({ id: 'guest' });
        const match = aMatch({ home_team, guest_team });
        const authenticatedUser = aUser({ role: UserRole.TeamManager, teams: [ guest_team ] });
        controller.expectOne(AuthenticatedUserDocument).flushData({ authenticatedUser });
        store.dispatch(new GetAuthenticatedUser());
        return firstValueFrom(
            actions.pipe(
                ofActionSuccessful(GetAuthenticatedUser),
                tap(
                    () => {
                        const result = store.selectSnapshot(AuthStateSelectors.canEditMatch(match));
                        expect(result).toBe(true);
                    },
                ),
            ),
        );
    });

});
