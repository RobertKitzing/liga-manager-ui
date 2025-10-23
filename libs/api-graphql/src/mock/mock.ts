/* eslint-disable */
/* GENERATED DO NOT EDIT */
import { apiDateGenerator, apiDateTimeGenerator, dateStringGenerator, fakeEmail } from './generators'
import { Contact, DatePeriod, Event, Match, MatchAppointment, MatchDay, Pitch, Ranking, RankingPenalty, RankingPosition, Season, Team, TeamIdPair, Tournament, User, Mutation, Query, SeasonState, TournamentState, UserLocale, UserRole } from '../gen/graphql';

export const aContact = (overrides?: Partial<Contact>): { __typename: 'Contact' } & Contact => {
    return {
        __typename: 'Contact',
        email: overrides && overrides.hasOwnProperty('email') ? overrides.email! : fakeEmail(),
        first_name: overrides && overrides.hasOwnProperty('first_name') ? overrides.first_name! : 'casus',
        last_name: overrides && overrides.hasOwnProperty('last_name') ? overrides.last_name! : 'auxilium',
        phone: overrides && overrides.hasOwnProperty('phone') ? overrides.phone! : 'turba',
    };
};

export const aDatePeriod = (overrides?: Partial<DatePeriod>): DatePeriod => {
    return {
        from: overrides && overrides.hasOwnProperty('from') ? overrides.from! : apiDateGenerator(),
        to: overrides && overrides.hasOwnProperty('to') ? overrides.to! : apiDateGenerator(),
    };
};

export const anEvent = (overrides?: Partial<Event>): { __typename: 'Event' } & Event => {
    return {
        __typename: 'Event',
        id: overrides && overrides.hasOwnProperty('id') ? overrides.id! : 'temeritas',
        occurred_at: overrides && overrides.hasOwnProperty('occurred_at') ? overrides.occurred_at! : 'adfectus',
        type: overrides && overrides.hasOwnProperty('type') ? overrides.type! : 'copiose',
    };
};

export const aMatch = (overrides?: Partial<Match>): { __typename: 'Match' } & Match => {
    return {
        __typename: 'Match',
        cancellation_reason: overrides && overrides.hasOwnProperty('cancellation_reason') ? overrides.cancellation_reason! : 'desino',
        cancelled_at: overrides && overrides.hasOwnProperty('cancelled_at') ? overrides.cancelled_at! : dateStringGenerator(),
        guest_score: overrides && overrides.hasOwnProperty('guest_score') ? overrides.guest_score! : 6016,
        guest_team: overrides && overrides.hasOwnProperty('guest_team') ? overrides.guest_team! : aTeam(),
        home_score: overrides && overrides.hasOwnProperty('home_score') ? overrides.home_score! : 192,
        home_team: overrides && overrides.hasOwnProperty('home_team') ? overrides.home_team! : aTeam(),
        id: overrides && overrides.hasOwnProperty('id') ? overrides.id! : 'venustas',
        kickoff: overrides && overrides.hasOwnProperty('kickoff') ? overrides.kickoff! : apiDateTimeGenerator(),
        pitch: overrides && overrides.hasOwnProperty('pitch') ? overrides.pitch! : aPitch(),
    };
};

export const aMatchAppointment = (overrides?: Partial<MatchAppointment>): MatchAppointment => {
    return {
        kickoff: overrides && overrides.hasOwnProperty('kickoff') ? overrides.kickoff! : apiDateTimeGenerator(),
        pitch_id: overrides && overrides.hasOwnProperty('pitch_id') ? overrides.pitch_id! : 'canonicus',
        unavailable_team_ids: overrides && overrides.hasOwnProperty('unavailable_team_ids') ? overrides.unavailable_team_ids! : ['cruentus'],
    };
};

export const aMatchDay = (overrides?: Partial<MatchDay>): { __typename: 'MatchDay' } & MatchDay => {
    return {
        __typename: 'MatchDay',
        end_date: overrides && overrides.hasOwnProperty('end_date') ? overrides.end_date! : 'volutabrum',
        id: overrides && overrides.hasOwnProperty('id') ? overrides.id! : 'timor',
        matches: overrides && overrides.hasOwnProperty('matches') ? overrides.matches! : [aMatch()],
        number: overrides && overrides.hasOwnProperty('number') ? overrides.number! : 6472,
        start_date: overrides && overrides.hasOwnProperty('start_date') ? overrides.start_date! : 'tristis',
    };
};

