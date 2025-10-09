/* eslint-disable */
import { DocumentTypeDecoration } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  Date: { input: any; output: any; }
  DateTime: { input: any; output: any; }
};

export type Contact = {
  __typename?: 'Contact';
  email: Scalars['String']['output'];
  first_name: Scalars['String']['output'];
  last_name: Scalars['String']['output'];
  phone: Scalars['String']['output'];
};

export type DatePeriod = {
  from: Scalars['Date']['input'];
  to: Scalars['Date']['input'];
};

export type Event = {
  __typename?: 'Event';
  id: Scalars['String']['output'];
  occurred_at: Scalars['String']['output'];
  type: Scalars['String']['output'];
};

export type Match = {
  __typename?: 'Match';
  cancellation_reason?: Maybe<Scalars['String']['output']>;
  cancelled_at?: Maybe<Scalars['String']['output']>;
  guest_score?: Maybe<Scalars['Int']['output']>;
  guest_team: Team;
  home_score?: Maybe<Scalars['Int']['output']>;
  home_team: Team;
  id: Scalars['String']['output'];
  kickoff?: Maybe<Scalars['DateTime']['output']>;
  pitch?: Maybe<Pitch>;
};

export type MatchAppointment = {
  kickoff: Scalars['DateTime']['input'];
  pitch_id: Scalars['String']['input'];
  unavailable_team_ids: Array<InputMaybe<Scalars['String']['input']>>;
};

export type MatchDay = {
  __typename?: 'MatchDay';
  end_date: Scalars['String']['output'];
  id: Scalars['String']['output'];
  matches?: Maybe<Array<Maybe<Match>>>;
  number: Scalars['Int']['output'];
  start_date: Scalars['String']['output'];
};

export type Pitch = {
  __typename?: 'Pitch';
  contact?: Maybe<Contact>;
  id: Scalars['String']['output'];
  label: Scalars['String']['output'];
  location_latitude: Scalars['Float']['output'];
  location_longitude: Scalars['Float']['output'];
};

export type Ranking = {
  __typename?: 'Ranking';
  penalties?: Maybe<Array<Maybe<RankingPenalty>>>;
  positions?: Maybe<Array<Maybe<RankingPosition>>>;
  updated_at?: Maybe<Scalars['String']['output']>;
};

export type RankingPenalty = {
  __typename?: 'RankingPenalty';
  created_at: Scalars['String']['output'];
  id: Scalars['String']['output'];
  points: Scalars['Int']['output'];
  reason: Scalars['String']['output'];
  team: Team;
};

export type RankingPosition = {
  __typename?: 'RankingPosition';
  conceded_goals: Scalars['Int']['output'];
  draws: Scalars['Int']['output'];
  id: Scalars['String']['output'];
  losses: Scalars['Int']['output'];
  matches: Scalars['Int']['output'];
  number: Scalars['Int']['output'];
  points: Scalars['Int']['output'];
  scored_goals: Scalars['Int']['output'];
  sort_index: Scalars['Int']['output'];
  team: Team;
  wins: Scalars['Int']['output'];
};

export type Season = {
  __typename?: 'Season';
  id: Scalars['String']['output'];
  match_day_count: Scalars['Int']['output'];
  match_days?: Maybe<Array<Maybe<MatchDay>>>;
  name: Scalars['String']['output'];
  ranking?: Maybe<Ranking>;
  state: SeasonState;
  team_count: Scalars['Int']['output'];
  teams?: Maybe<Array<Maybe<Team>>>;
};

export enum SeasonState {
  Ended = 'ended',
  Preparation = 'preparation',
  Progress = 'progress'
}

export type Team = {
  __typename?: 'Team';
  contact?: Maybe<Contact>;
  created_at: Scalars['String']['output'];
  id: Scalars['String']['output'];
  logo_id?: Maybe<Scalars['String']['output']>;
  logo_path?: Maybe<Scalars['String']['output']>;
  name: Scalars['String']['output'];
};

export type TeamIdPair = {
  guest_team_id: Scalars['String']['input'];
  home_team_id: Scalars['String']['input'];
};

export type Tournament = {
  __typename?: 'Tournament';
  id: Scalars['String']['output'];
  name: Scalars['String']['output'];
  rounds?: Maybe<Array<Maybe<MatchDay>>>;
  state: TournamentState;
};

export enum TournamentState {
  Ended = 'ended',
  Preparation = 'preparation',
  Progress = 'progress'
}

export type User = {
  __typename?: 'User';
  email: Scalars['String']['output'];
  first_name: Scalars['String']['output'];
  id: Scalars['String']['output'];
  last_name: Scalars['String']['output'];
  locale?: Maybe<UserLocale>;
  role: UserRole;
  teams?: Maybe<Array<Maybe<Team>>>;
};

export enum UserLocale {
  De = 'de',
  En = 'en'
}

export enum UserRole {
  Admin = 'admin',
  TeamManager = 'team_manager'
}

export type Mutation = {
  __typename?: 'mutation';
  addRankingPenalty?: Maybe<Scalars['Boolean']['output']>;
  addTeamToSeason?: Maybe<Scalars['Boolean']['output']>;
  cancelMatch?: Maybe<Scalars['Boolean']['output']>;
  changeUserPassword?: Maybe<Scalars['Boolean']['output']>;
  createMatchesForSeason?: Maybe<Scalars['Boolean']['output']>;
  createPitch?: Maybe<Scalars['Boolean']['output']>;
  createSeason?: Maybe<Scalars['Boolean']['output']>;
  createTeam?: Maybe<Scalars['Boolean']['output']>;
  createTournament?: Maybe<Scalars['Boolean']['output']>;
  createUser?: Maybe<Scalars['Boolean']['output']>;
  deletePitch?: Maybe<Scalars['Boolean']['output']>;
  deleteSeason?: Maybe<Scalars['Boolean']['output']>;
  deleteTeam?: Maybe<Scalars['Boolean']['output']>;
  deleteTournament?: Maybe<Scalars['Boolean']['output']>;
  deleteUser?: Maybe<Scalars['Boolean']['output']>;
  endSeason?: Maybe<Scalars['Boolean']['output']>;
  endTournament?: Maybe<Scalars['Boolean']['output']>;
  invalidateAccessTokens?: Maybe<Scalars['Boolean']['output']>;
  locateMatch?: Maybe<Scalars['Boolean']['output']>;
  removeRankingPenalty?: Maybe<Scalars['Boolean']['output']>;
  removeTeamFromSeason?: Maybe<Scalars['Boolean']['output']>;
  renameTeam?: Maybe<Scalars['Boolean']['output']>;
  replaceTeamInSeason?: Maybe<Scalars['Boolean']['output']>;
  rescheduleMatchDay?: Maybe<Scalars['Boolean']['output']>;
  scheduleAllMatchesForMatchDay?: Maybe<Scalars['Boolean']['output']>;
  scheduleAllMatchesForSeason?: Maybe<Scalars['Boolean']['output']>;
  scheduleMatch?: Maybe<Scalars['Boolean']['output']>;
  sendInviteMail?: Maybe<Scalars['Boolean']['output']>;
  sendPasswordResetMail?: Maybe<Scalars['Boolean']['output']>;
  setTournamentRound?: Maybe<Scalars['Boolean']['output']>;
  startSeason?: Maybe<Scalars['Boolean']['output']>;
  startTournament?: Maybe<Scalars['Boolean']['output']>;
  submitMatchResult?: Maybe<Scalars['Boolean']['output']>;
  updatePitchContact?: Maybe<Scalars['Boolean']['output']>;
  updateTeamContact?: Maybe<Scalars['Boolean']['output']>;
  updateUser?: Maybe<Scalars['Boolean']['output']>;
};


export type MutationAddRankingPenaltyArgs = {
  id?: InputMaybe<Scalars['String']['input']>;
  points: Scalars['Int']['input'];
  reason: Scalars['String']['input'];
  season_id: Scalars['String']['input'];
  team_id: Scalars['String']['input'];
};


export type MutationAddTeamToSeasonArgs = {
  season_id: Scalars['String']['input'];
  team_id: Scalars['String']['input'];
};


export type MutationCancelMatchArgs = {
  match_id: Scalars['String']['input'];
  reason: Scalars['String']['input'];
};


export type MutationChangeUserPasswordArgs = {
  new_password: Scalars['String']['input'];
};


export type MutationCreateMatchesForSeasonArgs = {
  dates: Array<InputMaybe<DatePeriod>>;
  season_id: Scalars['String']['input'];
};


export type MutationCreatePitchArgs = {
  id?: InputMaybe<Scalars['String']['input']>;
  label: Scalars['String']['input'];
  latitude: Scalars['Float']['input'];
  longitude: Scalars['Float']['input'];
};


export type MutationCreateSeasonArgs = {
  id?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
};


export type MutationCreateTeamArgs = {
  id?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
};


export type MutationCreateTournamentArgs = {
  id?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
};


