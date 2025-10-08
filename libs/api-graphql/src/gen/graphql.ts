/* eslint-disable */
/* GENERATED DO NOT EDIT */
import { ApiDateTime } from './api-date-time'
import { ApiDate } from './api-date'
import { gql } from 'apollo-angular';
import { Injectable } from '@angular/core';
import * as Apollo from 'apollo-angular';
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
  Date: { input: ApiDate; output: ApiDate; }
  DateTime: { input: ApiDateTime; output: ApiDateTime; }
};

export type Contact = {
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
  id: Scalars['String']['output'];
  occurred_at: Scalars['String']['output'];
  type: Scalars['String']['output'];
};

export type Match = {
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
  end_date: Scalars['String']['output'];
  id: Scalars['String']['output'];
  matches?: Maybe<Array<Maybe<Match>>>;
  number: Scalars['Int']['output'];
  start_date: Scalars['String']['output'];
};

export type Pitch = {
  contact?: Maybe<Contact>;
  id: Scalars['String']['output'];
  label: Scalars['String']['output'];
  location_latitude: Scalars['Float']['output'];
  location_longitude: Scalars['Float']['output'];
};

export type Ranking = {
  penalties?: Maybe<Array<Maybe<RankingPenalty>>>;
  positions?: Maybe<Array<Maybe<RankingPosition>>>;
  updated_at?: Maybe<Scalars['String']['output']>;
};

export type RankingPenalty = {
  created_at: Scalars['String']['output'];
  id: Scalars['String']['output'];
  points: Scalars['Int']['output'];
  reason: Scalars['String']['output'];
  team: Team;
};

