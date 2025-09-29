import { createPropertySelectors, createSelector, Selector } from '@ngxs/store';
import { AuthState, AuthStateModel } from './auth.state';
import { AuthenticatedUserQuery, Match, UserRole } from '@liga-manager-api/graphql';

export class AuthStateSelectors {

    static properties = createPropertySelectors<AuthStateModel>(AuthState);

    @Selector([AuthStateSelectors.properties.user])
    static isAdmin(user: AuthenticatedUserQuery['authenticatedUser']) {
        return user?.role === UserRole.Admin;
    }

    @Selector([AuthStateSelectors.properties.user])
    static isTeamAdmin(user: AuthenticatedUserQuery['authenticatedUser']) {
        return user?.role === UserRole.TeamManager || user?.role === UserRole.Admin;
    }

    static isTeamAdminForTeam(teamId: string) {
        return createSelector(
            [
                AuthStateSelectors.isTeamAdmin,
                AuthStateSelectors.properties.user,
            ],
            (isTeamAdmin, user) => {
                return isTeamAdmin && !!user?.teams?.find((u) => u?.id === teamId);
            });
    }

    static canEditMatch(match: Match) {
        return createSelector(
            [
                AuthStateSelectors.isAdmin,
                AuthStateSelectors.isTeamAdminForTeam(match.home_team.id),
                AuthStateSelectors.isTeamAdminForTeam(match.guest_team.id),
            ],
            (isAdmin, isTeamAdminForHomeTeam, isTeamAdminForGuestTeam) => {
                return isAdmin || isTeamAdminForHomeTeam || isTeamAdminForGuestTeam;
            });
    }

}