export const aPitch = (overrides?: Partial<Pitch>): { __typename: 'Pitch' } & Pitch => {
    return {
        __typename: 'Pitch',
        contact: overrides && overrides.hasOwnProperty('contact') ? overrides.contact! : aContact(),
        id: overrides && overrides.hasOwnProperty('id') ? overrides.id! : 'deleo',
        label: overrides && overrides.hasOwnProperty('label') ? overrides.label! : 'vulariter',
        location_latitude: overrides && overrides.hasOwnProperty('location_latitude') ? overrides.location_latitude! : 6.9,
        location_longitude: overrides && overrides.hasOwnProperty('location_longitude') ? overrides.location_longitude! : 4.8,
    };
};

export const aRanking = (overrides?: Partial<Ranking>): { __typename: 'Ranking' } & Ranking => {
    return {
        __typename: 'Ranking',
        penalties: overrides && overrides.hasOwnProperty('penalties') ? overrides.penalties! : [aRankingPenalty()],
        positions: overrides && overrides.hasOwnProperty('positions') ? overrides.positions! : [aRankingPosition()],
        updated_at: overrides && overrides.hasOwnProperty('updated_at') ? overrides.updated_at! : 'virgo',
    };
};

export const aRankingPenalty = (overrides?: Partial<RankingPenalty>): { __typename: 'RankingPenalty' } & RankingPenalty => {
    return {
        __typename: 'RankingPenalty',
        created_at: overrides && overrides.hasOwnProperty('created_at') ? overrides.created_at! : 'delectus',
        id: overrides && overrides.hasOwnProperty('id') ? overrides.id! : 'commodo',
        points: overrides && overrides.hasOwnProperty('points') ? overrides.points! : 2510,
        reason: overrides && overrides.hasOwnProperty('reason') ? overrides.reason! : 'supra',
        team: overrides && overrides.hasOwnProperty('team') ? overrides.team! : aTeam(),
    };
};

export const aRankingPosition = (overrides?: Partial<RankingPosition>): { __typename: 'RankingPosition' } & RankingPosition => {
    return {
        __typename: 'RankingPosition',
        conceded_goals: overrides && overrides.hasOwnProperty('conceded_goals') ? overrides.conceded_goals! : 7103,
        draws: overrides && overrides.hasOwnProperty('draws') ? overrides.draws! : 1680,
        id: overrides && overrides.hasOwnProperty('id') ? overrides.id! : 'colligo',
        losses: overrides && overrides.hasOwnProperty('losses') ? overrides.losses! : 1028,
        matches: overrides && overrides.hasOwnProperty('matches') ? overrides.matches! : 131,
        number: overrides && overrides.hasOwnProperty('number') ? overrides.number! : 7801,
        points: overrides && overrides.hasOwnProperty('points') ? overrides.points! : 7879,
        scored_goals: overrides && overrides.hasOwnProperty('scored_goals') ? overrides.scored_goals! : 1107,
        sort_index: overrides && overrides.hasOwnProperty('sort_index') ? overrides.sort_index! : 1619,
        team: overrides && overrides.hasOwnProperty('team') ? overrides.team! : aTeam(),
        wins: overrides && overrides.hasOwnProperty('wins') ? overrides.wins! : 9450,
    };
};

export const aSeason = (overrides?: Partial<Season>): { __typename: 'Season' } & Season => {
    return {
        __typename: 'Season',
        id: overrides && overrides.hasOwnProperty('id') ? overrides.id! : 'attonbitus',
        match_day_count: overrides && overrides.hasOwnProperty('match_day_count') ? overrides.match_day_count! : 9448,
        match_days: overrides && overrides.hasOwnProperty('match_days') ? overrides.match_days! : [aMatchDay()],
        name: overrides && overrides.hasOwnProperty('name') ? overrides.name! : 'adficio',
        ranking: overrides && overrides.hasOwnProperty('ranking') ? overrides.ranking! : aRanking(),
        state: overrides && overrides.hasOwnProperty('state') ? overrides.state! : SeasonState.Ended,
        team_count: overrides && overrides.hasOwnProperty('team_count') ? overrides.team_count! : 3359,
        teams: overrides && overrides.hasOwnProperty('teams') ? overrides.teams! : [aTeam()],
    };
};