export type RankingPosition = {
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

export type TeamFragment = (
  Pick<Team, 'id' | 'name' | 'logo_id' | 'logo_path' | 'created_at'>
  & { contact?: Maybe<Pick<Contact, 'first_name' | 'last_name' | 'phone' | 'email'>> }
);

export type ContactFragment = Pick<Contact, 'first_name' | 'last_name' | 'phone' | 'email'>;

export type PitchFragment = (
  Pick<Pitch, 'id' | 'label' | 'location_longitude' | 'location_latitude'>
  & { contact?: Maybe<Pick<Contact, 'first_name' | 'last_name' | 'phone' | 'email'>> }
);

export type EventFragment = Pick<Event, 'id' | 'occurred_at' | 'type'>;

export type AllSeasonsHoFFragment = (
  Pick<Season, 'id' | 'name' | 'state'>
  & { match_days?: Maybe<Array<Maybe<Pick<MatchDay, 'number' | 'start_date'>>>>, ranking?: Maybe<{ positions?: Maybe<Array<Maybe<(
      Pick<RankingPosition, 'sort_index'>
      & { team: (
        Pick<Team, 'id' | 'name' | 'logo_id' | 'logo_path' | 'created_at'>
        & { contact?: Maybe<Pick<Contact, 'first_name' | 'last_name' | 'phone' | 'email'>> }
      ) }
    )>>> }> }
);

export type AllTournamentsHoFFragment = (
  Pick<Tournament, 'id' | 'name' | 'state'>
  & { rounds?: Maybe<Array<Maybe<(
    Pick<MatchDay, 'id' | 'number' | 'start_date' | 'end_date'>
    & { matches?: Maybe<Array<Maybe<(
      Pick<Match, 'id' | 'home_score' | 'guest_score' | 'kickoff' | 'cancelled_at' | 'cancellation_reason'>
      & { home_team: (
        Pick<Team, 'id' | 'name' | 'logo_id' | 'logo_path' | 'created_at'>
        & { contact?: Maybe<Pick<Contact, 'first_name' | 'last_name' | 'phone' | 'email'>> }
      ), guest_team: (
        Pick<Team, 'id' | 'name' | 'logo_id' | 'logo_path' | 'created_at'>
        & { contact?: Maybe<Pick<Contact, 'first_name' | 'last_name' | 'phone' | 'email'>> }
      ), pitch?: Maybe<(
        Pick<Pitch, 'id' | 'label' | 'location_longitude' | 'location_latitude'>
        & { contact?: Maybe<Pick<Contact, 'first_name' | 'last_name' | 'phone' | 'email'>> }
      )> }
    )>>> }
  )>>> }
);

export type MatchDayFragment = (
  Pick<MatchDay, 'id' | 'number' | 'start_date' | 'end_date'>
  & { matches?: Maybe<Array<Maybe<(
    Pick<Match, 'id' | 'home_score' | 'guest_score' | 'kickoff' | 'cancelled_at' | 'cancellation_reason'>
    & { home_team: (
      Pick<Team, 'id' | 'name' | 'logo_id' | 'logo_path' | 'created_at'>
      & { contact?: Maybe<Pick<Contact, 'first_name' | 'last_name' | 'phone' | 'email'>> }
    ), guest_team: (
      Pick<Team, 'id' | 'name' | 'logo_id' | 'logo_path' | 'created_at'>
      & { contact?: Maybe<Pick<Contact, 'first_name' | 'last_name' | 'phone' | 'email'>> }
    ), pitch?: Maybe<(
      Pick<Pitch, 'id' | 'label' | 'location_longitude' | 'location_latitude'>
      & { contact?: Maybe<Pick<Contact, 'first_name' | 'last_name' | 'phone' | 'email'>> }
    )> }
  )>>> }
);

export type MatchFragment = (
  Pick<Match, 'id' | 'home_score' | 'guest_score' | 'kickoff' | 'cancelled_at' | 'cancellation_reason'>
  & { home_team: (
    Pick<Team, 'id' | 'name' | 'logo_id' | 'logo_path' | 'created_at'>
    & { contact?: Maybe<Pick<Contact, 'first_name' | 'last_name' | 'phone' | 'email'>> }
  ), guest_team: (
    Pick<Team, 'id' | 'name' | 'logo_id' | 'logo_path' | 'created_at'>
    & { contact?: Maybe<Pick<Contact, 'first_name' | 'last_name' | 'phone' | 'email'>> }
  ), pitch?: Maybe<(
    Pick<Pitch, 'id' | 'label' | 'location_longitude' | 'location_latitude'>
    & { contact?: Maybe<Pick<Contact, 'first_name' | 'last_name' | 'phone' | 'email'>> }
  )> }
);

export type PenaltyFragment = (
  Pick<RankingPenalty, 'id' | 'reason' | 'created_at' | 'points'>
  & { team: (
    Pick<Team, 'id' | 'name' | 'logo_id' | 'logo_path' | 'created_at'>
    & { contact?: Maybe<Pick<Contact, 'first_name' | 'last_name' | 'phone' | 'email'>> }
  ) }
);

export type RankingFragment = (
  Pick<Season, 'id'>
  & { ranking?: Maybe<(
    Pick<Ranking, 'updated_at'>
    & { positions?: Maybe<Array<Maybe<(
      Pick<RankingPosition, 'sort_index' | 'number' | 'matches' | 'wins' | 'draws' | 'losses' | 'scored_goals' | 'conceded_goals' | 'points'>
      & { team: (
        Pick<Team, 'id' | 'name' | 'logo_id' | 'logo_path' | 'created_at'>
        & { contact?: Maybe<Pick<Contact, 'first_name' | 'last_name' | 'phone' | 'email'>> }
      ) }
    )>>>, penalties?: Maybe<Array<Maybe<(
      Pick<RankingPenalty, 'id' | 'reason' | 'created_at' | 'points'>
      & { team: (
        Pick<Team, 'id' | 'name' | 'logo_id' | 'logo_path' | 'created_at'>
        & { contact?: Maybe<Pick<Contact, 'first_name' | 'last_name' | 'phone' | 'email'>> }
      ) }
    )>>> }
  )> }
);

export type SeasonFragment = (
  Pick<Season, 'id' | 'name' | 'state'>
  & { teams?: Maybe<Array<Maybe<(
    Pick<Team, 'id' | 'name' | 'logo_id' | 'logo_path' | 'created_at'>
    & { contact?: Maybe<Pick<Contact, 'first_name' | 'last_name' | 'phone' | 'email'>> }
  )>>>, match_days?: Maybe<Array<Maybe<(
    Pick<MatchDay, 'id' | 'number' | 'start_date' | 'end_date'>
    & { matches?: Maybe<Array<Maybe<(
      Pick<Match, 'id' | 'home_score' | 'guest_score' | 'kickoff' | 'cancelled_at' | 'cancellation_reason'>
      & { home_team: (
        Pick<Team, 'id' | 'name' | 'logo_id' | 'logo_path' | 'created_at'>
        & { contact?: Maybe<Pick<Contact, 'first_name' | 'last_name' | 'phone' | 'email'>> }
      ), guest_team: (
        Pick<Team, 'id' | 'name' | 'logo_id' | 'logo_path' | 'created_at'>
        & { contact?: Maybe<Pick<Contact, 'first_name' | 'last_name' | 'phone' | 'email'>> }
      ), pitch?: Maybe<(
        Pick<Pitch, 'id' | 'label' | 'location_longitude' | 'location_latitude'>
        & { contact?: Maybe<Pick<Contact, 'first_name' | 'last_name' | 'phone' | 'email'>> }
      )> }
    )>>> }
  )>>> }
);

export type AllSeasonsFragment = (
  Pick<Season, 'id' | 'name' | 'state'>
  & { match_days?: Maybe<Array<Maybe<Pick<MatchDay, 'number' | 'start_date' | 'end_date'>>>> }
);

export type TournamentFragment = (
  Pick<Tournament, 'id' | 'name' | 'state'>
  & { rounds?: Maybe<Array<Maybe<(
    Pick<MatchDay, 'id' | 'number' | 'start_date' | 'end_date'>
    & { matches?: Maybe<Array<Maybe<(
      Pick<Match, 'id' | 'home_score' | 'guest_score' | 'kickoff' | 'cancelled_at' | 'cancellation_reason'>
      & { home_team: (
        Pick<Team, 'id' | 'name' | 'logo_id' | 'logo_path' | 'created_at'>
        & { contact?: Maybe<Pick<Contact, 'first_name' | 'last_name' | 'phone' | 'email'>> }
      ), guest_team: (
        Pick<Team, 'id' | 'name' | 'logo_id' | 'logo_path' | 'created_at'>
        & { contact?: Maybe<Pick<Contact, 'first_name' | 'last_name' | 'phone' | 'email'>> }
      ), pitch?: Maybe<(
        Pick<Pitch, 'id' | 'label' | 'location_longitude' | 'location_latitude'>
        & { contact?: Maybe<Pick<Contact, 'first_name' | 'last_name' | 'phone' | 'email'>> }
      )> }
    )>>> }
  )>>> }
);

export type AllTournamentsFragment = Pick<Tournament, 'id' | 'name' | 'state'>;

export type UserFragment = (
  Pick<User, 'id' | 'email' | 'role' | 'first_name' | 'last_name'>
  & { teams?: Maybe<Array<Maybe<(
    Pick<Team, 'id' | 'name' | 'logo_id' | 'logo_path' | 'created_at'>
    & { contact?: Maybe<Pick<Contact, 'first_name' | 'last_name' | 'phone' | 'email'>> }
  )>>> }
);

export type SubmitResultMutationVariables = Exact<{
  match_id: Scalars['String']['input'];
  home_score: Scalars['Int']['input'];
  guest_score: Scalars['Int']['input'];
}>;


export type SubmitResultMutation = Pick<Mutation, 'submitMatchResult'>;

export type ScheduleMatchMutationVariables = Exact<{
  match_id: Scalars['String']['input'];
  kickoff: Scalars['DateTime']['input'];
}>;


export type ScheduleMatchMutation = Pick<Mutation, 'scheduleMatch'>;

export type LocateMatchMutationVariables = Exact<{
  match_id: Scalars['String']['input'];
  pitch_id: Scalars['String']['input'];
}>;


export type LocateMatchMutation = Pick<Mutation, 'locateMatch'>;

export type CancelMatchMutationVariables = Exact<{
  match_id: Scalars['String']['input'];
  reason: Scalars['String']['input'];
}>;


export type CancelMatchMutation = Pick<Mutation, 'cancelMatch'>;

export type ScheduleAllMatchesForSeasonMutationVariables = Exact<{
  season_id: Scalars['String']['input'];
  match_appointments: Array<InputMaybe<MatchAppointment>> | InputMaybe<MatchAppointment>;
}>;


export type ScheduleAllMatchesForSeasonMutation = Pick<Mutation, 'scheduleAllMatchesForSeason'>;

export type ScheduleAllMatchesForMatchDayMutationVariables = Exact<{
  match_day_id: Scalars['String']['input'];
  match_appointments: Array<InputMaybe<MatchAppointment>> | InputMaybe<MatchAppointment>;
}>;


export type ScheduleAllMatchesForMatchDayMutation = Pick<Mutation, 'scheduleAllMatchesForMatchDay'>;

export type PasswordResetMutationVariables = Exact<{
  email: Scalars['String']['input'];
  target_path: Scalars['String']['input'];
}>;


export type PasswordResetMutation = Pick<Mutation, 'sendPasswordResetMail'>;

export type PasswordChangeMutationVariables = Exact<{
  new_password: Scalars['String']['input'];
}>;


export type PasswordChangeMutation = Pick<Mutation, 'changeUserPassword'>;

export type AddPenaltyMutationVariables = Exact<{
  id: Scalars['String']['input'];
  season_id: Scalars['String']['input'];
  team_id: Scalars['String']['input'];
  reason: Scalars['String']['input'];
  points: Scalars['Int']['input'];
}>;


export type AddPenaltyMutation = Pick<Mutation, 'addRankingPenalty'>;

export type RemovePenaltyMutationVariables = Exact<{
  ranking_penalty_id: Scalars['String']['input'];
  season_id: Scalars['String']['input'];
}>;


export type RemovePenaltyMutation = Pick<Mutation, 'removeRankingPenalty'>;

export type DeletePitchMutationVariables = Exact<{
  pitch_id: Scalars['String']['input'];
}>;


export type DeletePitchMutation = Pick<Mutation, 'deletePitch'>;

export type UpdatePitchContactMutationVariables = Exact<{
  pitch_id: Scalars['String']['input'];
  first_name: Scalars['String']['input'];
  last_name: Scalars['String']['input'];
  phone: Scalars['String']['input'];
  email: Scalars['String']['input'];
}>;


export type UpdatePitchContactMutation = Pick<Mutation, 'updatePitchContact'>;

export type CreatePitchMutationVariables = Exact<{
  id: Scalars['String']['input'];
  label: Scalars['String']['input'];
  location_longitude: Scalars['Float']['input'];
  location_latitude: Scalars['Float']['input'];
}>;


export type CreatePitchMutation = Pick<Mutation, 'createPitch'>;

export type CreateSeasonMutationVariables = Exact<{
  season_id?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
}>;


export type CreateSeasonMutation = Pick<Mutation, 'createSeason'>;

export type DeleteSeasonMutationVariables = Exact<{
  season_id: Scalars['String']['input'];
}>;


export type DeleteSeasonMutation = Pick<Mutation, 'deleteSeason'>;

export type EndSeasonMutationVariables = Exact<{
  season_id: Scalars['String']['input'];
}>;


export type EndSeasonMutation = Pick<Mutation, 'endSeason'>;

export type StartSeasonMutationVariables = Exact<{
  season_id: Scalars['String']['input'];
}>;


export type StartSeasonMutation = Pick<Mutation, 'startSeason'>;

export type AddTeamToSeasonMutationVariables = Exact<{
  season_id: Scalars['String']['input'];
  team_id: Scalars['String']['input'];
}>;


export type AddTeamToSeasonMutation = Pick<Mutation, 'addTeamToSeason'>;

export type RemoveTeamFromSeasonMutationVariables = Exact<{
  season_id: Scalars['String']['input'];
  team_id: Scalars['String']['input'];
}>;


export type RemoveTeamFromSeasonMutation = Pick<Mutation, 'removeTeamFromSeason'>;

export type CreateMatchesForSeasonMutationVariables = Exact<{
  season_id: Scalars['String']['input'];
  dates: Array<InputMaybe<DatePeriod>> | InputMaybe<DatePeriod>;
}>;


export type CreateMatchesForSeasonMutation = Pick<Mutation, 'createMatchesForSeason'>;

export type RescheduleMatchDayMutationVariables = Exact<{
  match_day_id: Scalars['String']['input'];
  date_period: DatePeriod;
}>;


export type RescheduleMatchDayMutation = Pick<Mutation, 'rescheduleMatchDay'>;

export type ReplaceTeamInSeasonMutationVariables = Exact<{
  season_id: Scalars['String']['input'];
  current_team_id: Scalars['String']['input'];
  replacement_team_id: Scalars['String']['input'];
}>;


export type ReplaceTeamInSeasonMutation = Pick<Mutation, 'replaceTeamInSeason'>;

export type CreateTeamMutationVariables = Exact<{
  id: Scalars['String']['input'];
  name: Scalars['String']['input'];
}>;


export type CreateTeamMutation = Pick<Mutation, 'createTeam'>;

export type UpdateTeamContactMutationVariables = Exact<{
  team_id: Scalars['String']['input'];
  first_name: Scalars['String']['input'];
  last_name: Scalars['String']['input'];
  phone: Scalars['String']['input'];
  email: Scalars['String']['input'];
}>;


export type UpdateTeamContactMutation = Pick<Mutation, 'updateTeamContact'>;

export type RenameTeamMutationVariables = Exact<{
  team_id: Scalars['String']['input'];
  new_name: Scalars['String']['input'];
}>;


export type RenameTeamMutation = Pick<Mutation, 'renameTeam'>;

export type DeleteTeamMutationVariables = Exact<{
  team_id: Scalars['String']['input'];
}>;


export type DeleteTeamMutation = Pick<Mutation, 'deleteTeam'>;

export type CreateTournamentMutationVariables = Exact<{
  id?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
}>;


export type CreateTournamentMutation = Pick<Mutation, 'createTournament'>;

export type CreateTournamentRoundMutationVariables = Exact<{
  tournament_id: Scalars['String']['input'];
  round: Scalars['Int']['input'];
  team_id_pairs: Array<InputMaybe<TeamIdPair>> | InputMaybe<TeamIdPair>;
  date_period: DatePeriod;
}>;


export type CreateTournamentRoundMutation = Pick<Mutation, 'setTournamentRound'>;

export type DeleteTournamentMutationVariables = Exact<{
  tournament_id: Scalars['String']['input'];
}>;


export type DeleteTournamentMutation = Pick<Mutation, 'deleteTournament'>;

export type StartTournamentMutationVariables = Exact<{
  tournament_id: Scalars['String']['input'];
}>;


export type StartTournamentMutation = Pick<Mutation, 'startTournament'>;

export type EndTournamentMutationVariables = Exact<{
  tournament_id: Scalars['String']['input'];
}>;


export type EndTournamentMutation = Pick<Mutation, 'endTournament'>;

export type CreateUserMutationVariables = Exact<{
  user_id?: InputMaybe<Scalars['String']['input']>;
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
  first_name: Scalars['String']['input'];
  last_name: Scalars['String']['input'];
  role: Scalars['String']['input'];
  team_ids: Array<InputMaybe<Scalars['String']['input']>> | InputMaybe<Scalars['String']['input']>;
}>;


export type CreateUserMutation = Pick<Mutation, 'createUser'>;

export type UpdateUserMutationVariables = Exact<{
  user_id: Scalars['String']['input'];
  email?: InputMaybe<Scalars['String']['input']>;
  first_name?: InputMaybe<Scalars['String']['input']>;
  last_name?: InputMaybe<Scalars['String']['input']>;
  role?: InputMaybe<Scalars['String']['input']>;
  team_ids?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>> | InputMaybe<Scalars['String']['input']>>;
}>;


export type UpdateUserMutation = Pick<Mutation, 'updateUser'>;

export type DeleteUserMutationVariables = Exact<{
  user_id: Scalars['String']['input'];
}>;


export type DeleteUserMutation = Pick<Mutation, 'deleteUser'>;

export type InviteUserMutationVariables = Exact<{
  user_id: Scalars['String']['input'];
  target_path: Scalars['String']['input'];
}>;


export type InviteUserMutation = Pick<Mutation, 'sendInviteMail'>;

export type AuthenticatedUserIdQueryVariables = Exact<{ [key: string]: never; }>;


export type AuthenticatedUserIdQuery = { authenticatedUser?: Maybe<Pick<User, 'id'>> };

export type CalendarQueryVariables = Exact<{
  min_date?: InputMaybe<Scalars['DateTime']['input']>;
  max_date?: InputMaybe<Scalars['DateTime']['input']>;
}>;


export type CalendarQuery = { allSeasons?: Maybe<Array<Maybe<(
    Pick<Season, 'id' | 'name' | 'state'>
    & { match_days?: Maybe<Array<Maybe<Pick<MatchDay, 'number' | 'start_date' | 'end_date'>>>> }
  )>>>, allTournaments?: Maybe<Array<Maybe<(
    Pick<Tournament, 'id' | 'name' | 'state'>
    & { rounds?: Maybe<Array<Maybe<Pick<MatchDay, 'number' | 'start_date' | 'end_date'>>>> }
  )>>>, matchesByKickoff?: Maybe<Array<Maybe<(
    Pick<Match, 'id' | 'home_score' | 'guest_score' | 'kickoff' | 'cancelled_at' | 'cancellation_reason'>
    & { home_team: (
      Pick<Team, 'id' | 'name' | 'logo_id' | 'logo_path' | 'created_at'>
      & { contact?: Maybe<Pick<Contact, 'first_name' | 'last_name' | 'phone' | 'email'>> }
    ), guest_team: (
      Pick<Team, 'id' | 'name' | 'logo_id' | 'logo_path' | 'created_at'>
      & { contact?: Maybe<Pick<Contact, 'first_name' | 'last_name' | 'phone' | 'email'>> }
    ), pitch?: Maybe<(
      Pick<Pitch, 'id' | 'label' | 'location_longitude' | 'location_latitude'>
      & { contact?: Maybe<Pick<Contact, 'first_name' | 'last_name' | 'phone' | 'email'>> }
    )> }
  )>>> };

export type AllEventQueryVariables = Exact<{
  id: Scalars['String']['input'];
}>;


export type AllEventQuery = { event?: Maybe<Pick<Event, 'id' | 'occurred_at' | 'type'>> };

export type LatestEventQueryVariables = Exact<{
  start_date?: InputMaybe<Scalars['Date']['input']>;
  end_date?: InputMaybe<Scalars['Date']['input']>;
  type?: InputMaybe<Scalars['String']['input']>;
}>;


export type LatestEventQuery = { latestEvents?: Maybe<Array<Maybe<Pick<Event, 'id' | 'occurred_at' | 'type'>>>> };

export type HallOfFameQueryVariables = Exact<{ [key: string]: never; }>;


export type HallOfFameQuery = { allSeasons?: Maybe<Array<Maybe<(
    Pick<Season, 'id' | 'name' | 'state'>
    & { match_days?: Maybe<Array<Maybe<Pick<MatchDay, 'number' | 'start_date'>>>>, ranking?: Maybe<{ positions?: Maybe<Array<Maybe<(
        Pick<RankingPosition, 'sort_index'>
        & { team: (
          Pick<Team, 'id' | 'name' | 'logo_id' | 'logo_path' | 'created_at'>
          & { contact?: Maybe<Pick<Contact, 'first_name' | 'last_name' | 'phone' | 'email'>> }
        ) }
      )>>> }> }
  )>>>, allTournaments?: Maybe<Array<Maybe<(
    Pick<Tournament, 'id' | 'name' | 'state'>
    & { rounds?: Maybe<Array<Maybe<(
      Pick<MatchDay, 'id' | 'number' | 'start_date' | 'end_date'>
      & { matches?: Maybe<Array<Maybe<(
        Pick<Match, 'id' | 'home_score' | 'guest_score' | 'kickoff' | 'cancelled_at' | 'cancellation_reason'>
        & { home_team: (
          Pick<Team, 'id' | 'name' | 'logo_id' | 'logo_path' | 'created_at'>
          & { contact?: Maybe<Pick<Contact, 'first_name' | 'last_name' | 'phone' | 'email'>> }
        ), guest_team: (
          Pick<Team, 'id' | 'name' | 'logo_id' | 'logo_path' | 'created_at'>
          & { contact?: Maybe<Pick<Contact, 'first_name' | 'last_name' | 'phone' | 'email'>> }
        ), pitch?: Maybe<(
          Pick<Pitch, 'id' | 'label' | 'location_longitude' | 'location_latitude'>
          & { contact?: Maybe<Pick<Contact, 'first_name' | 'last_name' | 'phone' | 'email'>> }
        )> }
      )>>> }
    )>>> }
  )>>> };

export type MatchByIdQueryVariables = Exact<{
  id: Scalars['String']['input'];
}>;


export type MatchByIdQuery = { match?: Maybe<(
    Pick<Match, 'id' | 'home_score' | 'guest_score' | 'kickoff' | 'cancelled_at' | 'cancellation_reason'>
    & { home_team: (
      Pick<Team, 'id' | 'name' | 'logo_id' | 'logo_path' | 'created_at'>
      & { contact?: Maybe<Pick<Contact, 'first_name' | 'last_name' | 'phone' | 'email'>> }
    ), guest_team: (
      Pick<Team, 'id' | 'name' | 'logo_id' | 'logo_path' | 'created_at'>
      & { contact?: Maybe<Pick<Contact, 'first_name' | 'last_name' | 'phone' | 'email'>> }
    ), pitch?: Maybe<(
      Pick<Pitch, 'id' | 'label' | 'location_longitude' | 'location_latitude'>
      & { contact?: Maybe<Pick<Contact, 'first_name' | 'last_name' | 'phone' | 'email'>> }
    )> }
  )> };

export type SeasonPenaltiesQueryVariables = Exact<{
  id: Scalars['String']['input'];
}>;


export type SeasonPenaltiesQuery = { season?: Maybe<(
    Pick<Season, 'id'>
    & { ranking?: Maybe<{ penalties?: Maybe<Array<Maybe<(
        Pick<RankingPenalty, 'id' | 'reason' | 'created_at' | 'points'>
        & { team: (
          Pick<Team, 'id' | 'name' | 'logo_id' | 'logo_path' | 'created_at'>
          & { contact?: Maybe<Pick<Contact, 'first_name' | 'last_name' | 'phone' | 'email'>> }
        ) }
      )>>> }> }
  )> };

export type PitchesQueryVariables = Exact<{ [key: string]: never; }>;


export type PitchesQuery = { allPitches?: Maybe<Array<Maybe<(
    Pick<Pitch, 'id' | 'label' | 'location_longitude' | 'location_latitude'>
    & { contact?: Maybe<Pick<Contact, 'first_name' | 'last_name' | 'phone' | 'email'>> }
  )>>> };

export type RankingByIdQueryVariables = Exact<{
  id: Scalars['String']['input'];
}>;


export type RankingByIdQuery = { season?: Maybe<(
    Pick<Season, 'id'>
    & { ranking?: Maybe<(
      Pick<Ranking, 'updated_at'>
      & { positions?: Maybe<Array<Maybe<(
        Pick<RankingPosition, 'sort_index' | 'number' | 'matches' | 'wins' | 'draws' | 'losses' | 'scored_goals' | 'conceded_goals' | 'points'>
        & { team: (
          Pick<Team, 'id' | 'name' | 'logo_id' | 'logo_path' | 'created_at'>
          & { contact?: Maybe<Pick<Contact, 'first_name' | 'last_name' | 'phone' | 'email'>> }
        ) }
      )>>>, penalties?: Maybe<Array<Maybe<(
        Pick<RankingPenalty, 'id' | 'reason' | 'created_at' | 'points'>
        & { team: (
          Pick<Team, 'id' | 'name' | 'logo_id' | 'logo_path' | 'created_at'>
          & { contact?: Maybe<Pick<Contact, 'first_name' | 'last_name' | 'phone' | 'email'>> }
        ) }
      )>>> }
    )> }
  )> };

export type SeasonByIdQueryVariables = Exact<{
  id: Scalars['String']['input'];
}>;


export type SeasonByIdQuery = { season?: Maybe<(
    Pick<Season, 'id' | 'name' | 'state'>
    & { teams?: Maybe<Array<Maybe<(
      Pick<Team, 'id' | 'name' | 'logo_id' | 'logo_path' | 'created_at'>
      & { contact?: Maybe<Pick<Contact, 'first_name' | 'last_name' | 'phone' | 'email'>> }
    )>>>, match_days?: Maybe<Array<Maybe<(
      Pick<MatchDay, 'id' | 'number' | 'start_date' | 'end_date'>
      & { matches?: Maybe<Array<Maybe<(
        Pick<Match, 'id' | 'home_score' | 'guest_score' | 'kickoff' | 'cancelled_at' | 'cancellation_reason'>
        & { home_team: (
          Pick<Team, 'id' | 'name' | 'logo_id' | 'logo_path' | 'created_at'>
          & { contact?: Maybe<Pick<Contact, 'first_name' | 'last_name' | 'phone' | 'email'>> }
        ), guest_team: (
          Pick<Team, 'id' | 'name' | 'logo_id' | 'logo_path' | 'created_at'>
          & { contact?: Maybe<Pick<Contact, 'first_name' | 'last_name' | 'phone' | 'email'>> }
        ), pitch?: Maybe<(
          Pick<Pitch, 'id' | 'label' | 'location_longitude' | 'location_latitude'>
          & { contact?: Maybe<Pick<Contact, 'first_name' | 'last_name' | 'phone' | 'email'>> }
        )> }
      )>>> }
    )>>> }
  )> };

export type SeasonListQueryVariables = Exact<{ [key: string]: never; }>;


export type SeasonListQuery = { allSeasons?: Maybe<Array<Maybe<(
    Pick<Season, 'id' | 'name' | 'state'>
    & { match_days?: Maybe<Array<Maybe<Pick<MatchDay, 'number' | 'start_date' | 'end_date'>>>> }
  )>>> };

export type TeamByIdQueryVariables = Exact<{
  id: Scalars['String']['input'];
}>;


export type TeamByIdQuery = { team?: Maybe<(
    Pick<Team, 'id' | 'name' | 'logo_id' | 'logo_path' | 'created_at'>
    & { contact?: Maybe<Pick<Contact, 'first_name' | 'last_name' | 'phone' | 'email'>> }
  )> };

export type TeamListQueryVariables = Exact<{ [key: string]: never; }>;


export type TeamListQuery = { allTeams?: Maybe<Array<Maybe<(
    Pick<Team, 'id' | 'name' | 'logo_id' | 'logo_path' | 'created_at'>
    & { contact?: Maybe<Pick<Contact, 'first_name' | 'last_name' | 'phone' | 'email'>> }
  )>>> };

export type TournamentByIdQueryVariables = Exact<{
  id: Scalars['String']['input'];
}>;


export type TournamentByIdQuery = { tournament?: Maybe<(
    Pick<Tournament, 'id' | 'name' | 'state'>
    & { rounds?: Maybe<Array<Maybe<(
      Pick<MatchDay, 'id' | 'number' | 'start_date' | 'end_date'>
      & { matches?: Maybe<Array<Maybe<(
        Pick<Match, 'id' | 'home_score' | 'guest_score' | 'kickoff' | 'cancelled_at' | 'cancellation_reason'>
        & { home_team: (
          Pick<Team, 'id' | 'name' | 'logo_id' | 'logo_path' | 'created_at'>
          & { contact?: Maybe<Pick<Contact, 'first_name' | 'last_name' | 'phone' | 'email'>> }
        ), guest_team: (
          Pick<Team, 'id' | 'name' | 'logo_id' | 'logo_path' | 'created_at'>
          & { contact?: Maybe<Pick<Contact, 'first_name' | 'last_name' | 'phone' | 'email'>> }
        ), pitch?: Maybe<(
          Pick<Pitch, 'id' | 'label' | 'location_longitude' | 'location_latitude'>
          & { contact?: Maybe<Pick<Contact, 'first_name' | 'last_name' | 'phone' | 'email'>> }
        )> }
      )>>> }
    )>>> }
  )> };

export type TournamentListQueryVariables = Exact<{ [key: string]: never; }>;


export type TournamentListQuery = { allTournaments?: Maybe<Array<Maybe<Pick<Tournament, 'id' | 'name' | 'state'>>>> };

export type AuthenticatedUserQueryVariables = Exact<{ [key: string]: never; }>;


export type AuthenticatedUserQuery = { authenticatedUser?: Maybe<(
    Pick<User, 'id' | 'email' | 'role' | 'first_name' | 'last_name'>
    & { teams?: Maybe<Array<Maybe<(
      Pick<Team, 'id' | 'name' | 'logo_id' | 'logo_path' | 'created_at'>
      & { contact?: Maybe<Pick<Contact, 'first_name' | 'last_name' | 'phone' | 'email'>> }
    )>>> }
  )> };

export type AllUsersQueryVariables = Exact<{ [key: string]: never; }>;


export type AllUsersQuery = { allUsers?: Maybe<Array<Maybe<(
    Pick<User, 'id' | 'email' | 'role' | 'first_name' | 'last_name'>
    & { teams?: Maybe<Array<Maybe<(
      Pick<Team, 'id' | 'name' | 'logo_id' | 'logo_path' | 'created_at'>
      & { contact?: Maybe<Pick<Contact, 'first_name' | 'last_name' | 'phone' | 'email'>> }
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
  logo_path
  created_at
  contact {
    ...Contact
  }
}
    `;
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
    `;
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
    `;
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
    `;
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
    `;
export const AllSeasonsFragmentDoc = gql`
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
        ...Team
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
    `;
export const AllTournamentsFragmentDoc = gql`
    fragment AllTournaments on Tournament {
  id
  name
  state
}
    `;
export const AllTournamentsHoFFragmentDoc = gql`
    fragment AllTournamentsHoF on Tournament {
  id
  name
  state
  rounds {
    ...MatchDay
  }
}
    `;
export const AllTournamentsCalendarFragmentDoc = gql`
    fragment AllTournamentsCalendar on Tournament {
  id
  name
  state
  rounds {
    ...MatchDay
  }
}
    `;
export const TournamentFragmentDoc = gql`
    fragment Tournament on Tournament {
  id
  name
  rounds {
    ...MatchDay
  }
  state
}
    `;
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
    `;
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
    `;
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
    `;
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
    document = SubmitResultDocument;
    
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
    document = ScheduleMatchDocument;
    
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
    document = LocateMatchDocument;
    
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
    document = CancelMatchDocument;
    
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
    document = ScheduleAllMatchesForSeasonDocument;
    
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
    document = ScheduleAllMatchesForMatchDayDocument;
    
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
    document = PasswordResetDocument;
    
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
    document = PasswordChangeDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const AddPenaltyDocument = gql`
    mutation AddPenalty($id: String!, $season_id: String!, $team_id: String!, $reason: String!, $points: Int!) {
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
  export class AddPenaltyGQL extends Apollo.Mutation<AddPenaltyMutation, AddPenaltyMutationVariables> {
    document = AddPenaltyDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const RemovePenaltyDocument = gql`
    mutation RemovePenalty($ranking_penalty_id: String!, $season_id: String!) {
  removeRankingPenalty(
    ranking_penalty_id: $ranking_penalty_id
    season_id: $season_id
  )
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class RemovePenaltyGQL extends Apollo.Mutation<RemovePenaltyMutation, RemovePenaltyMutationVariables> {
    document = RemovePenaltyDocument;
    
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
    document = DeletePitchDocument;
    
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
    document = UpdatePitchContactDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const CreatePitchDocument = gql`
    mutation CreatePitch($id: String!, $label: String!, $location_longitude: Float!, $location_latitude: Float!) {
  createPitch(
    id: $id
    label: $label
    longitude: $location_longitude
    latitude: $location_latitude
  )
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class CreatePitchGQL extends Apollo.Mutation<CreatePitchMutation, CreatePitchMutationVariables> {
    document = CreatePitchDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const CreateSeasonDocument = gql`
    mutation CreateSeason($season_id: String, $name: String!) {
  createSeason(id: $season_id, name: $name)
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class CreateSeasonGQL extends Apollo.Mutation<CreateSeasonMutation, CreateSeasonMutationVariables> {
    document = CreateSeasonDocument;
    
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
    document = DeleteSeasonDocument;
    
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
    document = EndSeasonDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const StartSeasonDocument = gql`
    mutation StartSeason($season_id: String!) {
  startSeason(season_id: $season_id)
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class StartSeasonGQL extends Apollo.Mutation<StartSeasonMutation, StartSeasonMutationVariables> {
    document = StartSeasonDocument;
    
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
    document = AddTeamToSeasonDocument;
    
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
    document = RemoveTeamFromSeasonDocument;
    
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
    document = CreateMatchesForSeasonDocument;
    
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
    document = RescheduleMatchDayDocument;
    
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
    document = ReplaceTeamInSeasonDocument;
    
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
    document = CreateTeamDocument;
    
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
    document = UpdateTeamContactDocument;
    
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
    document = RenameTeamDocument;
    
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
    document = DeleteTeamDocument;
    
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
    document = CreateTournamentDocument;
    
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
    document = CreateTournamentRoundDocument;
    
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
    document = DeleteTournamentDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const StartTournamentDocument = gql`
    mutation StartTournament($tournament_id: String!) {
  startTournament(tournament_id: $tournament_id)
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class StartTournamentGQL extends Apollo.Mutation<StartTournamentMutation, StartTournamentMutationVariables> {
    document = StartTournamentDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const EndTournamentDocument = gql`
    mutation EndTournament($tournament_id: String!) {
  endTournament(tournament_id: $tournament_id)
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class EndTournamentGQL extends Apollo.Mutation<EndTournamentMutation, EndTournamentMutationVariables> {
    document = EndTournamentDocument;
    
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
    document = CreateUserDocument;
    
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
    document = UpdateUserDocument;
    
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
    document = DeleteUserDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const InviteUserDocument = gql`
    mutation InviteUser($user_id: String!, $target_path: String!) {
  sendInviteMail(user_id: $user_id, target_path: $target_path)
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class InviteUserGQL extends Apollo.Mutation<InviteUserMutation, InviteUserMutationVariables> {
    document = InviteUserDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const AuthenticatedUserIdDocument = gql`
    query AuthenticatedUserId {
  authenticatedUser {
    id
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class AuthenticatedUserIdGQL extends Apollo.Query<AuthenticatedUserIdQuery, AuthenticatedUserIdQueryVariables> {
    document = AuthenticatedUserIdDocument;
    
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
    ${TeamFragmentDoc}
${ContactFragmentDoc}
${PitchFragmentDoc}`;

  @Injectable({
    providedIn: 'root'
  })
  export class CalendarGQL extends Apollo.Query<CalendarQuery, CalendarQueryVariables> {
    document = CalendarDocument;
    
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
    document = AllEventDocument;
    
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
    document = LatestEventDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const HallOfFameDocument = gql`
    query HallOfFame {
  allSeasons {
    ...AllSeasonsHoF
  }
  allTournaments {
    ...AllTournamentsHoF
  }
}
    ${AllSeasonsHoFFragmentDoc}
${TeamFragmentDoc}
${ContactFragmentDoc}
${AllTournamentsHoFFragmentDoc}
${MatchDayFragmentDoc}
${MatchFragmentDoc}
${PitchFragmentDoc}`;

  @Injectable({
    providedIn: 'root'
  })
  export class HallOfFameGQL extends Apollo.Query<HallOfFameQuery, HallOfFameQueryVariables> {
    document = HallOfFameDocument;
    
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
    ${MatchFragmentDoc}
${TeamFragmentDoc}
${ContactFragmentDoc}
${PitchFragmentDoc}`;

  @Injectable({
    providedIn: 'root'
  })
  export class MatchByIdGQL extends Apollo.Query<MatchByIdQuery, MatchByIdQueryVariables> {
    document = MatchByIdDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const SeasonPenaltiesDocument = gql`
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
    ${PenaltyFragmentDoc}
${TeamFragmentDoc}
${ContactFragmentDoc}`;

  @Injectable({
    providedIn: 'root'
  })
  export class SeasonPenaltiesGQL extends Apollo.Query<SeasonPenaltiesQuery, SeasonPenaltiesQueryVariables> {
    document = SeasonPenaltiesDocument;
    
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
    ${PitchFragmentDoc}
${ContactFragmentDoc}`;

  @Injectable({
    providedIn: 'root'
  })
  export class PitchesGQL extends Apollo.Query<PitchesQuery, PitchesQueryVariables> {
    document = PitchesDocument;
    
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
    ${RankingFragmentDoc}
${TeamFragmentDoc}
${ContactFragmentDoc}
${PenaltyFragmentDoc}`;

  @Injectable({
    providedIn: 'root'
  })
  export class RankingByIdGQL extends Apollo.Query<RankingByIdQuery, RankingByIdQueryVariables> {
    document = RankingByIdDocument;
    
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
    ${SeasonFragmentDoc}
${TeamFragmentDoc}
${ContactFragmentDoc}
${MatchDayFragmentDoc}
${MatchFragmentDoc}
${PitchFragmentDoc}`;

  @Injectable({
    providedIn: 'root'
  })
  export class SeasonByIdGQL extends Apollo.Query<SeasonByIdQuery, SeasonByIdQueryVariables> {
    document = SeasonByIdDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const SeasonListDocument = gql`
    query SeasonList {
  allSeasons {
    ...AllSeasons
  }
}
    ${AllSeasonsFragmentDoc}`;

  @Injectable({
    providedIn: 'root'
  })
  export class SeasonListGQL extends Apollo.Query<SeasonListQuery, SeasonListQueryVariables> {
    document = SeasonListDocument;
    
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
    ${TeamFragmentDoc}
${ContactFragmentDoc}`;

  @Injectable({
    providedIn: 'root'
  })
  export class TeamByIdGQL extends Apollo.Query<TeamByIdQuery, TeamByIdQueryVariables> {
    document = TeamByIdDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const TeamListDocument = gql`
    query TeamList {
  allTeams {
    ...Team
  }
}
    ${TeamFragmentDoc}
${ContactFragmentDoc}`;

  @Injectable({
    providedIn: 'root'
  })
  export class TeamListGQL extends Apollo.Query<TeamListQuery, TeamListQueryVariables> {
    document = TeamListDocument;
    
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
    ${TournamentFragmentDoc}
${MatchDayFragmentDoc}
${MatchFragmentDoc}
${TeamFragmentDoc}
${ContactFragmentDoc}
${PitchFragmentDoc}`;

  @Injectable({
    providedIn: 'root'
  })
  export class TournamentByIdGQL extends Apollo.Query<TournamentByIdQuery, TournamentByIdQueryVariables> {
    document = TournamentByIdDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const TournamentListDocument = gql`
    query TournamentList {
  allTournaments {
    ...AllTournaments
  }
}
    ${AllTournamentsFragmentDoc}`;

  @Injectable({
    providedIn: 'root'
  })
  export class TournamentListGQL extends Apollo.Query<TournamentListQuery, TournamentListQueryVariables> {
    document = TournamentListDocument;
    
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
    ${UserFragmentDoc}
${TeamFragmentDoc}
${ContactFragmentDoc}`;

  @Injectable({
    providedIn: 'root'
  })
  export class AuthenticatedUserGQL extends Apollo.Query<AuthenticatedUserQuery, AuthenticatedUserQueryVariables> {
    document = AuthenticatedUserDocument;
    
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
    ${UserFragmentDoc}
${TeamFragmentDoc}
${ContactFragmentDoc}`;

  @Injectable({
    providedIn: 'root'
  })
  export class AllUsersGQL extends Apollo.Query<AllUsersQuery, AllUsersQueryVariables> {
    document = AllUsersDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }