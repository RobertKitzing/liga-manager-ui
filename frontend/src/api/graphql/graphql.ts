/* eslint-disable */
/* GENERATED DO NOT EDIT */
import { gql } from 'apollo-angular';
import { Injectable } from '@angular/core';
import * as Apollo from 'apollo-angular';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /**
   * The `String` scalar type represents textual data, represented as UTF-8
   * character sequences. The String type is most often used by GraphQL to
   * represent free-form human-readable text.
   */
  Date: any;
  /**
   * The `String` scalar type represents textual data, represented as UTF-8
   * character sequences. The String type is most often used by GraphQL to
   * represent free-form human-readable text.
   */
  DateTime: any;
};

export type Contact = {
  __typename?: 'Contact';
  email: Scalars['String'];
  first_name: Scalars['String'];
  last_name: Scalars['String'];
  phone: Scalars['String'];
};

export type DatePeriod = {
  from: Scalars['Date'];
  to: Scalars['Date'];
};

export type Event = {
  __typename?: 'Event';
  id: Scalars['String'];
  occurred_at: Scalars['String'];
  type: Scalars['String'];
};

export type Match = {
  __typename?: 'Match';
  cancellation_reason?: Maybe<Scalars['String']>;
  cancelled_at?: Maybe<Scalars['String']>;
  guest_score?: Maybe<Scalars['Int']>;
  guest_team: Team;
  home_score?: Maybe<Scalars['Int']>;
  home_team: Team;
  id: Scalars['String'];
  kickoff?: Maybe<Scalars['DateTime']>;
  pitch?: Maybe<Pitch>;
};

export type MatchAppointment = {
  kickoff: Scalars['DateTime'];
  pitch_id: Scalars['String'];
  unavailable_team_ids: Array<InputMaybe<Scalars['String']>>;
};

export type MatchDay = {
  __typename?: 'MatchDay';
  end_date: Scalars['String'];
  id: Scalars['String'];
  matches?: Maybe<Array<Maybe<Match>>>;
  number: Scalars['Int'];
  start_date: Scalars['String'];
};

export type Pitch = {
  __typename?: 'Pitch';
  contact?: Maybe<Contact>;
  id: Scalars['String'];
  label: Scalars['String'];
  location_latitude: Scalars['Float'];
  location_longitude: Scalars['Float'];
};

export type Ranking = {
  __typename?: 'Ranking';
  penalties?: Maybe<Array<Maybe<RankingPenalty>>>;
  positions?: Maybe<Array<Maybe<RankingPosition>>>;
  updated_at?: Maybe<Scalars['String']>;
};

export type RankingPenalty = {
  __typename?: 'RankingPenalty';
  created_at: Scalars['String'];
  id: Scalars['String'];
  points: Scalars['Int'];
  reason: Scalars['String'];
  team: Team;
};

export type RankingPosition = {
  __typename?: 'RankingPosition';
  conceded_goals: Scalars['Int'];
  draws: Scalars['Int'];
  id: Scalars['String'];
  losses: Scalars['Int'];
  matches: Scalars['Int'];
  number: Scalars['Int'];
  points: Scalars['Int'];
  scored_goals: Scalars['Int'];
  sort_index: Scalars['Int'];
  team: Team;
  wins: Scalars['Int'];
};

export type Season = {
  __typename?: 'Season';
  id: Scalars['String'];
  match_day_count: Scalars['Int'];
  match_days?: Maybe<Array<Maybe<MatchDay>>>;
  name: Scalars['String'];
  ranking?: Maybe<Ranking>;
  state: SeasonState;
  team_count: Scalars['Int'];
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
  created_at: Scalars['String'];
  id: Scalars['String'];
  logo_id?: Maybe<Scalars['String']>;
  logo_path?: Maybe<Scalars['String']>;
  name: Scalars['String'];
};

export type TeamIdPair = {
  guest_team_id: Scalars['String'];
  home_team_id: Scalars['String'];
};

export type Tournament = {
  __typename?: 'Tournament';
  id: Scalars['String'];
  name: Scalars['String'];
  rounds?: Maybe<Array<Maybe<MatchDay>>>;
};

export type User = {
  __typename?: 'User';
  email: Scalars['String'];
  first_name: Scalars['String'];
  id: Scalars['String'];
  last_name: Scalars['String'];
  role: UserRole;
  teams?: Maybe<Array<Maybe<Team>>>;
};

export enum UserRole {
  Admin = 'admin',
  TeamManager = 'team_manager'
}

export type Mutation = {
  __typename?: 'mutation';
  addRankingPenalty?: Maybe<Scalars['Boolean']>;
  addTeamToSeason?: Maybe<Scalars['Boolean']>;
  cancelMatch?: Maybe<Scalars['Boolean']>;
  changeUserPassword?: Maybe<Scalars['Boolean']>;
  createMatchesForSeason?: Maybe<Scalars['Boolean']>;
  createPitch?: Maybe<Scalars['Boolean']>;
  createSeason?: Maybe<Scalars['Boolean']>;
  createTeam?: Maybe<Scalars['Boolean']>;
  createTournament?: Maybe<Scalars['Boolean']>;
  createUser?: Maybe<Scalars['Boolean']>;
  deletePitch?: Maybe<Scalars['Boolean']>;
  deleteSeason?: Maybe<Scalars['Boolean']>;
  deleteTeam?: Maybe<Scalars['Boolean']>;
  deleteTournament?: Maybe<Scalars['Boolean']>;
  deleteUser?: Maybe<Scalars['Boolean']>;
  endSeason?: Maybe<Scalars['Boolean']>;
  invalidateAccessTokens?: Maybe<Scalars['Boolean']>;
  locateMatch?: Maybe<Scalars['Boolean']>;
  removeRankingPenalty?: Maybe<Scalars['Boolean']>;
  removeTeamFromSeason?: Maybe<Scalars['Boolean']>;
  renameTeam?: Maybe<Scalars['Boolean']>;
  replaceTeamInSeason?: Maybe<Scalars['Boolean']>;
  rescheduleMatchDay?: Maybe<Scalars['Boolean']>;
  scheduleAllMatchesForMatchDay?: Maybe<Scalars['Boolean']>;
  scheduleAllMatchesForSeason?: Maybe<Scalars['Boolean']>;
  scheduleMatch?: Maybe<Scalars['Boolean']>;
  sendInviteMail?: Maybe<Scalars['Boolean']>;
  sendPasswordResetMail?: Maybe<Scalars['Boolean']>;
  setTournamentRound?: Maybe<Scalars['Boolean']>;
  startSeason?: Maybe<Scalars['Boolean']>;
  submitMatchResult?: Maybe<Scalars['Boolean']>;
  updatePitchContact?: Maybe<Scalars['Boolean']>;
  updateTeamContact?: Maybe<Scalars['Boolean']>;
  updateUser?: Maybe<Scalars['Boolean']>;
};


export type MutationAddRankingPenaltyArgs = {
  id?: InputMaybe<Scalars['String']>;
  points: Scalars['Int'];
  reason: Scalars['String'];
  season_id: Scalars['String'];
  team_id: Scalars['String'];
};


export type MutationAddTeamToSeasonArgs = {
  season_id: Scalars['String'];
  team_id: Scalars['String'];
};


export type MutationCancelMatchArgs = {
  match_id: Scalars['String'];
  reason: Scalars['String'];
};


export type MutationChangeUserPasswordArgs = {
  new_password: Scalars['String'];
};


export type MutationCreateMatchesForSeasonArgs = {
  dates: Array<InputMaybe<DatePeriod>>;
  season_id: Scalars['String'];
};


export type MutationCreatePitchArgs = {
  id?: InputMaybe<Scalars['String']>;
  label: Scalars['String'];
  latitude: Scalars['Float'];
  longitude: Scalars['Float'];
};


export type MutationCreateSeasonArgs = {
  id?: InputMaybe<Scalars['String']>;
  name: Scalars['String'];
};


export type MutationCreateTeamArgs = {
  id?: InputMaybe<Scalars['String']>;
  name: Scalars['String'];
};


export type MutationCreateTournamentArgs = {
  id?: InputMaybe<Scalars['String']>;
  name: Scalars['String'];
};


export type MutationCreateUserArgs = {
  email: Scalars['String'];
  first_name: Scalars['String'];
  id?: InputMaybe<Scalars['String']>;
  last_name: Scalars['String'];
  password?: InputMaybe<Scalars['String']>;
  role: Scalars['String'];
  team_ids: Array<InputMaybe<Scalars['String']>>;
};