export const aTeam = (overrides?: Partial<Team>): { __typename: 'Team' } & Team => {
    return {
        __typename: 'Team',
        contact: overrides && overrides.hasOwnProperty('contact') ? overrides.contact! : aContact(),
        created_at: overrides && overrides.hasOwnProperty('created_at') ? overrides.created_at! : 'terra',
        id: overrides && overrides.hasOwnProperty('id') ? overrides.id! : 'molestiae',
        logo_id: overrides && overrides.hasOwnProperty('logo_id') ? overrides.logo_id! : 'suspendo',
        logo_path: overrides && overrides.hasOwnProperty('logo_path') ? overrides.logo_path! : 'admiratio',
        name: overrides && overrides.hasOwnProperty('name') ? overrides.name! : 'voluptates',
    };
};

export const aTeamIdPair = (overrides?: Partial<TeamIdPair>): TeamIdPair => {
    return {
        guest_team_id: overrides && overrides.hasOwnProperty('guest_team_id') ? overrides.guest_team_id! : 'totidem',
        home_team_id: overrides && overrides.hasOwnProperty('home_team_id') ? overrides.home_team_id! : 'considero',
    };
};

export const aTournament = (overrides?: Partial<Tournament>): { __typename: 'Tournament' } & Tournament => {
    return {
        __typename: 'Tournament',
        id: overrides && overrides.hasOwnProperty('id') ? overrides.id! : 'saepe',
        name: overrides && overrides.hasOwnProperty('name') ? overrides.name! : 'volubilis',
        rounds: overrides && overrides.hasOwnProperty('rounds') ? overrides.rounds! : [aMatchDay()],
        state: overrides && overrides.hasOwnProperty('state') ? overrides.state! : TournamentState.Ended,
    };
};

export const aUser = (overrides?: Partial<User>): { __typename: 'User' } & User => {
    return {
        __typename: 'User',
        email: overrides && overrides.hasOwnProperty('email') ? overrides.email! : fakeEmail(),
        first_name: overrides && overrides.hasOwnProperty('first_name') ? overrides.first_name! : 'comis',
        id: overrides && overrides.hasOwnProperty('id') ? overrides.id! : 'suscipio',
        last_name: overrides && overrides.hasOwnProperty('last_name') ? overrides.last_name! : 'sulum',
        locale: overrides && overrides.hasOwnProperty('locale') ? overrides.locale! : UserLocale.De,
        role: overrides && overrides.hasOwnProperty('role') ? overrides.role! : UserRole.Admin,
        teams: overrides && overrides.hasOwnProperty('teams') ? overrides.teams! : [aTeam()],
    };
};