export type MutationCreateUserArgs = {
  email: Scalars['String']['input'];
  first_name: Scalars['String']['input'];
  id?: InputMaybe<Scalars['String']['input']>;
  last_name: Scalars['String']['input'];
  locale?: InputMaybe<Scalars['String']['input']>;
  password?: InputMaybe<Scalars['String']['input']>;
  role: Scalars['String']['input'];
  team_ids: Array<InputMaybe<Scalars['String']['input']>>;
};


export type MutationDeletePitchArgs = {
  pitch_id: Scalars['String']['input'];
};


export type MutationDeleteSeasonArgs = {
  season_id: Scalars['String']['input'];
};


export type MutationDeleteTeamArgs = {
  team_id: Scalars['String']['input'];
};


export type MutationDeleteTournamentArgs = {
  tournament_id: Scalars['String']['input'];
};


export type MutationDeleteUserArgs = {
  user_id: Scalars['String']['input'];
};


export type MutationEndSeasonArgs = {
  season_id: Scalars['String']['input'];
};


export type MutationEndTournamentArgs = {
  tournament_id: Scalars['String']['input'];
};


export type MutationLocateMatchArgs = {
  match_id: Scalars['String']['input'];
  pitch_id: Scalars['String']['input'];
};


export type MutationRemoveRankingPenaltyArgs = {
  ranking_penalty_id: Scalars['String']['input'];
  season_id: Scalars['String']['input'];
};


export type MutationRemoveTeamFromSeasonArgs = {
  season_id: Scalars['String']['input'];
  team_id: Scalars['String']['input'];
};


export type MutationRenameTeamArgs = {
  new_name: Scalars['String']['input'];
  team_id: Scalars['String']['input'];
};


export type MutationReplaceTeamInSeasonArgs = {
  current_team_id: Scalars['String']['input'];
  replacement_team_id: Scalars['String']['input'];
  season_id: Scalars['String']['input'];
};


export type MutationRescheduleMatchDayArgs = {
  date_period: DatePeriod;
  match_day_id: Scalars['String']['input'];
};


export type MutationScheduleAllMatchesForMatchDayArgs = {
  match_appointments: Array<InputMaybe<MatchAppointment>>;
  match_day_id: Scalars['String']['input'];
};


export type MutationScheduleAllMatchesForSeasonArgs = {
  match_appointments: Array<InputMaybe<MatchAppointment>>;
  season_id: Scalars['String']['input'];
};


export type MutationScheduleMatchArgs = {
  kickoff?: InputMaybe<Scalars['DateTime']['input']>;
  match_day_id?: InputMaybe<Scalars['String']['input']>;
  match_id: Scalars['String']['input'];
};


export type MutationSendInviteMailArgs = {
  target_path: Scalars['String']['input'];
  user_id: Scalars['String']['input'];
};


export type MutationSendPasswordResetMailArgs = {
  email: Scalars['String']['input'];
  target_path: Scalars['String']['input'];
};


export type MutationSetTournamentRoundArgs = {
  date_period: DatePeriod;
  round: Scalars['Int']['input'];
  team_id_pairs: Array<InputMaybe<TeamIdPair>>;
  tournament_id: Scalars['String']['input'];
};


export type MutationStartSeasonArgs = {
  season_id: Scalars['String']['input'];
};


export type MutationStartTournamentArgs = {
  tournament_id: Scalars['String']['input'];
};


export type MutationSubmitMatchResultArgs = {
  guest_score: Scalars['Int']['input'];
  home_score: Scalars['Int']['input'];
  match_id: Scalars['String']['input'];
};


export type MutationUpdatePitchContactArgs = {
  email: Scalars['String']['input'];
  first_name: Scalars['String']['input'];
  last_name: Scalars['String']['input'];
  phone: Scalars['String']['input'];
  pitch_id: Scalars['String']['input'];
};


export type MutationUpdateTeamContactArgs = {
  email: Scalars['String']['input'];
  first_name: Scalars['String']['input'];
  last_name: Scalars['String']['input'];
  phone: Scalars['String']['input'];
  team_id: Scalars['String']['input'];
};


export type MutationUpdateUserArgs = {
  email?: InputMaybe<Scalars['String']['input']>;
  first_name?: InputMaybe<Scalars['String']['input']>;
  last_name?: InputMaybe<Scalars['String']['input']>;
  locale?: InputMaybe<Scalars['String']['input']>;
  role?: InputMaybe<Scalars['String']['input']>;
  team_ids?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  user_id: Scalars['String']['input'];
};

export type Query = {
  __typename?: 'query';
  allPitches?: Maybe<Array<Maybe<Pitch>>>;
  /** Get a list of all seasons */
  allSeasons?: Maybe<Array<Maybe<Season>>>;
  allTeams?: Maybe<Array<Maybe<Team>>>;
  allTournaments?: Maybe<Array<Maybe<Tournament>>>;
  allUsers?: Maybe<Array<Maybe<User>>>;
  authenticatedUser?: Maybe<User>;
  event?: Maybe<Event>;
  latestEvents?: Maybe<Array<Maybe<Event>>>;
  match?: Maybe<Match>;
  matchesByKickoff?: Maybe<Array<Maybe<Match>>>;
  pitch?: Maybe<Pitch>;
  /** Get a single season */
  season?: Maybe<Season>;
  team?: Maybe<Team>;
  teamsByPattern?: Maybe<Array<Maybe<Team>>>;
  tournament?: Maybe<Tournament>;
};


export type QueryEventArgs = {
  id: Scalars['String']['input'];
};


export type QueryLatestEventsArgs = {
  end_date?: InputMaybe<Scalars['Date']['input']>;
  start_date?: InputMaybe<Scalars['Date']['input']>;
  type?: InputMaybe<Scalars['String']['input']>;
};


export type QueryMatchArgs = {
  id: Scalars['String']['input'];
};


export type QueryMatchesByKickoffArgs = {
  max_date?: InputMaybe<Scalars['DateTime']['input']>;
  min_date?: InputMaybe<Scalars['DateTime']['input']>;
};


export type QueryPitchArgs = {
  id: Scalars['String']['input'];
};


export type QuerySeasonArgs = {
  id: Scalars['String']['input'];
};


export type QueryTeamArgs = {
  id: Scalars['String']['input'];
};


export type QueryTeamsByPatternArgs = {
  pattern: Scalars['String']['input'];
};


export type QueryTournamentArgs = {
  id: Scalars['String']['input'];
};

export type MatchFragment = { __typename?: 'Match', id: string, home_score?: number | null, guest_score?: number | null, kickoff?: any | null, cancelled_at?: string | null, cancellation_reason?: string | null, home_team: (
    { __typename?: 'Team' }
    & { ' $fragmentRefs'?: { 'TeamFragment': TeamFragment } }
  ), guest_team: (
    { __typename?: 'Team' }
    & { ' $fragmentRefs'?: { 'TeamFragment': TeamFragment } }
  ), pitch?: (
    { __typename?: 'Pitch' }
    & { ' $fragmentRefs'?: { 'PitchFragment': PitchFragment } }
  ) | null } & { ' $fragmentName'?: 'MatchFragment' };

export type MatchDayFragment = { __typename?: 'MatchDay', id: string, number: number, start_date: string, end_date: string, matches?: Array<(
    { __typename?: 'Match' }
    & { ' $fragmentRefs'?: { 'MatchFragment': MatchFragment } }
  ) | null> | null } & { ' $fragmentName'?: 'MatchDayFragment' };

export type PitchFragment = { __typename?: 'Pitch', id: string, label: string, location_longitude: number, location_latitude: number, contact?: (
    { __typename?: 'Contact' }
    & { ' $fragmentRefs'?: { 'ContactFragment': ContactFragment } }
  ) | null } & { ' $fragmentName'?: 'PitchFragment' };

export type TeamFragment = { __typename?: 'Team', id: string, name: string, logo_id?: string | null, logo_path?: string | null, created_at: string, contact?: (
    { __typename?: 'Contact' }
    & { ' $fragmentRefs'?: { 'ContactFragment': ContactFragment } }
  ) | null } & { ' $fragmentName'?: 'TeamFragment' };

export type ContactFragment = { __typename?: 'Contact', first_name: string, last_name: string, phone: string, email: string } & { ' $fragmentName'?: 'ContactFragment' };

export type SeasonFragment = { __typename?: 'Season', id: string, name: string, state: SeasonState, teams?: Array<(
    { __typename?: 'Team' }
    & { ' $fragmentRefs'?: { 'TeamFragment': TeamFragment } }
  ) | null> | null, match_days?: Array<(
    { __typename?: 'MatchDay' }
    & { ' $fragmentRefs'?: { 'MatchDayFragment': MatchDayFragment } }
  ) | null> | null } & { ' $fragmentName'?: 'SeasonFragment' };

export type AllSeasonsFragment = { __typename?: 'Season', id: string, name: string, state: SeasonState, match_days?: Array<{ __typename?: 'MatchDay', number: number, start_date: string, end_date: string } | null> | null } & { ' $fragmentName'?: 'AllSeasonsFragment' };