export type MutationDeletePitchArgs = {
  pitch_id: Scalars['String'];
};


export type MutationDeleteSeasonArgs = {
  season_id: Scalars['String'];
};


export type MutationDeleteTeamArgs = {
  team_id: Scalars['String'];
};


export type MutationDeleteTournamentArgs = {
  tournament_id: Scalars['String'];
};


export type MutationDeleteUserArgs = {
  user_id: Scalars['String'];
};


export type MutationEndSeasonArgs = {
  season_id: Scalars['String'];
};


export type MutationLocateMatchArgs = {
  match_id: Scalars['String'];
  pitch_id: Scalars['String'];
};


export type MutationRemoveRankingPenaltyArgs = {
  ranking_penalty_id: Scalars['String'];
  season_id: Scalars['String'];
};


export type MutationRemoveTeamFromSeasonArgs = {
  season_id: Scalars['String'];
  team_id: Scalars['String'];
};


export type MutationRenameTeamArgs = {
  new_name: Scalars['String'];
  team_id: Scalars['String'];
};


export type MutationReplaceTeamInSeasonArgs = {
  current_team_id: Scalars['String'];
  replacement_team_id: Scalars['String'];
  season_id: Scalars['String'];
};


export type MutationRescheduleMatchDayArgs = {
  date_period: DatePeriod;
  match_day_id: Scalars['String'];
};


export type MutationScheduleAllMatchesForMatchDayArgs = {
  match_appointments: Array<InputMaybe<MatchAppointment>>;
  match_day_id: Scalars['String'];
};


export type MutationScheduleAllMatchesForSeasonArgs = {
  match_appointments: Array<InputMaybe<MatchAppointment>>;
  season_id: Scalars['String'];
};


export type MutationScheduleMatchArgs = {
  kickoff: Scalars['DateTime'];
  match_id: Scalars['String'];
};


export type MutationSendInviteMailArgs = {
  target_path: Scalars['String'];
  user_id: Scalars['String'];
};


export type MutationSendPasswordResetMailArgs = {
  email: Scalars['String'];
  target_path: Scalars['String'];
};


export type MutationSetTournamentRoundArgs = {
  date_period: DatePeriod;
  round: Scalars['Int'];
  team_id_pairs: Array<InputMaybe<TeamIdPair>>;
  tournament_id: Scalars['String'];
};


export type MutationStartSeasonArgs = {
  season_id: Scalars['String'];
};


export type MutationSubmitMatchResultArgs = {
  guest_score: Scalars['Int'];
  home_score: Scalars['Int'];
  match_id: Scalars['String'];
};


export type MutationUpdatePitchContactArgs = {
  email: Scalars['String'];
  first_name: Scalars['String'];
  last_name: Scalars['String'];
  phone: Scalars['String'];
  pitch_id: Scalars['String'];
};


export type MutationUpdateTeamContactArgs = {
  email: Scalars['String'];
  first_name: Scalars['String'];
  last_name: Scalars['String'];
  phone: Scalars['String'];
  team_id: Scalars['String'];
};


export type MutationUpdateUserArgs = {
  email?: InputMaybe<Scalars['String']>;
  first_name?: InputMaybe<Scalars['String']>;
  last_name?: InputMaybe<Scalars['String']>;
  role?: InputMaybe<Scalars['String']>;
  team_ids?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  user_id: Scalars['String'];
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
  id: Scalars['String'];
};


export type QueryLatestEventsArgs = {
  end_date?: InputMaybe<Scalars['Date']>;
  start_date?: InputMaybe<Scalars['Date']>;
  type?: InputMaybe<Scalars['String']>;
};


export type QueryMatchArgs = {
  id: Scalars['String'];
};


export type QueryMatchesByKickoffArgs = {
  max_date?: InputMaybe<Scalars['DateTime']>;
  min_date?: InputMaybe<Scalars['DateTime']>;
};


export type QueryPitchArgs = {
  id: Scalars['String'];
};


export type QuerySeasonArgs = {
  id: Scalars['String'];
};


export type QueryTeamArgs = {
  id: Scalars['String'];
};


export type QueryTeamsByPatternArgs = {
  pattern: Scalars['String'];
};


export type QueryTournamentArgs = {
  id: Scalars['String'];
};

export type TeamFragment = (
  { __typename?: 'Team' }
  & Pick<Team, 'id' | 'name' | 'logo_id' | 'created_at'>
  & { contact?: Maybe<(
    { __typename?: 'Contact' }
    & Pick<Contact, 'first_name' | 'last_name' | 'phone' | 'email'>
  )> }
);

export type ContactFragment = (
  { __typename?: 'Contact' }
  & Pick<Contact, 'first_name' | 'last_name' | 'phone' | 'email'>
);

export type PitchFragment = (
  { __typename?: 'Pitch' }
  & Pick<Pitch, 'id' | 'label' | 'location_longitude' | 'location_latitude'>
  & { contact?: Maybe<(
    { __typename?: 'Contact' }
    & Pick<Contact, 'first_name' | 'last_name' | 'phone' | 'email'>
  )> }
);

export type EventFragment = (
  { __typename?: 'Event' }
  & Pick<Event, 'id' | 'occurred_at' | 'type'>
);

export type MatchFragment = (
  { __typename?: 'Match' }
  & Pick<Match, 'id' | 'home_score' | 'guest_score' | 'kickoff' | 'cancelled_at' | 'cancellation_reason'>
  & { home_team: (
    { __typename?: 'Team' }
    & Pick<Team, 'id' | 'name' | 'logo_id' | 'created_at'>
    & { contact?: Maybe<(
      { __typename?: 'Contact' }
      & Pick<Contact, 'first_name' | 'last_name' | 'phone' | 'email'>
    )> }
  ), guest_team: (
    { __typename?: 'Team' }
    & Pick<Team, 'id' | 'name' | 'logo_id' | 'created_at'>
    & { contact?: Maybe<(
      { __typename?: 'Contact' }
      & Pick<Contact, 'first_name' | 'last_name' | 'phone' | 'email'>
    )> }
  ), pitch?: Maybe<(
    { __typename?: 'Pitch' }
    & Pick<Pitch, 'id' | 'label' | 'location_longitude' | 'location_latitude'>
    & { contact?: Maybe<(
      { __typename?: 'Contact' }
      & Pick<Contact, 'first_name' | 'last_name' | 'phone' | 'email'>
    )> }
  )> }
);

export type PenaltyFragment = (
  { __typename?: 'RankingPenalty' }
  & Pick<RankingPenalty, 'id' | 'reason' | 'created_at' | 'points'>
  & { team: (
    { __typename?: 'Team' }
    & Pick<Team, 'id' | 'name' | 'logo_id' | 'created_at'>
    & { contact?: Maybe<(
      { __typename?: 'Contact' }
      & Pick<Contact, 'first_name' | 'last_name' | 'phone' | 'email'>
    )> }
  ) }
);

export type RankingFragment = (
  { __typename?: 'Season' }
  & Pick<Season, 'id'>
  & { ranking?: Maybe<(
    { __typename?: 'Ranking' }
    & Pick<Ranking, 'updated_at'>
    & { positions?: Maybe<Array<Maybe<(
      { __typename?: 'RankingPosition' }
      & Pick<RankingPosition, 'sort_index' | 'number' | 'matches' | 'wins' | 'draws' | 'losses' | 'scored_goals' | 'conceded_goals' | 'points'>
      & { team: (
        { __typename?: 'Team' }
        & Pick<Team, 'id' | 'name' | 'logo_id' | 'created_at'>
        & { contact?: Maybe<(
          { __typename?: 'Contact' }
          & Pick<Contact, 'first_name' | 'last_name' | 'phone' | 'email'>
        )> }
      ) }
    )>>>, penalties?: Maybe<Array<Maybe<(
      { __typename?: 'RankingPenalty' }
      & Pick<RankingPenalty, 'id' | 'reason' | 'created_at' | 'points'>
      & { team: (
        { __typename?: 'Team' }
        & Pick<Team, 'id' | 'name' | 'logo_id' | 'created_at'>
        & { contact?: Maybe<(
          { __typename?: 'Contact' }
          & Pick<Contact, 'first_name' | 'last_name' | 'phone' | 'email'>
        )> }
      ) }
    )>>> }
  )> }
);