export const aMutation = (overrides?: Partial<Mutation>): { __typename: 'mutation' } & Mutation => {
    return {
        __typename: 'mutation',
        addRankingPenalty: overrides && overrides.hasOwnProperty('addRankingPenalty') ? overrides.addRankingPenalty! : true,
        addTeamToSeason: overrides && overrides.hasOwnProperty('addTeamToSeason') ? overrides.addTeamToSeason! : true,
        cancelMatch: overrides && overrides.hasOwnProperty('cancelMatch') ? overrides.cancelMatch! : false,
        changeUserPassword: overrides && overrides.hasOwnProperty('changeUserPassword') ? overrides.changeUserPassword! : false,
        createMatch: overrides && overrides.hasOwnProperty('createMatch') ? overrides.createMatch! : false,
        createMatchesForSeason: overrides && overrides.hasOwnProperty('createMatchesForSeason') ? overrides.createMatchesForSeason! : true,
        createPitch: overrides && overrides.hasOwnProperty('createPitch') ? overrides.createPitch! : false,
        createSeason: overrides && overrides.hasOwnProperty('createSeason') ? overrides.createSeason! : true,
        createTeam: overrides && overrides.hasOwnProperty('createTeam') ? overrides.createTeam! : false,
        createTournament: overrides && overrides.hasOwnProperty('createTournament') ? overrides.createTournament! : true,
        createUser: overrides && overrides.hasOwnProperty('createUser') ? overrides.createUser! : false,
        deletePitch: overrides && overrides.hasOwnProperty('deletePitch') ? overrides.deletePitch! : false,
        deleteSeason: overrides && overrides.hasOwnProperty('deleteSeason') ? overrides.deleteSeason! : false,
        deleteTeam: overrides && overrides.hasOwnProperty('deleteTeam') ? overrides.deleteTeam! : false,
        deleteTournament: overrides && overrides.hasOwnProperty('deleteTournament') ? overrides.deleteTournament! : true,
        deleteUser: overrides && overrides.hasOwnProperty('deleteUser') ? overrides.deleteUser! : true,
        endSeason: overrides && overrides.hasOwnProperty('endSeason') ? overrides.endSeason! : true,
        endTournament: overrides && overrides.hasOwnProperty('endTournament') ? overrides.endTournament! : true,
        invalidateAccessTokens: overrides && overrides.hasOwnProperty('invalidateAccessTokens') ? overrides.invalidateAccessTokens! : false,
        locateMatch: overrides && overrides.hasOwnProperty('locateMatch') ? overrides.locateMatch! : false,
        removeRankingPenalty: overrides && overrides.hasOwnProperty('removeRankingPenalty') ? overrides.removeRankingPenalty! : true,
        removeTeamFromSeason: overrides && overrides.hasOwnProperty('removeTeamFromSeason') ? overrides.removeTeamFromSeason! : false,
        renameTeam: overrides && overrides.hasOwnProperty('renameTeam') ? overrides.renameTeam! : false,
        replaceTeamInSeason: overrides && overrides.hasOwnProperty('replaceTeamInSeason') ? overrides.replaceTeamInSeason! : true,
        rescheduleMatchDay: overrides && overrides.hasOwnProperty('rescheduleMatchDay') ? overrides.rescheduleMatchDay! : true,
        scheduleAllMatchesForMatchDay: overrides && overrides.hasOwnProperty('scheduleAllMatchesForMatchDay') ? overrides.scheduleAllMatchesForMatchDay! : true,
        scheduleAllMatchesForSeason: overrides && overrides.hasOwnProperty('scheduleAllMatchesForSeason') ? overrides.scheduleAllMatchesForSeason! : false,
        scheduleMatch: overrides && overrides.hasOwnProperty('scheduleMatch') ? overrides.scheduleMatch! : true,
        sendInviteMail: overrides && overrides.hasOwnProperty('sendInviteMail') ? overrides.sendInviteMail! : false,
        sendPasswordResetMail: overrides && overrides.hasOwnProperty('sendPasswordResetMail') ? overrides.sendPasswordResetMail! : false,
        setTournamentRound: overrides && overrides.hasOwnProperty('setTournamentRound') ? overrides.setTournamentRound! : false,
        startSeason: overrides && overrides.hasOwnProperty('startSeason') ? overrides.startSeason! : true,
        startTournament: overrides && overrides.hasOwnProperty('startTournament') ? overrides.startTournament! : false,
        submitMatchResult: overrides && overrides.hasOwnProperty('submitMatchResult') ? overrides.submitMatchResult! : false,
        updatePitchContact: overrides && overrides.hasOwnProperty('updatePitchContact') ? overrides.updatePitchContact! : false,
        updateTeamContact: overrides && overrides.hasOwnProperty('updateTeamContact') ? overrides.updateTeamContact! : true,
        updateUser: overrides && overrides.hasOwnProperty('updateUser') ? overrides.updateUser! : true,
    };
};

export const aQuery = (overrides?: Partial<Query>): { __typename: 'query' } & Query => {
    return {
        __typename: 'query',
        allPitches: overrides && overrides.hasOwnProperty('allPitches') ? overrides.allPitches! : [aPitch()],
        allSeasons: overrides && overrides.hasOwnProperty('allSeasons') ? overrides.allSeasons! : [aSeason()],
        allTeams: overrides && overrides.hasOwnProperty('allTeams') ? overrides.allTeams! : [aTeam()],
        allTournaments: overrides && overrides.hasOwnProperty('allTournaments') ? overrides.allTournaments! : [aTournament()],
        allUsers: overrides && overrides.hasOwnProperty('allUsers') ? overrides.allUsers! : [aUser()],
        authenticatedUser: overrides && overrides.hasOwnProperty('authenticatedUser') ? overrides.authenticatedUser! : aUser(),
        event: overrides && overrides.hasOwnProperty('event') ? overrides.event! : anEvent(),
        latestEvents: overrides && overrides.hasOwnProperty('latestEvents') ? overrides.latestEvents! : [anEvent()],
        match: overrides && overrides.hasOwnProperty('match') ? overrides.match! : aMatch(),
        matchesByKickoff: overrides && overrides.hasOwnProperty('matchesByKickoff') ? overrides.matchesByKickoff! : [aMatch()],
        pitch: overrides && overrides.hasOwnProperty('pitch') ? overrides.pitch! : aPitch(),
        season: overrides && overrides.hasOwnProperty('season') ? overrides.season! : aSeason(),
        team: overrides && overrides.hasOwnProperty('team') ? overrides.team! : aTeam(),
        teamsByPattern: overrides && overrides.hasOwnProperty('teamsByPattern') ? overrides.teamsByPattern! : [aTeam()],
        tournament: overrides && overrides.hasOwnProperty('tournament') ? overrides.tournament! : aTournament(),
    };
};