export type AllSeasonsHoFFragment = { __typename?: 'Season', id: string, name: string, state: SeasonState, match_days?: Array<{ __typename?: 'MatchDay', number: number, start_date: string } | null> | null, ranking?: { __typename?: 'Ranking', positions?: Array<{ __typename?: 'RankingPosition', sort_index: number, team: (
        { __typename?: 'Team' }
        & { ' $fragmentRefs'?: { 'TeamFragment': TeamFragment } }
      ) } | null> | null } | null } & { ' $fragmentName'?: 'AllSeasonsHoFFragment' };

export type AllSeasonsCalendarFragment = { __typename?: 'Season', id: string, name: string, state: SeasonState, match_days?: Array<(
    { __typename?: 'MatchDay' }
    & { ' $fragmentRefs'?: { 'MatchDayFragment': MatchDayFragment } }
  ) | null> | null } & { ' $fragmentName'?: 'AllSeasonsCalendarFragment' };

export type AllTournamentsFragment = { __typename?: 'Tournament', id: string, name: string, state: TournamentState } & { ' $fragmentName'?: 'AllTournamentsFragment' };

export type AllTournamentsHoFFragment = { __typename?: 'Tournament', id: string, name: string, state: TournamentState, rounds?: Array<(
    { __typename?: 'MatchDay' }
    & { ' $fragmentRefs'?: { 'MatchDayFragment': MatchDayFragment } }
  ) | null> | null } & { ' $fragmentName'?: 'AllTournamentsHoFFragment' };

export type AllTournamentsCalendarFragment = { __typename?: 'Tournament', id: string, name: string, state: TournamentState, rounds?: Array<(
    { __typename?: 'MatchDay' }
    & { ' $fragmentRefs'?: { 'MatchDayFragment': MatchDayFragment } }
  ) | null> | null } & { ' $fragmentName'?: 'AllTournamentsCalendarFragment' };

export type TournamentFragment = { __typename?: 'Tournament', id: string, name: string, state: TournamentState, rounds?: Array<(
    { __typename?: 'MatchDay' }
    & { ' $fragmentRefs'?: { 'MatchDayFragment': MatchDayFragment } }
  ) | null> | null } & { ' $fragmentName'?: 'TournamentFragment' };

export type UserFragment = { __typename?: 'User', id: string, email: string, role: UserRole, first_name: string, last_name: string, teams?: Array<(
    { __typename?: 'Team' }
    & { ' $fragmentRefs'?: { 'TeamFragment': TeamFragment } }
  ) | null> | null } & { ' $fragmentName'?: 'UserFragment' };

export type EventFragment = { __typename?: 'Event', id: string, occurred_at: string, type: string } & { ' $fragmentName'?: 'EventFragment' };

export type RankingFragment = { __typename?: 'Season', id: string, ranking?: { __typename?: 'Ranking', updated_at?: string | null, positions?: Array<{ __typename?: 'RankingPosition', sort_index: number, number: number, matches: number, wins: number, draws: number, losses: number, scored_goals: number, conceded_goals: number, points: number, team: (
        { __typename?: 'Team' }
        & { ' $fragmentRefs'?: { 'TeamFragment': TeamFragment } }
      ) } | null> | null, penalties?: Array<(
      { __typename?: 'RankingPenalty' }
      & { ' $fragmentRefs'?: { 'PenaltyFragment': PenaltyFragment } }
    ) | null> | null } | null } & { ' $fragmentName'?: 'RankingFragment' };

export type PenaltyFragment = { __typename?: 'RankingPenalty', id: string, reason: string, created_at: string, points: number, team: (
    { __typename?: 'Team' }
    & { ' $fragmentRefs'?: { 'TeamFragment': TeamFragment } }
  ) } & { ' $fragmentName'?: 'PenaltyFragment' };

export type SubmitResultMutationVariables = Exact<{
  match_id: Scalars['String']['input'];
  home_score: Scalars['Int']['input'];
  guest_score: Scalars['Int']['input'];
}>;


export type SubmitResultMutation = { __typename?: 'mutation', submitMatchResult?: boolean | null };

export type ScheduleMatchMutationVariables = Exact<{
  match_id: Scalars['String']['input'];
  kickoff: Scalars['DateTime']['input'];
}>;


export type ScheduleMatchMutation = { __typename?: 'mutation', scheduleMatch?: boolean | null };

export type LocateMatchMutationVariables = Exact<{
  match_id: Scalars['String']['input'];
  pitch_id: Scalars['String']['input'];
}>;


export type LocateMatchMutation = { __typename?: 'mutation', locateMatch?: boolean | null };

export type CancelMatchMutationVariables = Exact<{
  match_id: Scalars['String']['input'];
  reason: Scalars['String']['input'];
}>;


export type CancelMatchMutation = { __typename?: 'mutation', cancelMatch?: boolean | null };

export type ScheduleAllMatchesForSeasonMutationVariables = Exact<{
  season_id: Scalars['String']['input'];
  match_appointments: Array<InputMaybe<MatchAppointment>> | InputMaybe<MatchAppointment>;
}>;


export type ScheduleAllMatchesForSeasonMutation = { __typename?: 'mutation', scheduleAllMatchesForSeason?: boolean | null };

export type ScheduleAllMatchesForMatchDayMutationVariables = Exact<{
  match_day_id: Scalars['String']['input'];
  match_appointments: Array<InputMaybe<MatchAppointment>> | InputMaybe<MatchAppointment>;
}>;


export type ScheduleAllMatchesForMatchDayMutation = { __typename?: 'mutation', scheduleAllMatchesForMatchDay?: boolean | null };

export type PasswordResetMutationVariables = Exact<{
  email: Scalars['String']['input'];
  target_path: Scalars['String']['input'];
}>;


export type PasswordResetMutation = { __typename?: 'mutation', sendPasswordResetMail?: boolean | null };

export type PasswordChangeMutationVariables = Exact<{
  new_password: Scalars['String']['input'];
}>;


export type PasswordChangeMutation = { __typename?: 'mutation', changeUserPassword?: boolean | null };

export type AddPenaltyMutationVariables = Exact<{
  id: Scalars['String']['input'];
  season_id: Scalars['String']['input'];
  team_id: Scalars['String']['input'];
  reason: Scalars['String']['input'];
  points: Scalars['Int']['input'];
}>;


export type AddPenaltyMutation = { __typename?: 'mutation', addRankingPenalty?: boolean | null };

export type RemovePenaltyMutationVariables = Exact<{
  ranking_penalty_id: Scalars['String']['input'];
  season_id: Scalars['String']['input'];
}>;


export type RemovePenaltyMutation = { __typename?: 'mutation', removeRankingPenalty?: boolean | null };

export type DeletePitchMutationVariables = Exact<{
  pitch_id: Scalars['String']['input'];
}>;


export type DeletePitchMutation = { __typename?: 'mutation', deletePitch?: boolean | null };

export type UpdatePitchContactMutationVariables = Exact<{
  pitch_id: Scalars['String']['input'];
  first_name: Scalars['String']['input'];
  last_name: Scalars['String']['input'];
  phone: Scalars['String']['input'];
  email: Scalars['String']['input'];
}>;


export type UpdatePitchContactMutation = { __typename?: 'mutation', updatePitchContact?: boolean | null };

export type CreatePitchMutationVariables = Exact<{
  id: Scalars['String']['input'];
  label: Scalars['String']['input'];
  location_longitude: Scalars['Float']['input'];
  location_latitude: Scalars['Float']['input'];
}>;


export type CreatePitchMutation = { __typename?: 'mutation', createPitch?: boolean | null };

export type CreateSeasonMutationVariables = Exact<{
  season_id?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
}>;


export type CreateSeasonMutation = { __typename?: 'mutation', createSeason?: boolean | null };

export type DeleteSeasonMutationVariables = Exact<{
  season_id: Scalars['String']['input'];
}>;


export type DeleteSeasonMutation = { __typename?: 'mutation', deleteSeason?: boolean | null };

export type EndSeasonMutationVariables = Exact<{
  season_id: Scalars['String']['input'];
}>;


export type EndSeasonMutation = { __typename?: 'mutation', endSeason?: boolean | null };

export type StartSeasonMutationVariables = Exact<{
  season_id: Scalars['String']['input'];
}>;


export type StartSeasonMutation = { __typename?: 'mutation', startSeason?: boolean | null };

export type AddTeamToSeasonMutationVariables = Exact<{
  season_id: Scalars['String']['input'];
  team_id: Scalars['String']['input'];
}>;


export type AddTeamToSeasonMutation = { __typename?: 'mutation', addTeamToSeason?: boolean | null };

export type RemoveTeamFromSeasonMutationVariables = Exact<{
  season_id: Scalars['String']['input'];
  team_id: Scalars['String']['input'];
}>;


export type RemoveTeamFromSeasonMutation = { __typename?: 'mutation', removeTeamFromSeason?: boolean | null };

export type CreateMatchesForSeasonMutationVariables = Exact<{
  season_id: Scalars['String']['input'];
  dates: Array<InputMaybe<DatePeriod>> | InputMaybe<DatePeriod>;
}>;


export type CreateMatchesForSeasonMutation = { __typename?: 'mutation', createMatchesForSeason?: boolean | null };

export type RescheduleMatchDayMutationVariables = Exact<{
  match_day_id: Scalars['String']['input'];
  date_period: DatePeriod;
}>;


export type RescheduleMatchDayMutation = { __typename?: 'mutation', rescheduleMatchDay?: boolean | null };

export type ReplaceTeamInSeasonMutationVariables = Exact<{
  season_id: Scalars['String']['input'];
  current_team_id: Scalars['String']['input'];
  replacement_team_id: Scalars['String']['input'];
}>;


export type ReplaceTeamInSeasonMutation = { __typename?: 'mutation', replaceTeamInSeason?: boolean | null };

export type CreateTeamMutationVariables = Exact<{
  id: Scalars['String']['input'];
  name: Scalars['String']['input'];
}>;


export type CreateTeamMutation = { __typename?: 'mutation', createTeam?: boolean | null };

export type UpdateTeamContactMutationVariables = Exact<{
  team_id: Scalars['String']['input'];
  first_name: Scalars['String']['input'];
  last_name: Scalars['String']['input'];
  phone: Scalars['String']['input'];
  email: Scalars['String']['input'];
}>;


export type UpdateTeamContactMutation = { __typename?: 'mutation', updateTeamContact?: boolean | null };

export type RenameTeamMutationVariables = Exact<{
  team_id: Scalars['String']['input'];
  new_name: Scalars['String']['input'];
}>;


export type RenameTeamMutation = { __typename?: 'mutation', renameTeam?: boolean | null };

export type DeleteTeamMutationVariables = Exact<{
  team_id: Scalars['String']['input'];
}>;


export type DeleteTeamMutation = { __typename?: 'mutation', deleteTeam?: boolean | null };

export type CreateTournamentMutationVariables = Exact<{
  id?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
}>;


export type CreateTournamentMutation = { __typename?: 'mutation', createTournament?: boolean | null };

export type CreateTournamentRoundMutationVariables = Exact<{
  tournament_id: Scalars['String']['input'];
  round: Scalars['Int']['input'];
  team_id_pairs: Array<InputMaybe<TeamIdPair>> | InputMaybe<TeamIdPair>;
  date_period: DatePeriod;
}>;


export type CreateTournamentRoundMutation = { __typename?: 'mutation', setTournamentRound?: boolean | null };

export type DeleteTournamentMutationVariables = Exact<{
  tournament_id: Scalars['String']['input'];
}>;


export type DeleteTournamentMutation = { __typename?: 'mutation', deleteTournament?: boolean | null };

export type StartTournamentMutationVariables = Exact<{
  tournament_id: Scalars['String']['input'];
}>;


export type StartTournamentMutation = { __typename?: 'mutation', startTournament?: boolean | null };

export type EndTournamentMutationVariables = Exact<{
  tournament_id: Scalars['String']['input'];
}>;


export type EndTournamentMutation = { __typename?: 'mutation', endTournament?: boolean | null };

export type CreateUserMutationVariables = Exact<{
  user_id?: InputMaybe<Scalars['String']['input']>;
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
  first_name: Scalars['String']['input'];
  last_name: Scalars['String']['input'];
  role: Scalars['String']['input'];
  team_ids: Array<InputMaybe<Scalars['String']['input']>> | InputMaybe<Scalars['String']['input']>;
}>;


export type CreateUserMutation = { __typename?: 'mutation', createUser?: boolean | null };

export type UpdateUserMutationVariables = Exact<{
  user_id: Scalars['String']['input'];
  email?: InputMaybe<Scalars['String']['input']>;
  first_name?: InputMaybe<Scalars['String']['input']>;
  last_name?: InputMaybe<Scalars['String']['input']>;
  role?: InputMaybe<Scalars['String']['input']>;
  team_ids?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>> | InputMaybe<Scalars['String']['input']>>;
}>;


export type UpdateUserMutation = { __typename?: 'mutation', updateUser?: boolean | null };

export type DeleteUserMutationVariables = Exact<{
  user_id: Scalars['String']['input'];
}>;


export type DeleteUserMutation = { __typename?: 'mutation', deleteUser?: boolean | null };

export type InviteUserMutationVariables = Exact<{
  user_id: Scalars['String']['input'];
  target_path: Scalars['String']['input'];
}>;


export type InviteUserMutation = { __typename?: 'mutation', sendInviteMail?: boolean | null };

export type AuthenticatedUserIdQueryVariables = Exact<{ [key: string]: never; }>;


export type AuthenticatedUserIdQuery = { __typename?: 'query', authenticatedUser?: { __typename?: 'User', id: string } | null };

export type CalendarQueryVariables = Exact<{
  min_date?: InputMaybe<Scalars['DateTime']['input']>;
  max_date?: InputMaybe<Scalars['DateTime']['input']>;
}>;


export type CalendarQuery = { __typename?: 'query', allSeasons?: Array<{ __typename?: 'Season', id: string, name: string, state: SeasonState, match_days?: Array<{ __typename?: 'MatchDay', number: number, start_date: string, end_date: string } | null> | null } | null> | null, allTournaments?: Array<{ __typename?: 'Tournament', id: string, name: string, state: TournamentState, rounds?: Array<{ __typename?: 'MatchDay', number: number, start_date: string, end_date: string } | null> | null } | null> | null, matchesByKickoff?: Array<{ __typename?: 'Match', id: string, kickoff?: any | null, home_score?: number | null, guest_score?: number | null, cancelled_at?: string | null, cancellation_reason?: string | null, home_team: (
      { __typename?: 'Team' }
      & { ' $fragmentRefs'?: { 'TeamFragment': TeamFragment } }
    ), guest_team: (
      { __typename?: 'Team' }
      & { ' $fragmentRefs'?: { 'TeamFragment': TeamFragment } }
    ), pitch?: (
      { __typename?: 'Pitch' }
      & { ' $fragmentRefs'?: { 'PitchFragment': PitchFragment } }
    ) | null } | null> | null };

export type AllEventQueryVariables = Exact<{
  id: Scalars['String']['input'];
}>;


export type AllEventQuery = { __typename?: 'query', event?: (
    { __typename?: 'Event' }
    & { ' $fragmentRefs'?: { 'EventFragment': EventFragment } }
  ) | null };

export type LatestEventQueryVariables = Exact<{
  start_date?: InputMaybe<Scalars['Date']['input']>;
  end_date?: InputMaybe<Scalars['Date']['input']>;
  type?: InputMaybe<Scalars['String']['input']>;
}>;


export type LatestEventQuery = { __typename?: 'query', latestEvents?: Array<(
    { __typename?: 'Event' }
    & { ' $fragmentRefs'?: { 'EventFragment': EventFragment } }
  ) | null> | null };

export type HallOfFameQueryVariables = Exact<{ [key: string]: never; }>;


export type HallOfFameQuery = { __typename?: 'query', allSeasons?: Array<(
    { __typename?: 'Season' }
    & { ' $fragmentRefs'?: { 'AllSeasonsHoFFragment': AllSeasonsHoFFragment } }
  ) | null> | null, allTournaments?: Array<(
    { __typename?: 'Tournament' }
    & { ' $fragmentRefs'?: { 'AllTournamentsHoFFragment': AllTournamentsHoFFragment } }
  ) | null> | null };

export type MatchByIdQueryVariables = Exact<{
  id: Scalars['String']['input'];
}>;


export type MatchByIdQuery = { __typename?: 'query', match?: (
    { __typename?: 'Match' }
    & { ' $fragmentRefs'?: { 'MatchFragment': MatchFragment } }
  ) | null };

export type SeasonPenaltiesQueryVariables = Exact<{
  id: Scalars['String']['input'];
}>;


export type SeasonPenaltiesQuery = { __typename?: 'query', season?: { __typename?: 'Season', id: string, ranking?: { __typename?: 'Ranking', penalties?: Array<(
        { __typename?: 'RankingPenalty' }
        & { ' $fragmentRefs'?: { 'PenaltyFragment': PenaltyFragment } }
      ) | null> | null } | null } | null };

export type PitchesQueryVariables = Exact<{ [key: string]: never; }>;


export type PitchesQuery = { __typename?: 'query', allPitches?: Array<(
    { __typename?: 'Pitch' }
    & { ' $fragmentRefs'?: { 'PitchFragment': PitchFragment } }
  ) | null> | null };

export type RankingByIdQueryVariables = Exact<{
  id: Scalars['String']['input'];
}>;


export type RankingByIdQuery = { __typename?: 'query', season?: (
    { __typename?: 'Season' }
    & { ' $fragmentRefs'?: { 'RankingFragment': RankingFragment } }
  ) | null };

export type SeasonByIdQueryVariables = Exact<{
  id: Scalars['String']['input'];
}>;


export type SeasonByIdQuery = { __typename?: 'query', season?: (
    { __typename?: 'Season' }
    & { ' $fragmentRefs'?: { 'SeasonFragment': SeasonFragment } }
  ) | null };

export type SeasonListQueryVariables = Exact<{ [key: string]: never; }>;


export type SeasonListQuery = { __typename?: 'query', allSeasons?: Array<(
    { __typename?: 'Season' }
    & { ' $fragmentRefs'?: { 'AllSeasonsFragment': AllSeasonsFragment } }
  ) | null> | null };