export type AllSeasonsFragment = (
  { __typename?: 'Season' }
  & Pick<Season, 'id' | 'name' | 'state'>
  & { match_days?: Maybe<Array<Maybe<(
    { __typename?: 'MatchDay' }
    & Pick<MatchDay, 'number' | 'start_date'>
  )>>> }
);

export type AllSeasonsHoFFragment = (
  { __typename?: 'Season' }
  & Pick<Season, 'id' | 'name' | 'state'>
  & { match_days?: Maybe<Array<Maybe<(
    { __typename?: 'MatchDay' }
    & Pick<MatchDay, 'number' | 'start_date'>
  )>>>, ranking?: Maybe<(
    { __typename?: 'Ranking' }
    & { positions?: Maybe<Array<Maybe<(
      { __typename?: 'RankingPosition' }
      & Pick<RankingPosition, 'sort_index'>
      & { team: (
        { __typename?: 'Team' }
        & Pick<Team, 'id' | 'name' | 'logo_id'>
      ) }
    )>>> }
  )> }
);

export type SeasonFragment = (
  { __typename?: 'Season' }
  & Pick<Season, 'id' | 'name' | 'state'>
  & { teams?: Maybe<Array<Maybe<(
    { __typename?: 'Team' }
    & Pick<Team, 'id' | 'name' | 'logo_id' | 'created_at'>
    & { contact?: Maybe<(
      { __typename?: 'Contact' }
      & Pick<Contact, 'first_name' | 'last_name' | 'phone' | 'email'>
    )> }
  )>>>, match_days?: Maybe<Array<Maybe<(
    { __typename?: 'MatchDay' }
    & Pick<MatchDay, 'id' | 'number' | 'start_date' | 'end_date'>
    & { matches?: Maybe<Array<Maybe<(
      { __typename?: 'Match' }
      & Pick<Match, 'id' | 'home_score' | 'guest_score' | 'kickoff' | 'cancelled_at' | 'cancellation_reason'>
      & { home_team: (
        { __typename?: 'Team' }
        & Pick<Team, 'id' | 'name' | 'logo_id' | 'created_at'>
        & { contact?: Maybe<(
          { __typename?: 'Contact' }
          & Pick<Contact, 'first_name' | 'last_name' | 'phone' | 'email'>
        )> }
      ), guest_team: (
        { __typename?: 'Team' }
        & Pick<Team, 'id' | 'name' | 'logo_id' | 'created_at'>
        & { contact?: Maybe<(
          { __typename?: 'Contact' }
          & Pick<Contact, 'first_name' | 'last_name' | 'phone' | 'email'>
        )> }
      ), pitch?: Maybe<(
        { __typename?: 'Pitch' }
        & Pick<Pitch, 'id' | 'label' | 'location_longitude' | 'location_latitude'>
        & { contact?: Maybe<(
          { __typename?: 'Contact' }
          & Pick<Contact, 'first_name' | 'last_name' | 'phone' | 'email'>
        )> }
      )> }
    )>>> }
  )>>> }
);

export type MatchDayFragment = (
  { __typename?: 'MatchDay' }
  & Pick<MatchDay, 'id' | 'number' | 'start_date' | 'end_date'>
  & { matches?: Maybe<Array<Maybe<(
    { __typename?: 'Match' }
    & Pick<Match, 'id' | 'home_score' | 'guest_score' | 'kickoff' | 'cancelled_at' | 'cancellation_reason'>
    & { home_team: (
      { __typename?: 'Team' }
      & Pick<Team, 'id' | 'name' | 'logo_id' | 'created_at'>
      & { contact?: Maybe<(
        { __typename?: 'Contact' }
        & Pick<Contact, 'first_name' | 'last_name' | 'phone' | 'email'>
      )> }
    ), guest_team: (
      { __typename?: 'Team' }
      & Pick<Team, 'id' | 'name' | 'logo_id' | 'created_at'>
      & { contact?: Maybe<(
        { __typename?: 'Contact' }
        & Pick<Contact, 'first_name' | 'last_name' | 'phone' | 'email'>
      )> }
    ), pitch?: Maybe<(
      { __typename?: 'Pitch' }
      & Pick<Pitch, 'id' | 'label' | 'location_longitude' | 'location_latitude'>
      & { contact?: Maybe<(
        { __typename?: 'Contact' }
        & Pick<Contact, 'first_name' | 'last_name' | 'phone' | 'email'>
      )> }
    )> }
  )>>> }
);

export type AllTournamentsFragment = (
  { __typename?: 'Tournament' }
  & Pick<Tournament, 'id' | 'name'>
);

export type TournamentFragment = (
  { __typename?: 'Tournament' }
  & Pick<Tournament, 'id' | 'name'>
  & { rounds?: Maybe<Array<Maybe<(
    { __typename?: 'MatchDay' }
    & Pick<MatchDay, 'id' | 'number' | 'start_date' | 'end_date'>
    & { matches?: Maybe<Array<Maybe<(
      { __typename?: 'Match' }
      & Pick<Match, 'id' | 'home_score' | 'guest_score' | 'kickoff' | 'cancelled_at' | 'cancellation_reason'>
      & { home_team: (
        { __typename?: 'Team' }
        & Pick<Team, 'id' | 'name' | 'logo_id' | 'created_at'>
        & { contact?: Maybe<(
          { __typename?: 'Contact' }
          & Pick<Contact, 'first_name' | 'last_name' | 'phone' | 'email'>
        )> }
      ), guest_team: (
        { __typename?: 'Team' }
        & Pick<Team, 'id' | 'name' | 'logo_id' | 'created_at'>
        & { contact?: Maybe<(
          { __typename?: 'Contact' }
          & Pick<Contact, 'first_name' | 'last_name' | 'phone' | 'email'>
        )> }
      ), pitch?: Maybe<(
        { __typename?: 'Pitch' }
        & Pick<Pitch, 'id' | 'label' | 'location_longitude' | 'location_latitude'>
        & { contact?: Maybe<(
          { __typename?: 'Contact' }
          & Pick<Contact, 'first_name' | 'last_name' | 'phone' | 'email'>
        )> }
      )> }
    )>>> }
  )>>> }
);

export type UserFragment = (
  { __typename?: 'User' }
  & Pick<User, 'id' | 'email' | 'role' | 'first_name' | 'last_name'>
  & { teams?: Maybe<Array<Maybe<(
    { __typename?: 'Team' }
    & Pick<Team, 'id' | 'name' | 'logo_id' | 'created_at'>
    & { contact?: Maybe<(
      { __typename?: 'Contact' }
      & Pick<Contact, 'first_name' | 'last_name' | 'phone' | 'email'>
    )> }
  )>>> }
);

export type SubmitResultMutationVariables = Exact<{
  match_id: Scalars['String'];
  home_score: Scalars['Int'];
  guest_score: Scalars['Int'];
}>;


export type SubmitResultMutation = Pick<Mutation, 'submitMatchResult'>;

export type ScheduleMatchMutationVariables = Exact<{
  match_id: Scalars['String'];
  kickoff: Scalars['DateTime'];
}>;


export type ScheduleMatchMutation = Pick<Mutation, 'scheduleMatch'>;

export type LocateMatchMutationVariables = Exact<{
  match_id: Scalars['String'];
  pitch_id: Scalars['String'];
}>;


export type LocateMatchMutation = Pick<Mutation, 'locateMatch'>;

export type CancelMatchMutationVariables = Exact<{
  match_id: Scalars['String'];
  reason: Scalars['String'];
}>;


export type CancelMatchMutation = Pick<Mutation, 'cancelMatch'>;

export type ScheduleAllMatchesForSeasonMutationVariables = Exact<{
  season_id: Scalars['String'];
  match_appointments: Array<InputMaybe<MatchAppointment>> | InputMaybe<MatchAppointment>;
}>;


export type ScheduleAllMatchesForSeasonMutation = Pick<Mutation, 'scheduleAllMatchesForSeason'>;

export type ScheduleAllMatchesForMatchDayMutationVariables = Exact<{
  match_day_id: Scalars['String'];
  match_appointments: Array<InputMaybe<MatchAppointment>> | InputMaybe<MatchAppointment>;
}>;


export type ScheduleAllMatchesForMatchDayMutation = Pick<Mutation, 'scheduleAllMatchesForMatchDay'>;

export type PasswordResetMutationVariables = Exact<{
  email: Scalars['String'];
  target_path: Scalars['String'];
}>;


export type PasswordResetMutation = Pick<Mutation, 'sendPasswordResetMail'>;

export type PasswordChangeMutationVariables = Exact<{
  new_password: Scalars['String'];
}>;


export type PasswordChangeMutation = Pick<Mutation, 'changeUserPassword'>;

export type AddRankingPenaltyMutationVariables = Exact<{
  id: Scalars['String'];
  season_id: Scalars['String'];
  team_id: Scalars['String'];
  reason: Scalars['String'];
  points: Scalars['Int'];
}>;


export type AddRankingPenaltyMutation = Pick<Mutation, 'addRankingPenalty'>;

export type RemoveRankingPenaltyMutationVariables = Exact<{
  ranking_penalty_id: Scalars['String'];
  season_id: Scalars['String'];
}>;


export type RemoveRankingPenaltyMutation = Pick<Mutation, 'removeRankingPenalty'>;

export type DeletePitchMutationVariables = Exact<{
  pitch_id: Scalars['String'];
}>;


export type DeletePitchMutation = Pick<Mutation, 'deletePitch'>;

export type UpdatePitchContactMutationVariables = Exact<{
  pitch_id: Scalars['String'];
  first_name: Scalars['String'];
  last_name: Scalars['String'];
  phone: Scalars['String'];
  email: Scalars['String'];
}>;


export type UpdatePitchContactMutation = Pick<Mutation, 'updatePitchContact'>;

export type CreatePitchMutationVariables = Exact<{
  id: Scalars['String'];
  label: Scalars['String'];
  longitude: Scalars['Float'];
  latitude: Scalars['Float'];
}>;


export type CreatePitchMutation = Pick<Mutation, 'createPitch'>;

export type CreateSeasonMutationVariables = Exact<{
  id?: InputMaybe<Scalars['String']>;
  name: Scalars['String'];
}>;


export type CreateSeasonMutation = Pick<Mutation, 'createSeason'>;

export type AddTeamToSeasonMutationVariables = Exact<{
  season_id: Scalars['String'];
  team_id: Scalars['String'];
}>;


export type AddTeamToSeasonMutation = Pick<Mutation, 'addTeamToSeason'>;

export type RemoveTeamFromSeasonMutationVariables = Exact<{
  season_id: Scalars['String'];
  team_id: Scalars['String'];
}>;


export type RemoveTeamFromSeasonMutation = Pick<Mutation, 'removeTeamFromSeason'>;

export type CreateMatchesForSeasonMutationVariables = Exact<{
  season_id: Scalars['String'];
  dates: Array<InputMaybe<DatePeriod>> | InputMaybe<DatePeriod>;
}>;


export type CreateMatchesForSeasonMutation = Pick<Mutation, 'createMatchesForSeason'>;

export type RescheduleMatchDayMutationVariables = Exact<{
  match_day_id: Scalars['String'];
  date_period: DatePeriod;
}>;


export type RescheduleMatchDayMutation = Pick<Mutation, 'rescheduleMatchDay'>;

export type StartSeasonMutationVariables = Exact<{
  id: Scalars['String'];
}>;


export type StartSeasonMutation = Pick<Mutation, 'startSeason'>;

export type EndSeasonMutationVariables = Exact<{
  season_id: Scalars['String'];
}>;


export type EndSeasonMutation = Pick<Mutation, 'endSeason'>;

export type DeleteSeasonMutationVariables = Exact<{
  season_id: Scalars['String'];
}>;


export type DeleteSeasonMutation = Pick<Mutation, 'deleteSeason'>;

export type ReplaceTeamInSeasonMutationVariables = Exact<{
  season_id: Scalars['String'];
  current_team_id: Scalars['String'];
  replacement_team_id: Scalars['String'];
}>;


export type ReplaceTeamInSeasonMutation = Pick<Mutation, 'replaceTeamInSeason'>;

export type CreateTeamMutationVariables = Exact<{
  id: Scalars['String'];
  name: Scalars['String'];
}>;


export type CreateTeamMutation = Pick<Mutation, 'createTeam'>;

export type UpdateTeamContactMutationVariables = Exact<{
  team_id: Scalars['String'];
  first_name: Scalars['String'];
  last_name: Scalars['String'];
  phone: Scalars['String'];
  email: Scalars['String'];
}>;


export type UpdateTeamContactMutation = Pick<Mutation, 'updateTeamContact'>;

export type RenameTeamMutationVariables = Exact<{
  team_id: Scalars['String'];
  new_name: Scalars['String'];
}>;


export type RenameTeamMutation = Pick<Mutation, 'renameTeam'>;

export type DeleteTeamMutationVariables = Exact<{
  team_id: Scalars['String'];
}>;


export type DeleteTeamMutation = Pick<Mutation, 'deleteTeam'>;

export type CreateTournamentMutationVariables = Exact<{
  id?: InputMaybe<Scalars['String']>;
  name: Scalars['String'];
}>;


export type CreateTournamentMutation = Pick<Mutation, 'createTournament'>;

export type CreateTournamentRoundMutationVariables = Exact<{
  tournament_id: Scalars['String'];
  round: Scalars['Int'];
  team_id_pairs: Array<InputMaybe<TeamIdPair>> | InputMaybe<TeamIdPair>;
  date_period: DatePeriod;
}>;


export type CreateTournamentRoundMutation = Pick<Mutation, 'setTournamentRound'>;

export type DeleteTournamentMutationVariables = Exact<{
  tournament_id: Scalars['String'];
}>;


export type DeleteTournamentMutation = Pick<Mutation, 'deleteTournament'>;

export type CreateUserMutationVariables = Exact<{
  user_id?: InputMaybe<Scalars['String']>;
  email: Scalars['String'];
  password: Scalars['String'];
  first_name: Scalars['String'];
  last_name: Scalars['String'];
  role: Scalars['String'];
  team_ids: Array<InputMaybe<Scalars['String']>> | InputMaybe<Scalars['String']>;
}>;


export type CreateUserMutation = Pick<Mutation, 'createUser'>;

export type UpdateUserMutationVariables = Exact<{
  user_id: Scalars['String'];
  email?: InputMaybe<Scalars['String']>;
  first_name?: InputMaybe<Scalars['String']>;
  last_name?: InputMaybe<Scalars['String']>;
  role?: InputMaybe<Scalars['String']>;
  team_ids?: InputMaybe<Array<InputMaybe<Scalars['String']>> | InputMaybe<Scalars['String']>>;
}>;


export type UpdateUserMutation = Pick<Mutation, 'updateUser'>;

export type DeleteUserMutationVariables = Exact<{
  user_id: Scalars['String'];
}>;


export type DeleteUserMutation = Pick<Mutation, 'deleteUser'>;

export type CalendarQueryVariables = Exact<{
  min_date?: InputMaybe<Scalars['DateTime']>;
  max_date?: InputMaybe<Scalars['DateTime']>;
}>;


export type CalendarQuery = { allSeasons?: Maybe<Array<Maybe<(
    { __typename?: 'Season' }
    & Pick<Season, 'id' | 'name' | 'state'>
    & { match_days?: Maybe<Array<Maybe<(
      { __typename?: 'MatchDay' }
      & Pick<MatchDay, 'number' | 'start_date' | 'end_date'>
    )>>> }
  )>>>, allTournaments?: Maybe<Array<Maybe<(
    { __typename?: 'Tournament' }
    & Pick<Tournament, 'id' | 'name'>
    & { rounds?: Maybe<Array<Maybe<(
      { __typename?: 'MatchDay' }
      & Pick<MatchDay, 'number' | 'start_date' | 'end_date'>
    )>>> }
  )>>>, matchesByKickoff?: Maybe<Array<Maybe<(
    { __typename?: 'Match' }
    & Pick<Match, 'id' | 'kickoff' | 'home_score' | 'guest_score' | 'cancelled_at' | 'cancellation_reason'>
    & { home_team: (
      { __typename?: 'Team' }
      & Pick<Team, 'id' | 'name' | 'logo_id' | 'created_at'>
      & { contact?: Maybe<(
        { __typename?: 'Contact' }
        & Pick<Contact, 'first_name' | 'last_name' | 'phone' | 'email'>
      )> }
    ), guest_team: (
      { __typename?: 'Team' }
      & Pick<Team, 'id' | 'name' | 'logo_id' | 'created_at'>
      & { contact?: Maybe<(
        { __typename?: 'Contact' }
        & Pick<Contact, 'first_name' | 'last_name' | 'phone' | 'email'>
      )> }
    ), pitch?: Maybe<(
      { __typename?: 'Pitch' }
      & Pick<Pitch, 'id' | 'label' | 'location_longitude' | 'location_latitude'>
      & { contact?: Maybe<(
        { __typename?: 'Contact' }
        & Pick<Contact, 'first_name' | 'last_name' | 'phone' | 'email'>
      )> }
    )> }
  )>>> };