export type TeamByIdQueryVariables = Exact<{
  id: Scalars['String']['input'];
}>;


export type TeamByIdQuery = { __typename?: 'query', team?: (
    { __typename?: 'Team' }
    & { ' $fragmentRefs'?: { 'TeamFragment': TeamFragment } }
  ) | null };

export type TeamListQueryVariables = Exact<{ [key: string]: never; }>;


export type TeamListQuery = { __typename?: 'query', allTeams?: Array<(
    { __typename?: 'Team' }
    & { ' $fragmentRefs'?: { 'TeamFragment': TeamFragment } }
  ) | null> | null };

export type TournamentByIdQueryVariables = Exact<{
  id: Scalars['String']['input'];
}>;


export type TournamentByIdQuery = { __typename?: 'query', tournament?: (
    { __typename?: 'Tournament' }
    & { ' $fragmentRefs'?: { 'TournamentFragment': TournamentFragment } }
  ) | null };

export type TournamentListQueryVariables = Exact<{ [key: string]: never; }>;


export type TournamentListQuery = { __typename?: 'query', allTournaments?: Array<(
    { __typename?: 'Tournament' }
    & { ' $fragmentRefs'?: { 'AllTournamentsFragment': AllTournamentsFragment } }
  ) | null> | null };

export type AuthenticatedUserQueryVariables = Exact<{ [key: string]: never; }>;


export type AuthenticatedUserQuery = { __typename?: 'query', authenticatedUser?: (
    { __typename?: 'User' }
    & { ' $fragmentRefs'?: { 'UserFragment': UserFragment } }
  ) | null };

export type AllUsersQueryVariables = Exact<{ [key: string]: never; }>;


export type AllUsersQuery = { __typename?: 'query', allUsers?: Array<(
    { __typename?: 'User' }
    & { ' $fragmentRefs'?: { 'UserFragment': UserFragment } }
  ) | null> | null };

export class TypedDocumentString<TResult, TVariables>
  extends String
  implements DocumentTypeDecoration<TResult, TVariables>
{
  __apiType?: NonNullable<DocumentTypeDecoration<TResult, TVariables>['__apiType']>;
  private value: string;
  public __meta__?: Record<string, any> | undefined;

  constructor(value: string, __meta__?: Record<string, any> | undefined) {
    super(value);
    this.value = value;
    this.__meta__ = __meta__;
  }

  override toString(): string & DocumentTypeDecoration<TResult, TVariables> {
    return this.value;
  }
}
export const ContactFragmentDoc = new TypedDocumentString(`
    fragment Contact on Contact {
  first_name
  last_name
  phone
  email
}
    `, {"fragmentName":"Contact"}) as unknown as TypedDocumentString<ContactFragment, unknown>;
export const TeamFragmentDoc = new TypedDocumentString(`
    fragment Team on Team {
  id
  name
  logo_id
  logo_path
  created_at
  contact {
    ...Contact
  }
}
    fragment Contact on Contact {
  first_name
  last_name
  phone
  email
}`, {"fragmentName":"Team"}) as unknown as TypedDocumentString<TeamFragment, unknown>;
export const PitchFragmentDoc = new TypedDocumentString(`
    fragment Pitch on Pitch {
  id
  label
  location_longitude
  location_latitude
  contact {
    ...Contact
  }
}
    fragment Contact on Contact {
  first_name
  last_name
  phone
  email
}`, {"fragmentName":"Pitch"}) as unknown as TypedDocumentString<PitchFragment, unknown>;
export const MatchFragmentDoc = new TypedDocumentString(`
    fragment Match on Match {
  id
  home_team {
    ...Team
  }
  home_score
  guest_team {
    ...Team
  }
  guest_score
  kickoff
  pitch {
    ...Pitch
  }
  cancelled_at
  cancellation_reason
}
    fragment Pitch on Pitch {
  id
  label
  location_longitude
  location_latitude
  contact {
    ...Contact
  }
}
fragment Team on Team {
  id
  name
  logo_id
  logo_path
  created_at
  contact {
    ...Contact
  }
}
fragment Contact on Contact {
  first_name
  last_name
  phone
  email
}`, {"fragmentName":"Match"}) as unknown as TypedDocumentString<MatchFragment, unknown>;
export const MatchDayFragmentDoc = new TypedDocumentString(`
    fragment MatchDay on MatchDay {
  id
  number
  start_date
  end_date
  matches {
    ...Match
  }
}
    fragment Match on Match {
  id
  home_team {
    ...Team
  }
  home_score
  guest_team {
    ...Team
  }
  guest_score
  kickoff
  pitch {
    ...Pitch
  }
  cancelled_at
  cancellation_reason
}
fragment Pitch on Pitch {
  id
  label
  location_longitude
  location_latitude
  contact {
    ...Contact
  }
}
fragment Team on Team {
  id
  name
  logo_id
  logo_path
  created_at
  contact {
    ...Contact
  }
}
fragment Contact on Contact {
  first_name
  last_name
  phone
  email
}`, {"fragmentName":"MatchDay"}) as unknown as TypedDocumentString<MatchDayFragment, unknown>;
export const SeasonFragmentDoc = new TypedDocumentString(`
    fragment Season on Season {
  id
  name
  state
  teams {
    ...Team
  }
  match_days {
    ...MatchDay
  }
}
    fragment Match on Match {
  id
  home_team {
    ...Team
  }
  home_score
  guest_team {
    ...Team
  }
  guest_score
  kickoff
  pitch {
    ...Pitch
  }
  cancelled_at
  cancellation_reason
}
fragment MatchDay on MatchDay {
  id
  number
  start_date
  end_date
  matches {
    ...Match
  }
}
fragment Pitch on Pitch {
  id
  label
  location_longitude
  location_latitude
  contact {
    ...Contact
  }
}
fragment Team on Team {
  id
  name
  logo_id
  logo_path
  created_at
  contact {
    ...Contact
  }
}
fragment Contact on Contact {
  first_name
  last_name
  phone
  email
}`, {"fragmentName":"Season"}) as unknown as TypedDocumentString<SeasonFragment, unknown>;
export const AllSeasonsFragmentDoc = new TypedDocumentString(`
    fragment AllSeasons on Season {
  id
  name
  state
  match_days {
    number
    start_date
    end_date
  }
}
    `, {"fragmentName":"AllSeasons"}) as unknown as TypedDocumentString<AllSeasonsFragment, unknown>;
export const AllSeasonsHoFFragmentDoc = new TypedDocumentString(`
    fragment AllSeasonsHoF on Season {
  id
  name
  state
  match_days {
    number
    start_date
  }
  ranking {
    positions {
      team {
        ...Team
      }
      sort_index
    }
  }
}
    fragment Team on Team {
  id
  name
  logo_id
  logo_path
  created_at
  contact {
    ...Contact
  }
}
fragment Contact on Contact {
  first_name
  last_name
  phone
  email
}`, {"fragmentName":"AllSeasonsHoF"}) as unknown as TypedDocumentString<AllSeasonsHoFFragment, unknown>;
export const AllSeasonsCalendarFragmentDoc = new TypedDocumentString(`
    fragment AllSeasonsCalendar on Season {
  id
  name
  state
  match_days {
    ...MatchDay
  }
}
    fragment Match on Match {
  id
  home_team {
    ...Team
  }
  home_score
  guest_team {
    ...Team
  }
  guest_score
  kickoff
  pitch {
    ...Pitch
  }
  cancelled_at
  cancellation_reason
}
fragment MatchDay on MatchDay {
  id
  number
  start_date
  end_date
  matches {
    ...Match
  }
}
fragment Pitch on Pitch {
  id
  label
  location_longitude
  location_latitude
  contact {
    ...Contact
  }
}
fragment Team on Team {
  id
  name
  logo_id
  logo_path
  created_at
  contact {
    ...Contact
  }
}
fragment Contact on Contact {
  first_name
  last_name
  phone
  email
}`, {"fragmentName":"AllSeasonsCalendar"}) as unknown as TypedDocumentString<AllSeasonsCalendarFragment, unknown>;
export const AllTournamentsFragmentDoc = new TypedDocumentString(`
    fragment AllTournaments on Tournament {
  id
  name
  state
}
    `, {"fragmentName":"AllTournaments"}) as unknown as TypedDocumentString<AllTournamentsFragment, unknown>;