export type AllEventQueryVariables = Exact<{
  id: Scalars['String'];
}>;


export type AllEventQuery = { event?: Maybe<(
    { __typename?: 'Event' }
    & Pick<Event, 'id' | 'occurred_at' | 'type'>
  )> };

export type LatestEventQueryVariables = Exact<{
  start_date?: InputMaybe<Scalars['Date']>;
  end_date?: InputMaybe<Scalars['Date']>;
  type?: InputMaybe<Scalars['String']>;
}>;


export type LatestEventQuery = { latestEvents?: Maybe<Array<Maybe<(
    { __typename?: 'Event' }
    & Pick<Event, 'id' | 'occurred_at' | 'type'>
  )>>> };

export type MatchByIdQueryVariables = Exact<{
  id: Scalars['String'];
}>;


export type MatchByIdQuery = { match?: Maybe<(
    { __typename?: 'Match' }
    & Pick<Match, 'id' | 'home_score' | 'guest_score' | 'kickoff' | 'cancelled_at' | 'cancellation_reason'>
    & { home_team: (
      { __typename?: 'Team' }
      & Pick<Team, 'id' | 'name' | 'logo_id' | 'created_at'>
      & { contact?: Maybe<(
        { __typename?: 'Contact' }
        & Pick<Contact, 'first_name' | 'last_name' | 'phone' | 'email'>
      )> }
    ), guest_team: (
      { __typename?: 'Team' }
      & Pick<Team, 'id' | 'name' | 'logo_id' | 'created_at'>
      & { contact?: Maybe<(
        { __typename?: 'Contact' }
        & Pick<Contact, 'first_name' | 'last_name' | 'phone' | 'email'>
      )> }
    ), pitch?: Maybe<(
      { __typename?: 'Pitch' }
      & Pick<Pitch, 'id' | 'label' | 'location_longitude' | 'location_latitude'>
      & { contact?: Maybe<(
        { __typename?: 'Contact' }
        & Pick<Contact, 'first_name' | 'last_name' | 'phone' | 'email'>
      )> }
    )> }
  )> };

export type SeasonPenaltiesQueryVariables = Exact<{
  id: Scalars['String'];
}>;


export type SeasonPenaltiesQuery = { season?: Maybe<(
    { __typename?: 'Season' }
    & Pick<Season, 'id'>
    & { teams?: Maybe<Array<Maybe<(
      { __typename?: 'Team' }
      & Pick<Team, 'id' | 'name' | 'logo_id' | 'created_at'>
      & { contact?: Maybe<(
        { __typename?: 'Contact' }
        & Pick<Contact, 'first_name' | 'last_name' | 'phone' | 'email'>
      )> }
    )>>>, ranking?: Maybe<(
      { __typename?: 'Ranking' }
      & { penalties?: Maybe<Array<Maybe<(
        { __typename?: 'RankingPenalty' }
        & Pick<RankingPenalty, 'id' | 'reason' | 'created_at' | 'points'>
        & { team: (
          { __typename?: 'Team' }
          & Pick<Team, 'id' | 'name' | 'logo_id' | 'created_at'>
          & { contact?: Maybe<(
            { __typename?: 'Contact' }
            & Pick<Contact, 'first_name' | 'last_name' | 'phone' | 'email'>
          )> }
        ) }
      )>>> }
    )> }
  )> };

export type PitchesQueryVariables = Exact<{ [key: string]: never; }>;


export type PitchesQuery = { allPitches?: Maybe<Array<Maybe<(
    { __typename?: 'Pitch' }
    & Pick<Pitch, 'id' | 'label' | 'location_longitude' | 'location_latitude'>
    & { contact?: Maybe<(
      { __typename?: 'Contact' }
      & Pick<Contact, 'first_name' | 'last_name' | 'phone' | 'email'>
    )> }
  )>>> };

export type RankingByIdQueryVariables = Exact<{
  id: Scalars['String'];
}>;


export type RankingByIdQuery = { season?: Maybe<(
    { __typename?: 'Season' }
    & Pick<Season, 'id'>
    & { ranking?: Maybe<(
      { __typename?: 'Ranking' }
      & Pick<Ranking, 'updated_at'>
      & { positions?: Maybe<Array<Maybe<(
        { __typename?: 'RankingPosition' }
        & Pick<RankingPosition, 'sort_index' | 'number' | 'matches' | 'wins' | 'draws' | 'losses' | 'scored_goals' | 'conceded_goals' | 'points'>
        & { team: (
          { __typename?: 'Team' }
          & Pick<Team, 'id' | 'name' | 'logo_id' | 'created_at'>
          & { contact?: Maybe<(
            { __typename?: 'Contact' }
            & Pick<Contact, 'first_name' | 'last_name' | 'phone' | 'email'>
          )> }
        ) }
      )>>>, penalties?: Maybe<Array<Maybe<(
        { __typename?: 'RankingPenalty' }
        & Pick<RankingPenalty, 'id' | 'reason' | 'created_at' | 'points'>
        & { team: (
          { __typename?: 'Team' }
          & Pick<Team, 'id' | 'name' | 'logo_id' | 'created_at'>
          & { contact?: Maybe<(
            { __typename?: 'Contact' }
            & Pick<Contact, 'first_name' | 'last_name' | 'phone' | 'email'>
          )> }
        ) }
      )>>> }
    )> }
  )> };

export type AllSeasonsListQueryVariables = Exact<{ [key: string]: never; }>;


export type AllSeasonsListQuery = { allSeasons?: Maybe<Array<Maybe<(
    { __typename?: 'Season' }
    & Pick<Season, 'id' | 'name' | 'state'>
    & { match_days?: Maybe<Array<Maybe<(
      { __typename?: 'MatchDay' }
      & Pick<MatchDay, 'number' | 'start_date'>
    )>>> }
  )>>> };

export type HallOfFameQueryVariables = Exact<{ [key: string]: never; }>;


export type HallOfFameQuery = { allSeasons?: Maybe<Array<Maybe<(
    { __typename?: 'Season' }
    & Pick<Season, 'id' | 'name' | 'state'>
    & { match_days?: Maybe<Array<Maybe<(
      { __typename?: 'MatchDay' }
      & Pick<MatchDay, 'number' | 'start_date'>
    )>>>, ranking?: Maybe<(
      { __typename?: 'Ranking' }
      & { positions?: Maybe<Array<Maybe<(
        { __typename?: 'RankingPosition' }
        & Pick<RankingPosition, 'sort_index'>
        & { team: (
          { __typename?: 'Team' }
          & Pick<Team, 'id' | 'name' | 'logo_id'>
        ) }
      )>>> }
    )> }
  )>>> };

export type SeasonByIdQueryVariables = Exact<{
  id: Scalars['String'];
}>;


export type SeasonByIdQuery = { season?: Maybe<(
    { __typename?: 'Season' }
    & Pick<Season, 'id' | 'name' | 'state'>
    & { teams?: Maybe<Array<Maybe<(
      { __typename?: 'Team' }
      & Pick<Team, 'id' | 'name' | 'logo_id' | 'created_at'>
      & { contact?: Maybe<(
        { __typename?: 'Contact' }
        & Pick<Contact, 'first_name' | 'last_name' | 'phone' | 'email'>
      )> }
    )>>>, match_days?: Maybe<Array<Maybe<(
      { __typename?: 'MatchDay' }
      & Pick<MatchDay, 'id' | 'number' | 'start_date' | 'end_date'>
      & { matches?: Maybe<Array<Maybe<(
        { __typename?: 'Match' }
        & Pick<Match, 'id' | 'home_score' | 'guest_score' | 'kickoff' | 'cancelled_at' | 'cancellation_reason'>
        & { home_team: (
          { __typename?: 'Team' }
          & Pick<Team, 'id' | 'name' | 'logo_id' | 'created_at'>
          & { contact?: Maybe<(
            { __typename?: 'Contact' }
            & Pick<Contact, 'first_name' | 'last_name' | 'phone' | 'email'>
          )> }
        ), guest_team: (
          { __typename?: 'Team' }
          & Pick<Team, 'id' | 'name' | 'logo_id' | 'created_at'>
          & { contact?: Maybe<(
            { __typename?: 'Contact' }
            & Pick<Contact, 'first_name' | 'last_name' | 'phone' | 'email'>
          )> }
        ), pitch?: Maybe<(
          { __typename?: 'Pitch' }
          & Pick<Pitch, 'id' | 'label' | 'location_longitude' | 'location_latitude'>
          & { contact?: Maybe<(
            { __typename?: 'Contact' }
            & Pick<Contact, 'first_name' | 'last_name' | 'phone' | 'email'>
          )> }
        )> }
      )>>> }
    )>>> }
  )> };

export type AllTeamsQueryVariables = Exact<{ [key: string]: never; }>;


export type AllTeamsQuery = { allTeams?: Maybe<Array<Maybe<(
    { __typename?: 'Team' }
    & Pick<Team, 'id' | 'name' | 'logo_id' | 'created_at'>
    & { contact?: Maybe<(
      { __typename?: 'Contact' }
      & Pick<Contact, 'first_name' | 'last_name' | 'phone' | 'email'>
    )> }
  )>>> };

export type TeamByIdQueryVariables = Exact<{
  id: Scalars['String'];
}>;


export type TeamByIdQuery = { team?: Maybe<(
    { __typename?: 'Team' }
    & Pick<Team, 'id' | 'name' | 'logo_id' | 'created_at'>
    & { contact?: Maybe<(
      { __typename?: 'Contact' }
      & Pick<Contact, 'first_name' | 'last_name' | 'phone' | 'email'>
    )> }
  )> };

export type AllTournamentListQueryVariables = Exact<{ [key: string]: never; }>;


export type AllTournamentListQuery = { allTournaments?: Maybe<Array<Maybe<(
    { __typename?: 'Tournament' }
    & Pick<Tournament, 'id' | 'name'>
  )>>> };

export type TournamentByIdQueryVariables = Exact<{
  id: Scalars['String'];
}>;


export type TournamentByIdQuery = { tournament?: Maybe<(
    { __typename?: 'Tournament' }
    & Pick<Tournament, 'id' | 'name'>
    & { rounds?: Maybe<Array<Maybe<(
      { __typename?: 'MatchDay' }
      & Pick<MatchDay, 'id' | 'number' | 'start_date' | 'end_date'>
      & { matches?: Maybe<Array<Maybe<(
        { __typename?: 'Match' }
        & Pick<Match, 'id' | 'home_score' | 'guest_score' | 'kickoff' | 'cancelled_at' | 'cancellation_reason'>
        & { home_team: (
          { __typename?: 'Team' }
          & Pick<Team, 'id' | 'name' | 'logo_id' | 'created_at'>
          & { contact?: Maybe<(
            { __typename?: 'Contact' }
            & Pick<Contact, 'first_name' | 'last_name' | 'phone' | 'email'>
          )> }
        ), guest_team: (
          { __typename?: 'Team' }
          & Pick<Team, 'id' | 'name' | 'logo_id' | 'created_at'>
          & { contact?: Maybe<(
            { __typename?: 'Contact' }
            & Pick<Contact, 'first_name' | 'last_name' | 'phone' | 'email'>
          )> }
        ), pitch?: Maybe<(
          { __typename?: 'Pitch' }
          & Pick<Pitch, 'id' | 'label' | 'location_longitude' | 'location_latitude'>
          & { contact?: Maybe<(
            { __typename?: 'Contact' }
            & Pick<Contact, 'first_name' | 'last_name' | 'phone' | 'email'>
          )> }
        )> }
      )>>> }
    )>>> }
  )> };

export type AuthenticatedUserQueryVariables = Exact<{ [key: string]: never; }>;


export type AuthenticatedUserQuery = { authenticatedUser?: Maybe<(
    { __typename?: 'User' }
    & Pick<User, 'id' | 'email' | 'role' | 'first_name' | 'last_name'>
    & { teams?: Maybe<Array<Maybe<(
      { __typename?: 'Team' }
      & Pick<Team, 'id' | 'name' | 'logo_id' | 'created_at'>
      & { contact?: Maybe<(
        { __typename?: 'Contact' }
        & Pick<Contact, 'first_name' | 'last_name' | 'phone' | 'email'>
      )> }
    )>>> }
  )> };

export type AllUsersQueryVariables = Exact<{ [key: string]: never; }>;


export type AllUsersQuery = { allUsers?: Maybe<Array<Maybe<(
    { __typename?: 'User' }
    & Pick<User, 'id' | 'email' | 'role' | 'first_name' | 'last_name'>
    & { teams?: Maybe<Array<Maybe<(
      { __typename?: 'Team' }
      & Pick<Team, 'id' | 'name' | 'logo_id' | 'created_at'>
      & { contact?: Maybe<(
        { __typename?: 'Contact' }
        & Pick<Contact, 'first_name' | 'last_name' | 'phone' | 'email'>
      )> }
    )>>> }
  )>>> };

export const ContactFragmentDoc = gql`
    fragment Contact on Contact {
  first_name
  last_name
  phone
  email
}
    `;
export const TeamFragmentDoc = gql`
    fragment Team on Team {
  id
  name
  logo_id
  created_at
  contact {
    ...Contact
  }
}
    ${ContactFragmentDoc}`;
export const PitchFragmentDoc = gql`
    fragment Pitch on Pitch {
  id
  label
  location_longitude
  location_latitude
  contact {
    ...Contact
  }
}
    ${ContactFragmentDoc}`;
export const MatchFragmentDoc = gql`
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
    ${TeamFragmentDoc}
${PitchFragmentDoc}`;
export const MatchDayFragmentDoc = gql`
    fragment MatchDay on MatchDay {
  id
  number
  start_date
  end_date
  matches {
    ...Match
  }
}
    ${MatchFragmentDoc}`;
export const SeasonFragmentDoc = gql`
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
    ${TeamFragmentDoc}
${MatchDayFragmentDoc}`;
export const AllSeasonsFragmentDoc = gql`
    fragment AllSeasons on Season {
  id
  name
  state
  match_days {
    number
    start_date
  }
}
    `;
export const AllSeasonsHoFFragmentDoc = gql`
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
        id
        name
        logo_id
      }
      sort_index
    }
  }
}
    `;
export const AllSeasonsCalendarFragmentDoc = gql`
    fragment AllSeasonsCalendar on Season {
  id
  name
  state
  match_days {
    ...MatchDay
  }
}
    ${MatchDayFragmentDoc}`;
export const AllTournamentsFragmentDoc = gql`
    fragment AllTournaments on Tournament {
  id
  name
}
    `;
export const AllTournamentsCalendarFragmentDoc = gql`
    fragment AllTournamentsCalendar on Tournament {
  id
  name
  rounds {
    ...MatchDay
  }
}
    ${MatchDayFragmentDoc}`;
export const TournamentFragmentDoc = gql`
    fragment Tournament on Tournament {
  id
  name
  rounds {
    ...MatchDay
  }
}
    ${MatchDayFragmentDoc}`;
export const UserFragmentDoc = gql`
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
    ${TeamFragmentDoc}`;
export const EventFragmentDoc = gql`
    fragment Event on Event {
  id
  occurred_at
  type
}
    `;
export const PenaltyFragmentDoc = gql`
    fragment Penalty on RankingPenalty {
  id
  team {
    ...Team
  }
  reason
  created_at
  points
}
    ${TeamFragmentDoc}`;