export const AllTournamentsHoFFragmentDoc = new TypedDocumentString(`
    fragment AllTournamentsHoF on Tournament {
  id
  name
  state
  rounds {
    ...MatchDay
  }
}
    fragment Match on Match {
  id
  home_team {
    ...Team
  }
  home_score
  guest_team {
    ...Team
  }
  guest_score
  kickoff
  pitch {
    ...Pitch
  }
  cancelled_at
  cancellation_reason
}
fragment MatchDay on MatchDay {
  id
  number
  start_date
  end_date
  matches {
    ...Match
  }
}
fragment Pitch on Pitch {
  id
  label
  location_longitude
  location_latitude
  contact {
    ...Contact
  }
}
fragment Team on Team {
  id
  name
  logo_id
  logo_path
  created_at
  contact {
    ...Contact
  }
}
fragment Contact on Contact {
  first_name
  last_name
  phone
  email
}`, {"fragmentName":"AllTournamentsHoF"}) as unknown as TypedDocumentString<AllTournamentsHoFFragment, unknown>;
export const AllTournamentsCalendarFragmentDoc = new TypedDocumentString(`
    fragment AllTournamentsCalendar on Tournament {
  id
  name
  state
  rounds {
    ...MatchDay
  }
}
    fragment Match on Match {
  id
  home_team {
    ...Team
  }
  home_score
  guest_team {
    ...Team
  }
  guest_score
  kickoff
  pitch {
    ...Pitch
  }
  cancelled_at
  cancellation_reason
}
fragment MatchDay on MatchDay {
  id
  number
  start_date
  end_date
  matches {
    ...Match
  }
}
fragment Pitch on Pitch {
  id
  label
  location_longitude
  location_latitude
  contact {
    ...Contact
  }
}
fragment Team on Team {
  id
  name
  logo_id
  logo_path
  created_at
  contact {
    ...Contact
  }
}
fragment Contact on Contact {
  first_name
  last_name
  phone
  email
}`, {"fragmentName":"AllTournamentsCalendar"}) as unknown as TypedDocumentString<AllTournamentsCalendarFragment, unknown>;
export const TournamentFragmentDoc = new TypedDocumentString(`
    fragment Tournament on Tournament {
  id
  name
  rounds {
    ...MatchDay
  }
  state
}
    fragment Match on Match {
  id
  home_team {
    ...Team
  }
  home_score
  guest_team {
    ...Team
  }
  guest_score
  kickoff
  pitch {
    ...Pitch
  }
  cancelled_at
  cancellation_reason
}
fragment MatchDay on MatchDay {
  id
  number
  start_date
  end_date
  matches {
    ...Match
  }
}
fragment Pitch on Pitch {
  id
  label
  location_longitude
  location_latitude
  contact {
    ...Contact
  }
}
fragment Team on Team {
  id
  name
  logo_id
  logo_path
  created_at
  contact {
    ...Contact
  }
}
fragment Contact on Contact {
  first_name
  last_name
  phone
  email
}`, {"fragmentName":"Tournament"}) as unknown as TypedDocumentString<TournamentFragment, unknown>;
export const UserFragmentDoc = new TypedDocumentString(`
    fragment User on User {
  id
  email
  teams {
    ...Team
  }
  role
  first_name
  last_name
}
    fragment Team on Team {
  id
  name
  logo_id
  logo_path
  created_at
  contact {
    ...Contact
  }
}
fragment Contact on Contact {
  first_name
  last_name
  phone
  email
}`, {"fragmentName":"User"}) as unknown as TypedDocumentString<UserFragment, unknown>;
export const EventFragmentDoc = new TypedDocumentString(`
    fragment Event on Event {
  id
  occurred_at
  type
}
    `, {"fragmentName":"Event"}) as unknown as TypedDocumentString<EventFragment, unknown>;
export const PenaltyFragmentDoc = new TypedDocumentString(`
    fragment Penalty on RankingPenalty {
  id
  team {
    ...Team
  }
  reason
  created_at
  points
}
    fragment Team on Team {
  id
  name
  logo_id
  logo_path
  created_at
  contact {
    ...Contact
  }
}
fragment Contact on Contact {
  first_name
  last_name
  phone
  email
}`, {"fragmentName":"Penalty"}) as unknown as TypedDocumentString<PenaltyFragment, unknown>;
export const RankingFragmentDoc = new TypedDocumentString(`
    fragment Ranking on Season {
  id
  ranking {
    updated_at
    positions {
      team {
        ...Team
      }
      sort_index
      number
      matches
      wins
      draws
      losses
      scored_goals
      conceded_goals
      points
    }
    penalties {
      ...Penalty
    }
  }
}
    fragment Team on Team {
  id
  name
  logo_id
  logo_path
  created_at
  contact {
    ...Contact
  }
}
fragment Contact on Contact {
  first_name
  last_name
  phone
  email
}
fragment Penalty on RankingPenalty {
  id
  team {
    ...Team
  }
  reason
  created_at
  points
}`, {"fragmentName":"Ranking"}) as unknown as TypedDocumentString<RankingFragment, unknown>;
export const SubmitResultDocument = new TypedDocumentString(`
    mutation SubmitResult($match_id: String!, $home_score: Int!, $guest_score: Int!) {
  submitMatchResult(
    match_id: $match_id
    home_score: $home_score
    guest_score: $guest_score
  )
}
    `) as unknown as TypedDocumentString<SubmitResultMutation, SubmitResultMutationVariables>;
export const ScheduleMatchDocument = new TypedDocumentString(`
    mutation ScheduleMatch($match_id: String!, $kickoff: DateTime!) {
  scheduleMatch(match_id: $match_id, kickoff: $kickoff)
}
    `) as unknown as TypedDocumentString<ScheduleMatchMutation, ScheduleMatchMutationVariables>;
export const LocateMatchDocument = new TypedDocumentString(`
    mutation LocateMatch($match_id: String!, $pitch_id: String!) {
  locateMatch(match_id: $match_id, pitch_id: $pitch_id)
}
    `) as unknown as TypedDocumentString<LocateMatchMutation, LocateMatchMutationVariables>;
export const CancelMatchDocument = new TypedDocumentString(`
    mutation CancelMatch($match_id: String!, $reason: String!) {
  cancelMatch(match_id: $match_id, reason: $reason)
}
    `) as unknown as TypedDocumentString<CancelMatchMutation, CancelMatchMutationVariables>;
export const ScheduleAllMatchesForSeasonDocument = new TypedDocumentString(`
    mutation ScheduleAllMatchesForSeason($season_id: String!, $match_appointments: [MatchAppointment]!) {
  scheduleAllMatchesForSeason(
    season_id: $season_id
    match_appointments: $match_appointments
  )
}
    `) as unknown as TypedDocumentString<ScheduleAllMatchesForSeasonMutation, ScheduleAllMatchesForSeasonMutationVariables>;
export const ScheduleAllMatchesForMatchDayDocument = new TypedDocumentString(`
    mutation ScheduleAllMatchesForMatchDay($match_day_id: String!, $match_appointments: [MatchAppointment]!) {
  scheduleAllMatchesForMatchDay(
    match_day_id: $match_day_id
    match_appointments: $match_appointments
  )
}
    `) as unknown as TypedDocumentString<ScheduleAllMatchesForMatchDayMutation, ScheduleAllMatchesForMatchDayMutationVariables>;
export const PasswordResetDocument = new TypedDocumentString(`
    mutation PasswordReset($email: String!, $target_path: String!) {
  sendPasswordResetMail(email: $email, target_path: $target_path)
}
    `) as unknown as TypedDocumentString<PasswordResetMutation, PasswordResetMutationVariables>;
export const PasswordChangeDocument = new TypedDocumentString(`
    mutation PasswordChange($new_password: String!) {
  changeUserPassword(new_password: $new_password)
}
    `) as unknown as TypedDocumentString<PasswordChangeMutation, PasswordChangeMutationVariables>;
export const AddPenaltyDocument = new TypedDocumentString(`
    mutation AddPenalty($id: String!, $season_id: String!, $team_id: String!, $reason: String!, $points: Int!) {
  addRankingPenalty(
    id: $id
    season_id: $season_id
    team_id: $team_id
    reason: $reason
    points: $points
  )
}
    `) as unknown as TypedDocumentString<AddPenaltyMutation, AddPenaltyMutationVariables>;
export const RemovePenaltyDocument = new TypedDocumentString(`
    mutation RemovePenalty($ranking_penalty_id: String!, $season_id: String!) {
  removeRankingPenalty(
    ranking_penalty_id: $ranking_penalty_id
    season_id: $season_id
  )
}
    `) as unknown as TypedDocumentString<RemovePenaltyMutation, RemovePenaltyMutationVariables>;
export const DeletePitchDocument = new TypedDocumentString(`
    mutation DeletePitch($pitch_id: String!) {
  deletePitch(pitch_id: $pitch_id)
}
    `) as unknown as TypedDocumentString<DeletePitchMutation, DeletePitchMutationVariables>;
export const UpdatePitchContactDocument = new TypedDocumentString(`
    mutation UpdatePitchContact($pitch_id: String!, $first_name: String!, $last_name: String!, $phone: String!, $email: String!) {
  updatePitchContact(
    pitch_id: $pitch_id
    first_name: $first_name
    last_name: $last_name
    phone: $phone
    email: $email
  )
}
    `) as unknown as TypedDocumentString<UpdatePitchContactMutation, UpdatePitchContactMutationVariables>;
export const CreatePitchDocument = new TypedDocumentString(`
    mutation CreatePitch($id: String!, $label: String!, $location_longitude: Float!, $location_latitude: Float!) {
  createPitch(
    id: $id
    label: $label
    longitude: $location_longitude
    latitude: $location_latitude
  )
}
    `) as unknown as TypedDocumentString<CreatePitchMutation, CreatePitchMutationVariables>;
export const CreateSeasonDocument = new TypedDocumentString(`
    mutation CreateSeason($season_id: String, $name: String!) {
  createSeason(id: $season_id, name: $name)
}
    `) as unknown as TypedDocumentString<CreateSeasonMutation, CreateSeasonMutationVariables>;
export const DeleteSeasonDocument = new TypedDocumentString(`
    mutation DeleteSeason($season_id: String!) {
  deleteSeason(season_id: $season_id)
}
    `) as unknown as TypedDocumentString<DeleteSeasonMutation, DeleteSeasonMutationVariables>;
export const EndSeasonDocument = new TypedDocumentString(`
    mutation EndSeason($season_id: String!) {
  endSeason(season_id: $season_id)
}
    `) as unknown as TypedDocumentString<EndSeasonMutation, EndSeasonMutationVariables>;
export const StartSeasonDocument = new TypedDocumentString(`
    mutation StartSeason($season_id: String!) {
  startSeason(season_id: $season_id)
}
    `) as unknown as TypedDocumentString<StartSeasonMutation, StartSeasonMutationVariables>;
export const AddTeamToSeasonDocument = new TypedDocumentString(`
    mutation AddTeamToSeason($season_id: String!, $team_id: String!) {
  addTeamToSeason(season_id: $season_id, team_id: $team_id)
}
    `) as unknown as TypedDocumentString<AddTeamToSeasonMutation, AddTeamToSeasonMutationVariables>;
export const RemoveTeamFromSeasonDocument = new TypedDocumentString(`
    mutation RemoveTeamFromSeason($season_id: String!, $team_id: String!) {
  removeTeamFromSeason(season_id: $season_id, team_id: $team_id)
}
    `) as unknown as TypedDocumentString<RemoveTeamFromSeasonMutation, RemoveTeamFromSeasonMutationVariables>;
export const CreateMatchesForSeasonDocument = new TypedDocumentString(`
    mutation CreateMatchesForSeason($season_id: String!, $dates: [DatePeriod]!) {
  createMatchesForSeason(season_id: $season_id, dates: $dates)
}
    `) as unknown as TypedDocumentString<CreateMatchesForSeasonMutation, CreateMatchesForSeasonMutationVariables>;
export const RescheduleMatchDayDocument = new TypedDocumentString(`
    mutation RescheduleMatchDay($match_day_id: String!, $date_period: DatePeriod!) {
  rescheduleMatchDay(match_day_id: $match_day_id, date_period: $date_period)
}
    `) as unknown as TypedDocumentString<RescheduleMatchDayMutation, RescheduleMatchDayMutationVariables>;
export const ReplaceTeamInSeasonDocument = new TypedDocumentString(`
    mutation ReplaceTeamInSeason($season_id: String!, $current_team_id: String!, $replacement_team_id: String!) {
  replaceTeamInSeason(
    season_id: $season_id
    current_team_id: $current_team_id
    replacement_team_id: $replacement_team_id
  )
}
    `) as unknown as TypedDocumentString<ReplaceTeamInSeasonMutation, ReplaceTeamInSeasonMutationVariables>;
export const CreateTeamDocument = new TypedDocumentString(`
    mutation CreateTeam($id: String!, $name: String!) {
  createTeam(id: $id, name: $name)
}
    `) as unknown as TypedDocumentString<CreateTeamMutation, CreateTeamMutationVariables>;
export const UpdateTeamContactDocument = new TypedDocumentString(`
    mutation UpdateTeamContact($team_id: String!, $first_name: String!, $last_name: String!, $phone: String!, $email: String!) {
  updateTeamContact(
    team_id: $team_id
    first_name: $first_name
    last_name: $last_name
    phone: $phone
    email: $email
  )
}
    `) as unknown as TypedDocumentString<UpdateTeamContactMutation, UpdateTeamContactMutationVariables>;
export const RenameTeamDocument = new TypedDocumentString(`
    mutation RenameTeam($team_id: String!, $new_name: String!) {
  renameTeam(team_id: $team_id, new_name: $new_name)
}
    `) as unknown as TypedDocumentString<RenameTeamMutation, RenameTeamMutationVariables>;
export const DeleteTeamDocument = new TypedDocumentString(`
    mutation DeleteTeam($team_id: String!) {
  deleteTeam(team_id: $team_id)
}
    `) as unknown as TypedDocumentString<DeleteTeamMutation, DeleteTeamMutationVariables>;
export const CreateTournamentDocument = new TypedDocumentString(`
    mutation CreateTournament($id: String, $name: String!) {
  createTournament(id: $id, name: $name)
}
    `) as unknown as TypedDocumentString<CreateTournamentMutation, CreateTournamentMutationVariables>;
export const CreateTournamentRoundDocument = new TypedDocumentString(`
    mutation CreateTournamentRound($tournament_id: String!, $round: Int!, $team_id_pairs: [TeamIdPair]!, $date_period: DatePeriod!) {
  setTournamentRound(
    tournament_id: $tournament_id
    round: $round
    team_id_pairs: $team_id_pairs
    date_period: $date_period
  )
}
    `) as unknown as TypedDocumentString<CreateTournamentRoundMutation, CreateTournamentRoundMutationVariables>;
export const DeleteTournamentDocument = new TypedDocumentString(`
    mutation DeleteTournament($tournament_id: String!) {
  deleteTournament(tournament_id: $tournament_id)
}
    `) as unknown as TypedDocumentString<DeleteTournamentMutation, DeleteTournamentMutationVariables>;
export const StartTournamentDocument = new TypedDocumentString(`
    mutation StartTournament($tournament_id: String!) {
  startTournament(tournament_id: $tournament_id)
}
    `) as unknown as TypedDocumentString<StartTournamentMutation, StartTournamentMutationVariables>;
export const EndTournamentDocument = new TypedDocumentString(`
    mutation EndTournament($tournament_id: String!) {
  endTournament(tournament_id: $tournament_id)
}
    `) as unknown as TypedDocumentString<EndTournamentMutation, EndTournamentMutationVariables>;
export const CreateUserDocument = new TypedDocumentString(`
    mutation CreateUser($user_id: String, $email: String!, $password: String!, $first_name: String!, $last_name: String!, $role: String!, $team_ids: [String]!) {
  createUser(
    id: $user_id
    email: $email
    password: $password
    first_name: $first_name
    last_name: $last_name
    role: $role
    team_ids: $team_ids
  )
}
    `) as unknown as TypedDocumentString<CreateUserMutation, CreateUserMutationVariables>;
export const UpdateUserDocument = new TypedDocumentString(`
    mutation UpdateUser($user_id: String!, $email: String, $first_name: String, $last_name: String, $role: String, $team_ids: [String]) {
  updateUser(
    user_id: $user_id
    email: $email
    first_name: $first_name
    last_name: $last_name
    role: $role
    team_ids: $team_ids
  )
}
    `) as unknown as TypedDocumentString<UpdateUserMutation, UpdateUserMutationVariables>;
export const DeleteUserDocument = new TypedDocumentString(`
    mutation DeleteUser($user_id: String!) {
  deleteUser(user_id: $user_id)
}
    `) as unknown as TypedDocumentString<DeleteUserMutation, DeleteUserMutationVariables>;
export const InviteUserDocument = new TypedDocumentString(`
    mutation InviteUser($user_id: String!, $target_path: String!) {
  sendInviteMail(user_id: $user_id, target_path: $target_path)
}
    `) as unknown as TypedDocumentString<InviteUserMutation, InviteUserMutationVariables>;
export const AuthenticatedUserIdDocument = new TypedDocumentString(`
    query AuthenticatedUserId {
  authenticatedUser {
    id
  }
}
    `) as unknown as TypedDocumentString<AuthenticatedUserIdQuery, AuthenticatedUserIdQueryVariables>;
export const CalendarDocument = new TypedDocumentString(`
    query Calendar($min_date: DateTime, $max_date: DateTime) {
  allSeasons {
    id
    name
    state
    match_days {
      number
      start_date
      end_date
    }
  }
  allTournaments {
    id
    name
    state
    rounds {
      number
      start_date
      end_date
    }
  }
  matchesByKickoff(min_date: $min_date, max_date: $max_date) {
    id
    home_team {
      ...Team
    }
    guest_team {
      ...Team
    }
    kickoff
    home_score
    guest_score
    cancelled_at
    cancellation_reason
    pitch {
      ...Pitch
    }
  }
}
    fragment Pitch on Pitch {
  id
  label
  location_longitude
  location_latitude
  contact {
    ...Contact
  }
}
fragment Team on Team {
  id
  name
  logo_id
  logo_path
  created_at
  contact {
    ...Contact
  }
}
fragment Contact on Contact {
  first_name
  last_name
  phone
  email
}`) as unknown as TypedDocumentString<CalendarQuery, CalendarQueryVariables>;
export const AllEventDocument = new TypedDocumentString(`
    query AllEvent($id: String!) {
  event(id: $id) {
    ...Event
  }
}
    fragment Event on Event {
  id
  occurred_at
  type
}`) as unknown as TypedDocumentString<AllEventQuery, AllEventQueryVariables>;
export const LatestEventDocument = new TypedDocumentString(`
    query LatestEvent($start_date: Date, $end_date: Date, $type: String) {
  latestEvents(start_date: $start_date, end_date: $end_date, type: $type) {
    ...Event
  }
}
    fragment Event on Event {
  id
  occurred_at
  type
}`) as unknown as TypedDocumentString<LatestEventQuery, LatestEventQueryVariables>;
export const HallOfFameDocument = new TypedDocumentString(`
    query HallOfFame {
  allSeasons {
    ...AllSeasonsHoF
  }
  allTournaments {
    ...AllTournamentsHoF
  }
}
    fragment Match on Match {
  id
  home_team {
    ...Team
  }
  home_score
  guest_team {
    ...Team
  }
  guest_score
  kickoff
  pitch {
    ...Pitch
  }
  cancelled_at
  cancellation_reason
}
fragment MatchDay on MatchDay {
  id
  number
  start_date
  end_date
  matches {
    ...Match
  }
}
fragment Pitch on Pitch {
  id
  label
  location_longitude
  location_latitude
  contact {
    ...Contact
  }
}
fragment Team on Team {
  id
  name
  logo_id
  logo_path
  created_at
  contact {
    ...Contact
  }
}
fragment Contact on Contact {
  first_name
  last_name
  phone
  email
}
fragment AllSeasonsHoF on Season {
  id
  name
  state
  match_days {
    number
    start_date
  }
  ranking {
    positions {
      team {
        ...Team
      }
      sort_index
    }
  }
}
fragment AllTournamentsHoF on Tournament {
  id
  name
  state
  rounds {
    ...MatchDay
  }
}`) as unknown as TypedDocumentString<HallOfFameQuery, HallOfFameQueryVariables>;
export const MatchByIdDocument = new TypedDocumentString(`
    query MatchById($id: String!) {
  match(id: $id) {
    ...Match
  }
}
    fragment Match on Match {
  id
  home_team {
    ...Team
  }
  home_score
  guest_team {
    ...Team
  }
  guest_score
  kickoff
  pitch {
    ...Pitch
  }
  cancelled_at
  cancellation_reason
}
fragment Pitch on Pitch {
  id
  label
  location_longitude
  location_latitude
  contact {
    ...Contact
  }
}
fragment Team on Team {
  id
  name
  logo_id
  logo_path
  created_at
  contact {
    ...Contact
  }
}
fragment Contact on Contact {
  first_name
  last_name
  phone
  email
}`) as unknown as TypedDocumentString<MatchByIdQuery, MatchByIdQueryVariables>;
export const SeasonPenaltiesDocument = new TypedDocumentString(`
    query SeasonPenalties($id: String!) {
  season(id: $id) {
    id
    ranking {
      penalties {
        ...Penalty
      }
    }
  }
}
    fragment Team on Team {
  id
  name
  logo_id
  logo_path
  created_at
  contact {
    ...Contact
  }
}
fragment Contact on Contact {
  first_name
  last_name
  phone
  email
}
fragment Penalty on RankingPenalty {
  id
  team {
    ...Team
  }
  reason
  created_at
  points
}`) as unknown as TypedDocumentString<SeasonPenaltiesQuery, SeasonPenaltiesQueryVariables>;
export const PitchesDocument = new TypedDocumentString(`
    query Pitches {
  allPitches {
    ...Pitch
  }
}
    fragment Pitch on Pitch {
  id
  label
  location_longitude
  location_latitude
  contact {
    ...Contact
  }
}
fragment Contact on Contact {
  first_name
  last_name
  phone
  email
}`) as unknown as TypedDocumentString<PitchesQuery, PitchesQueryVariables>;
export const RankingByIdDocument = new TypedDocumentString(`
    query RankingById($id: String!) {
  season(id: $id) {
    ...Ranking
  }
}
    fragment Team on Team {
  id
  name
  logo_id
  logo_path
  created_at
  contact {
    ...Contact
  }
}
fragment Contact on Contact {
  first_name
  last_name
  phone
  email
}
fragment Ranking on Season {
  id
  ranking {
    updated_at
    positions {
      team {
        ...Team
      }
      sort_index
      number
      matches
      wins
      draws
      losses
      scored_goals
      conceded_goals
      points
    }
    penalties {
      ...Penalty
    }
  }
}
fragment Penalty on RankingPenalty {
  id
  team {
    ...Team
  }
  reason
  created_at
  points
}`) as unknown as TypedDocumentString<RankingByIdQuery, RankingByIdQueryVariables>;
export const SeasonByIdDocument = new TypedDocumentString(`
    query SeasonById($id: String!) {
  season(id: $id) {
    ...Season
  }
}
    fragment Match on Match {
  id
  home_team {
    ...Team
  }
  home_score
  guest_team {
    ...Team
  }
  guest_score
  kickoff
  pitch {
    ...Pitch
  }
  cancelled_at
  cancellation_reason
}
fragment MatchDay on MatchDay {
  id
  number
  start_date
  end_date
  matches {
    ...Match
  }
}
fragment Pitch on Pitch {
  id
  label
  location_longitude
  location_latitude
  contact {
    ...Contact
  }
}
fragment Team on Team {
  id
  name
  logo_id
  logo_path
  created_at
  contact {
    ...Contact
  }
}
fragment Contact on Contact {
  first_name
  last_name
  phone
  email
}
fragment Season on Season {
  id
  name
  state
  teams {
    ...Team
  }
  match_days {
    ...MatchDay
  }
}`) as unknown as TypedDocumentString<SeasonByIdQuery, SeasonByIdQueryVariables>;
export const SeasonListDocument = new TypedDocumentString(`
    query SeasonList {
  allSeasons {
    ...AllSeasons
  }
}
    fragment AllSeasons on Season {
  id
  name
  state
  match_days {
    number
    start_date
    end_date
  }
}`) as unknown as TypedDocumentString<SeasonListQuery, SeasonListQueryVariables>;
export const TeamByIdDocument = new TypedDocumentString(`
    query TeamById($id: String!) {
  team(id: $id) {
    ...Team
  }
}
    fragment Team on Team {
  id
  name
  logo_id
  logo_path
  created_at
  contact {
    ...Contact
  }
}
fragment Contact on Contact {
  first_name
  last_name
  phone
  email
}`) as unknown as TypedDocumentString<TeamByIdQuery, TeamByIdQueryVariables>;
export const TeamListDocument = new TypedDocumentString(`
    query TeamList {
  allTeams {
    ...Team
  }
}
    fragment Team on Team {
  id
  name
  logo_id
  logo_path
  created_at
  contact {
    ...Contact
  }
}
fragment Contact on Contact {
  first_name
  last_name
  phone
  email
}`) as unknown as TypedDocumentString<TeamListQuery, TeamListQueryVariables>;
export const TournamentByIdDocument = new TypedDocumentString(`
    query TournamentById($id: String!) {
  tournament(id: $id) {
    ...Tournament
  }
}
    fragment Match on Match {
  id
  home_team {
    ...Team
  }
  home_score
  guest_team {
    ...Team
  }
  guest_score
  kickoff
  pitch {
    ...Pitch
  }
  cancelled_at
  cancellation_reason
}
fragment MatchDay on MatchDay {
  id
  number
  start_date
  end_date
  matches {
    ...Match
  }
}
fragment Pitch on Pitch {
  id
  label
  location_longitude
  location_latitude
  contact {
    ...Contact
  }
}
fragment Team on Team {
  id
  name
  logo_id
  logo_path
  created_at
  contact {
    ...Contact
  }
}
fragment Contact on Contact {
  first_name
  last_name
  phone
  email
}
fragment Tournament on Tournament {
  id
  name
  rounds {
    ...MatchDay
  }
  state
}`) as unknown as TypedDocumentString<TournamentByIdQuery, TournamentByIdQueryVariables>;
export const TournamentListDocument = new TypedDocumentString(`
    query TournamentList {
  allTournaments {
    ...AllTournaments
  }
}
    fragment AllTournaments on Tournament {
  id
  name
  state
}`) as unknown as TypedDocumentString<TournamentListQuery, TournamentListQueryVariables>;
export const AuthenticatedUserDocument = new TypedDocumentString(`
    query AuthenticatedUser {
  authenticatedUser {
    ...User
  }
}
    fragment Team on Team {
  id
  name
  logo_id
  logo_path
  created_at
  contact {
    ...Contact
  }
}
fragment Contact on Contact {
  first_name
  last_name
  phone
  email
}
fragment User on User {
  id
  email
  teams {
    ...Team
  }
  role
  first_name
  last_name
}`) as unknown as TypedDocumentString<AuthenticatedUserQuery, AuthenticatedUserQueryVariables>;
export const AllUsersDocument = new TypedDocumentString(`
    query AllUsers {
  allUsers {
    ...User
  }
}
    fragment Team on Team {
  id
  name
  logo_id
  logo_path
  created_at
  contact {
    ...Contact
  }
}
fragment Contact on Contact {
  first_name
  last_name
  phone
  email
}
fragment User on User {
  id
  email
  teams {
    ...Team
  }
  role
  first_name
  last_name
}`) as unknown as TypedDocumentString<AllUsersQuery, AllUsersQueryVariables>;