export const RankingFragmentDoc = gql`
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
    ${TeamFragmentDoc}
${PenaltyFragmentDoc}`;
export const SubmitResultDocument = gql`
    mutation SubmitResult($match_id: String!, $home_score: Int!, $guest_score: Int!) {
  submitMatchResult(
    match_id: $match_id
    home_score: $home_score
    guest_score: $guest_score
  )
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class SubmitResultGQL extends Apollo.Mutation<SubmitResultMutation, SubmitResultMutationVariables> {
    override document = SubmitResultDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const ScheduleMatchDocument = gql`
    mutation ScheduleMatch($match_id: String!, $kickoff: DateTime!) {
  scheduleMatch(match_id: $match_id, kickoff: $kickoff)
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class ScheduleMatchGQL extends Apollo.Mutation<ScheduleMatchMutation, ScheduleMatchMutationVariables> {
    override document = ScheduleMatchDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const LocateMatchDocument = gql`
    mutation LocateMatch($match_id: String!, $pitch_id: String!) {
  locateMatch(match_id: $match_id, pitch_id: $pitch_id)
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class LocateMatchGQL extends Apollo.Mutation<LocateMatchMutation, LocateMatchMutationVariables> {
    override document = LocateMatchDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const CancelMatchDocument = gql`
    mutation CancelMatch($match_id: String!, $reason: String!) {
  cancelMatch(match_id: $match_id, reason: $reason)
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class CancelMatchGQL extends Apollo.Mutation<CancelMatchMutation, CancelMatchMutationVariables> {
    override document = CancelMatchDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const ScheduleAllMatchesForSeasonDocument = gql`
    mutation ScheduleAllMatchesForSeason($season_id: String!, $match_appointments: [MatchAppointment]!) {
  scheduleAllMatchesForSeason(
    season_id: $season_id
    match_appointments: $match_appointments
  )
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class ScheduleAllMatchesForSeasonGQL extends Apollo.Mutation<ScheduleAllMatchesForSeasonMutation, ScheduleAllMatchesForSeasonMutationVariables> {
    override document = ScheduleAllMatchesForSeasonDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const ScheduleAllMatchesForMatchDayDocument = gql`
    mutation ScheduleAllMatchesForMatchDay($match_day_id: String!, $match_appointments: [MatchAppointment]!) {
  scheduleAllMatchesForMatchDay(
    match_day_id: $match_day_id
    match_appointments: $match_appointments
  )
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class ScheduleAllMatchesForMatchDayGQL extends Apollo.Mutation<ScheduleAllMatchesForMatchDayMutation, ScheduleAllMatchesForMatchDayMutationVariables> {
    override document = ScheduleAllMatchesForMatchDayDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const PasswordResetDocument = gql`
    mutation PasswordReset($email: String!, $target_path: String!) {
  sendPasswordResetMail(email: $email, target_path: $target_path)
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class PasswordResetGQL extends Apollo.Mutation<PasswordResetMutation, PasswordResetMutationVariables> {
    override document = PasswordResetDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const PasswordChangeDocument = gql`
    mutation PasswordChange($new_password: String!) {
  changeUserPassword(new_password: $new_password)
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class PasswordChangeGQL extends Apollo.Mutation<PasswordChangeMutation, PasswordChangeMutationVariables> {
    override document = PasswordChangeDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const AddRankingPenaltyDocument = gql`
    mutation AddRankingPenalty($id: String!, $season_id: String!, $team_id: String!, $reason: String!, $points: Int!) {
  addRankingPenalty(
    id: $id
    season_id: $season_id
    team_id: $team_id
    reason: $reason
    points: $points
  )
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class AddRankingPenaltyGQL extends Apollo.Mutation<AddRankingPenaltyMutation, AddRankingPenaltyMutationVariables> {
    override document = AddRankingPenaltyDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const RemoveRankingPenaltyDocument = gql`
    mutation RemoveRankingPenalty($ranking_penalty_id: String!, $season_id: String!) {
  removeRankingPenalty(
    ranking_penalty_id: $ranking_penalty_id
    season_id: $season_id
  )
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class RemoveRankingPenaltyGQL extends Apollo.Mutation<RemoveRankingPenaltyMutation, RemoveRankingPenaltyMutationVariables> {
    override document = RemoveRankingPenaltyDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const DeletePitchDocument = gql`
    mutation DeletePitch($pitch_id: String!) {
  deletePitch(pitch_id: $pitch_id)
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class DeletePitchGQL extends Apollo.Mutation<DeletePitchMutation, DeletePitchMutationVariables> {
    override document = DeletePitchDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const UpdatePitchContactDocument = gql`
    mutation UpdatePitchContact($pitch_id: String!, $first_name: String!, $last_name: String!, $phone: String!, $email: String!) {
  updatePitchContact(
    pitch_id: $pitch_id
    first_name: $first_name
    last_name: $last_name
    phone: $phone
    email: $email
  )
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class UpdatePitchContactGQL extends Apollo.Mutation<UpdatePitchContactMutation, UpdatePitchContactMutationVariables> {
    override document = UpdatePitchContactDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const CreatePitchDocument = gql`
    mutation CreatePitch($id: String!, $label: String!, $longitude: Float!, $latitude: Float!) {
  createPitch(id: $id, label: $label, longitude: $longitude, latitude: $latitude)
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class CreatePitchGQL extends Apollo.Mutation<CreatePitchMutation, CreatePitchMutationVariables> {
    override document = CreatePitchDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const CreateSeasonDocument = gql`
    mutation CreateSeason($id: String, $name: String!) {
  createSeason(id: $id, name: $name)
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class CreateSeasonGQL extends Apollo.Mutation<CreateSeasonMutation, CreateSeasonMutationVariables> {
    override document = CreateSeasonDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const AddTeamToSeasonDocument = gql`
    mutation AddTeamToSeason($season_id: String!, $team_id: String!) {
  addTeamToSeason(season_id: $season_id, team_id: $team_id)
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class AddTeamToSeasonGQL extends Apollo.Mutation<AddTeamToSeasonMutation, AddTeamToSeasonMutationVariables> {
    override document = AddTeamToSeasonDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const RemoveTeamFromSeasonDocument = gql`
    mutation RemoveTeamFromSeason($season_id: String!, $team_id: String!) {
  removeTeamFromSeason(season_id: $season_id, team_id: $team_id)
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class RemoveTeamFromSeasonGQL extends Apollo.Mutation<RemoveTeamFromSeasonMutation, RemoveTeamFromSeasonMutationVariables> {
    override document = RemoveTeamFromSeasonDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const CreateMatchesForSeasonDocument = gql`
    mutation CreateMatchesForSeason($season_id: String!, $dates: [DatePeriod]!) {
  createMatchesForSeason(season_id: $season_id, dates: $dates)
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class CreateMatchesForSeasonGQL extends Apollo.Mutation<CreateMatchesForSeasonMutation, CreateMatchesForSeasonMutationVariables> {
    override document = CreateMatchesForSeasonDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const RescheduleMatchDayDocument = gql`
    mutation RescheduleMatchDay($match_day_id: String!, $date_period: DatePeriod!) {
  rescheduleMatchDay(match_day_id: $match_day_id, date_period: $date_period)
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class RescheduleMatchDayGQL extends Apollo.Mutation<RescheduleMatchDayMutation, RescheduleMatchDayMutationVariables> {
    override document = RescheduleMatchDayDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const StartSeasonDocument = gql`
    mutation StartSeason($id: String!) {
  startSeason(season_id: $id)
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class StartSeasonGQL extends Apollo.Mutation<StartSeasonMutation, StartSeasonMutationVariables> {
    override document = StartSeasonDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const EndSeasonDocument = gql`
    mutation EndSeason($season_id: String!) {
  endSeason(season_id: $season_id)
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class EndSeasonGQL extends Apollo.Mutation<EndSeasonMutation, EndSeasonMutationVariables> {
    override document = EndSeasonDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const DeleteSeasonDocument = gql`
    mutation DeleteSeason($season_id: String!) {
  deleteSeason(season_id: $season_id)
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class DeleteSeasonGQL extends Apollo.Mutation<DeleteSeasonMutation, DeleteSeasonMutationVariables> {
    override document = DeleteSeasonDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const ReplaceTeamInSeasonDocument = gql`
    mutation ReplaceTeamInSeason($season_id: String!, $current_team_id: String!, $replacement_team_id: String!) {
  replaceTeamInSeason(
    season_id: $season_id
    current_team_id: $current_team_id
    replacement_team_id: $replacement_team_id
  )
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class ReplaceTeamInSeasonGQL extends Apollo.Mutation<ReplaceTeamInSeasonMutation, ReplaceTeamInSeasonMutationVariables> {
    override document = ReplaceTeamInSeasonDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const CreateTeamDocument = gql`
    mutation CreateTeam($id: String!, $name: String!) {
  createTeam(id: $id, name: $name)
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class CreateTeamGQL extends Apollo.Mutation<CreateTeamMutation, CreateTeamMutationVariables> {
    override document = CreateTeamDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const UpdateTeamContactDocument = gql`
    mutation UpdateTeamContact($team_id: String!, $first_name: String!, $last_name: String!, $phone: String!, $email: String!) {
  updateTeamContact(
    team_id: $team_id
    first_name: $first_name
    last_name: $last_name
    phone: $phone
    email: $email
  )
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class UpdateTeamContactGQL extends Apollo.Mutation<UpdateTeamContactMutation, UpdateTeamContactMutationVariables> {
    override document = UpdateTeamContactDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const RenameTeamDocument = gql`
    mutation RenameTeam($team_id: String!, $new_name: String!) {
  renameTeam(team_id: $team_id, new_name: $new_name)
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class RenameTeamGQL extends Apollo.Mutation<RenameTeamMutation, RenameTeamMutationVariables> {
    override document = RenameTeamDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const DeleteTeamDocument = gql`
    mutation DeleteTeam($team_id: String!) {
  deleteTeam(team_id: $team_id)
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class DeleteTeamGQL extends Apollo.Mutation<DeleteTeamMutation, DeleteTeamMutationVariables> {
    override document = DeleteTeamDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const CreateTournamentDocument = gql`
    mutation CreateTournament($id: String, $name: String!) {
  createTournament(id: $id, name: $name)
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class CreateTournamentGQL extends Apollo.Mutation<CreateTournamentMutation, CreateTournamentMutationVariables> {
    override document = CreateTournamentDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const CreateTournamentRoundDocument = gql`
    mutation CreateTournamentRound($tournament_id: String!, $round: Int!, $team_id_pairs: [TeamIdPair]!, $date_period: DatePeriod!) {
  setTournamentRound(
    tournament_id: $tournament_id
    round: $round
    team_id_pairs: $team_id_pairs
    date_period: $date_period
  )
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class CreateTournamentRoundGQL extends Apollo.Mutation<CreateTournamentRoundMutation, CreateTournamentRoundMutationVariables> {
    override document = CreateTournamentRoundDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const DeleteTournamentDocument = gql`
    mutation DeleteTournament($tournament_id: String!) {
  deleteTournament(tournament_id: $tournament_id)
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class DeleteTournamentGQL extends Apollo.Mutation<DeleteTournamentMutation, DeleteTournamentMutationVariables> {
    override document = DeleteTournamentDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const CreateUserDocument = gql`
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
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class CreateUserGQL extends Apollo.Mutation<CreateUserMutation, CreateUserMutationVariables> {
    override document = CreateUserDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const UpdateUserDocument = gql`
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
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class UpdateUserGQL extends Apollo.Mutation<UpdateUserMutation, UpdateUserMutationVariables> {
    override document = UpdateUserDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const DeleteUserDocument = gql`
    mutation DeleteUser($user_id: String!) {
  deleteUser(user_id: $user_id)
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class DeleteUserGQL extends Apollo.Mutation<DeleteUserMutation, DeleteUserMutationVariables> {
    override document = DeleteUserDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const CalendarDocument = gql`
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
    ${TeamFragmentDoc}
${PitchFragmentDoc}`;

  @Injectable({
    providedIn: 'root'
  })
  export class CalendarGQL extends Apollo.Query<CalendarQuery, CalendarQueryVariables> {
    override document = CalendarDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const AllEventDocument = gql`
    query AllEvent($id: String!) {
  event(id: $id) {
    ...Event
  }
}
    ${EventFragmentDoc}`;

  @Injectable({
    providedIn: 'root'
  })
  export class AllEventGQL extends Apollo.Query<AllEventQuery, AllEventQueryVariables> {
    override document = AllEventDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const LatestEventDocument = gql`
    query LatestEvent($start_date: Date, $end_date: Date, $type: String) {
  latestEvents(start_date: $start_date, end_date: $end_date, type: $type) {
    ...Event
  }
}
    ${EventFragmentDoc}`;

  @Injectable({
    providedIn: 'root'
  })
  export class LatestEventGQL extends Apollo.Query<LatestEventQuery, LatestEventQueryVariables> {
    override document = LatestEventDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const MatchByIdDocument = gql`
    query MatchById($id: String!) {
  match(id: $id) {
    ...Match
  }
}
    ${MatchFragmentDoc}`;

  @Injectable({
    providedIn: 'root'
  })
  export class MatchByIdGQL extends Apollo.Query<MatchByIdQuery, MatchByIdQueryVariables> {
    override document = MatchByIdDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const SeasonPenaltiesDocument = gql`
    query SeasonPenalties($id: String!) {
  season(id: $id) {
    id
    teams {
      ...Team
    }
    ranking {
      penalties {
        ...Penalty
      }
    }
  }
}
    ${TeamFragmentDoc}
${PenaltyFragmentDoc}`;

  @Injectable({
    providedIn: 'root'
  })
  export class SeasonPenaltiesGQL extends Apollo.Query<SeasonPenaltiesQuery, SeasonPenaltiesQueryVariables> {
    override document = SeasonPenaltiesDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const PitchesDocument = gql`
    query Pitches {
  allPitches {
    ...Pitch
  }
}
    ${PitchFragmentDoc}`;

  @Injectable({
    providedIn: 'root'
  })
  export class PitchesGQL extends Apollo.Query<PitchesQuery, PitchesQueryVariables> {
    override document = PitchesDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const RankingByIdDocument = gql`
    query RankingById($id: String!) {
  season(id: $id) {
    ...Ranking
  }
}
    ${RankingFragmentDoc}`;

  @Injectable({
    providedIn: 'root'
  })
  export class RankingByIdGQL extends Apollo.Query<RankingByIdQuery, RankingByIdQueryVariables> {
    override document = RankingByIdDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const AllSeasonsListDocument = gql`
    query AllSeasonsList {
  allSeasons {
    ...AllSeasons
  }
}
    ${AllSeasonsFragmentDoc}`;

  @Injectable({
    providedIn: 'root'
  })
  export class AllSeasonsListGQL extends Apollo.Query<AllSeasonsListQuery, AllSeasonsListQueryVariables> {
    override document = AllSeasonsListDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const HallOfFameDocument = gql`
    query HallOfFame {
  allSeasons {
    ...AllSeasonsHoF
  }
}
    ${AllSeasonsHoFFragmentDoc}`;

  @Injectable({
    providedIn: 'root'
  })
  export class HallOfFameGQL extends Apollo.Query<HallOfFameQuery, HallOfFameQueryVariables> {
    override document = HallOfFameDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const SeasonByIdDocument = gql`
    query SeasonById($id: String!) {
  season(id: $id) {
    ...Season
  }
}
    ${SeasonFragmentDoc}`;

  @Injectable({
    providedIn: 'root'
  })
  export class SeasonByIdGQL extends Apollo.Query<SeasonByIdQuery, SeasonByIdQueryVariables> {
    override document = SeasonByIdDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const AllTeamsDocument = gql`
    query AllTeams {
  allTeams {
    ...Team
  }
}
    ${TeamFragmentDoc}`;

  @Injectable({
    providedIn: 'root'
  })
  export class AllTeamsGQL extends Apollo.Query<AllTeamsQuery, AllTeamsQueryVariables> {
    override document = AllTeamsDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const TeamByIdDocument = gql`
    query TeamById($id: String!) {
  team(id: $id) {
    ...Team
  }
}
    ${TeamFragmentDoc}`;

  @Injectable({
    providedIn: 'root'
  })
  export class TeamByIdGQL extends Apollo.Query<TeamByIdQuery, TeamByIdQueryVariables> {
    override document = TeamByIdDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const AllTournamentListDocument = gql`
    query AllTournamentList {
  allTournaments {
    ...AllTournaments
  }
}
    ${AllTournamentsFragmentDoc}`;

  @Injectable({
    providedIn: 'root'
  })
  export class AllTournamentListGQL extends Apollo.Query<AllTournamentListQuery, AllTournamentListQueryVariables> {
    override document = AllTournamentListDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const TournamentByIdDocument = gql`
    query TournamentById($id: String!) {
  tournament(id: $id) {
    ...Tournament
  }
}
    ${TournamentFragmentDoc}`;

  @Injectable({
    providedIn: 'root'
  })
  export class TournamentByIdGQL extends Apollo.Query<TournamentByIdQuery, TournamentByIdQueryVariables> {
    override document = TournamentByIdDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const AuthenticatedUserDocument = gql`
    query AuthenticatedUser {
  authenticatedUser {
    ...User
  }
}
    ${UserFragmentDoc}`;

  @Injectable({
    providedIn: 'root'
  })
  export class AuthenticatedUserGQL extends Apollo.Query<AuthenticatedUserQuery, AuthenticatedUserQueryVariables> {
    override document = AuthenticatedUserDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const AllUsersDocument = gql`
    query AllUsers {
  allUsers {
    ...User
  }
}
    ${UserFragmentDoc}`;

  @Injectable({
    providedIn: 'root'
  })
  export class AllUsersGQL extends Apollo.Query<AllUsersQuery, AllUsersQueryVariables> {
    override document = AllUsersDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }