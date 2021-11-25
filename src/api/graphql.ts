/* tslint:disable */
/* GENERATED DO NOT EDIT */
import {gql} from 'apollo-angular';

import { Injectable } from '@angular/core';

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
  DateTime: any;
  /**
   * The `String` scalar type represents textual data, represented as UTF-8
   * character sequences. The String type is most often used by GraphQL to
   * represent free-form human-readable text.
   */
  Date: any;
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
  pitch?: Maybe<Pitch>;
  /** Get a single season */
  season?: Maybe<Season>;
  team?: Maybe<Team>;
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


export type QueryPitchArgs = {
  id: Scalars['String'];
};


export type QuerySeasonArgs = {
  id: Scalars['String'];
};


export type QueryTeamArgs = {
  id: Scalars['String'];
};


export type QueryTournamentArgs = {
  id: Scalars['String'];
};

export type Pitch = {
  __typename?: 'Pitch';
  contact?: Maybe<Contact>;
  id: Scalars['String'];
  label: Scalars['String'];
  location_latitude: Scalars['Float'];
  location_longitude: Scalars['Float'];
};

export type Contact = {
  __typename?: 'Contact';
  email: Scalars['String'];
  first_name: Scalars['String'];
  last_name: Scalars['String'];
  phone: Scalars['String'];
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

export type MatchDay = {
  __typename?: 'MatchDay';
  end_date: Scalars['String'];
  id: Scalars['String'];
  matches?: Maybe<Array<Maybe<Match>>>;
  number: Scalars['Int'];
  start_date: Scalars['String'];
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

export type Team = {
  __typename?: 'Team';
  contact?: Maybe<Contact>;
  created_at: Scalars['String'];
  id: Scalars['String'];
  name: Scalars['String'];
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

export enum SeasonState {
  Ended = 'ended',
  Preparation = 'preparation',
  Progress = 'progress'
}

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

export type Event = {
  __typename?: 'Event';
  id: Scalars['String'];
  occurred_at: Scalars['String'];
  type: Scalars['String'];
};

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

export type DatePeriod = {
  from: Scalars['Date'];
  to: Scalars['Date'];
};

export type MatchAppointment = {
  kickoff: Scalars['DateTime'];
  pitch_id: Scalars['String'];
  unavailable_team_ids: Array<InputMaybe<Scalars['String']>>;
};

export type TeamIdPair = {
  guest_team_id: Scalars['String'];
  home_team_id: Scalars['String'];
};

export type MatchFragment = { __typename?: 'Match', id: string, home_score?: number | null | undefined, guest_score?: number | null | undefined, kickoff?: any | null | undefined, cancelled_at?: string | null | undefined, cancellation_reason?: string | null | undefined, home_team: { __typename?: 'Team', id: string, name: string, created_at: string, contact?: { __typename?: 'Contact', first_name: string, last_name: string, phone: string, email: string } | null | undefined }, guest_team: { __typename?: 'Team', id: string, name: string, created_at: string, contact?: { __typename?: 'Contact', first_name: string, last_name: string, phone: string, email: string } | null | undefined }, pitch?: { __typename?: 'Pitch', id: string, label: string, location_longitude: number, location_latitude: number, contact?: { __typename?: 'Contact', first_name: string, last_name: string, phone: string, email: string } | null | undefined } | null | undefined };

export type MatchDayFragment = { __typename?: 'MatchDay', id: string, number: number, start_date: string, end_date: string, matches?: Array<{ __typename?: 'Match', id: string, home_score?: number | null | undefined, guest_score?: number | null | undefined, kickoff?: any | null | undefined, cancelled_at?: string | null | undefined, cancellation_reason?: string | null | undefined, home_team: { __typename?: 'Team', id: string, name: string, created_at: string, contact?: { __typename?: 'Contact', first_name: string, last_name: string, phone: string, email: string } | null | undefined }, guest_team: { __typename?: 'Team', id: string, name: string, created_at: string, contact?: { __typename?: 'Contact', first_name: string, last_name: string, phone: string, email: string } | null | undefined }, pitch?: { __typename?: 'Pitch', id: string, label: string, location_longitude: number, location_latitude: number, contact?: { __typename?: 'Contact', first_name: string, last_name: string, phone: string, email: string } | null | undefined } | null | undefined } | null | undefined> | null | undefined };

export type PitchFragment = { __typename?: 'Pitch', id: string, label: string, location_longitude: number, location_latitude: number, contact?: { __typename?: 'Contact', first_name: string, last_name: string, phone: string, email: string } | null | undefined };

export type TeamFragment = { __typename?: 'Team', id: string, name: string, created_at: string, contact?: { __typename?: 'Contact', first_name: string, last_name: string, phone: string, email: string } | null | undefined };

export type ContactFragment = { __typename?: 'Contact', first_name: string, last_name: string, phone: string, email: string };

export type SeasonFragment = { __typename?: 'Season', id: string, name: string, teams?: Array<{ __typename?: 'Team', id: string, name: string, created_at: string, contact?: { __typename?: 'Contact', first_name: string, last_name: string, phone: string, email: string } | null | undefined } | null | undefined> | null | undefined, match_days?: Array<{ __typename?: 'MatchDay', id: string, number: number, start_date: string, end_date: string, matches?: Array<{ __typename?: 'Match', id: string, home_score?: number | null | undefined, guest_score?: number | null | undefined, kickoff?: any | null | undefined, cancelled_at?: string | null | undefined, cancellation_reason?: string | null | undefined, home_team: { __typename?: 'Team', id: string, name: string, created_at: string, contact?: { __typename?: 'Contact', first_name: string, last_name: string, phone: string, email: string } | null | undefined }, guest_team: { __typename?: 'Team', id: string, name: string, created_at: string, contact?: { __typename?: 'Contact', first_name: string, last_name: string, phone: string, email: string } | null | undefined }, pitch?: { __typename?: 'Pitch', id: string, label: string, location_longitude: number, location_latitude: number, contact?: { __typename?: 'Contact', first_name: string, last_name: string, phone: string, email: string } | null | undefined } | null | undefined } | null | undefined> | null | undefined } | null | undefined> | null | undefined };

export type AllSeasonsFragment = { __typename?: 'Season', id: string, name: string, state: SeasonState };

export type AllSeasonsCalendarFragment = { __typename?: 'Season', id: string, name: string, state: SeasonState, match_days?: Array<{ __typename?: 'MatchDay', id: string, number: number, start_date: string, end_date: string, matches?: Array<{ __typename?: 'Match', id: string, home_score?: number | null | undefined, guest_score?: number | null | undefined, kickoff?: any | null | undefined, cancelled_at?: string | null | undefined, cancellation_reason?: string | null | undefined, home_team: { __typename?: 'Team', id: string, name: string, created_at: string, contact?: { __typename?: 'Contact', first_name: string, last_name: string, phone: string, email: string } | null | undefined }, guest_team: { __typename?: 'Team', id: string, name: string, created_at: string, contact?: { __typename?: 'Contact', first_name: string, last_name: string, phone: string, email: string } | null | undefined }, pitch?: { __typename?: 'Pitch', id: string, label: string, location_longitude: number, location_latitude: number, contact?: { __typename?: 'Contact', first_name: string, last_name: string, phone: string, email: string } | null | undefined } | null | undefined } | null | undefined> | null | undefined } | null | undefined> | null | undefined };

export type AllTournamentsFragment = { __typename?: 'Tournament', id: string, name: string };

export type AllTournamentsCalendarFragment = { __typename?: 'Tournament', id: string, name: string, rounds?: Array<{ __typename?: 'MatchDay', id: string, number: number, start_date: string, end_date: string, matches?: Array<{ __typename?: 'Match', id: string, home_score?: number | null | undefined, guest_score?: number | null | undefined, kickoff?: any | null | undefined, cancelled_at?: string | null | undefined, cancellation_reason?: string | null | undefined, home_team: { __typename?: 'Team', id: string, name: string, created_at: string, contact?: { __typename?: 'Contact', first_name: string, last_name: string, phone: string, email: string } | null | undefined }, guest_team: { __typename?: 'Team', id: string, name: string, created_at: string, contact?: { __typename?: 'Contact', first_name: string, last_name: string, phone: string, email: string } | null | undefined }, pitch?: { __typename?: 'Pitch', id: string, label: string, location_longitude: number, location_latitude: number, contact?: { __typename?: 'Contact', first_name: string, last_name: string, phone: string, email: string } | null | undefined } | null | undefined } | null | undefined> | null | undefined } | null | undefined> | null | undefined };

export type TournamentFragment = { __typename?: 'Tournament', id: string, name: string, rounds?: Array<{ __typename?: 'MatchDay', id: string, number: number, start_date: string, end_date: string, matches?: Array<{ __typename?: 'Match', id: string, home_score?: number | null | undefined, guest_score?: number | null | undefined, kickoff?: any | null | undefined, cancelled_at?: string | null | undefined, cancellation_reason?: string | null | undefined, home_team: { __typename?: 'Team', id: string, name: string, created_at: string, contact?: { __typename?: 'Contact', first_name: string, last_name: string, phone: string, email: string } | null | undefined }, guest_team: { __typename?: 'Team', id: string, name: string, created_at: string, contact?: { __typename?: 'Contact', first_name: string, last_name: string, phone: string, email: string } | null | undefined }, pitch?: { __typename?: 'Pitch', id: string, label: string, location_longitude: number, location_latitude: number, contact?: { __typename?: 'Contact', first_name: string, last_name: string, phone: string, email: string } | null | undefined } | null | undefined } | null | undefined> | null | undefined } | null | undefined> | null | undefined };

export type UserFragment = { __typename?: 'User', id: string, email: string, role: UserRole, first_name: string, last_name: string, teams?: Array<{ __typename?: 'Team', id: string, name: string, created_at: string, contact?: { __typename?: 'Contact', first_name: string, last_name: string, phone: string, email: string } | null | undefined } | null | undefined> | null | undefined };

export type EventFragment = { __typename?: 'Event', id: string, occurred_at: string, type: string };

export type RankingFragment = { __typename?: 'Season', id: string, ranking?: { __typename?: 'Ranking', updated_at?: string | null | undefined, positions?: Array<{ __typename?: 'RankingPosition', sort_index: number, number: number, matches: number, wins: number, draws: number, losses: number, scored_goals: number, conceded_goals: number, points: number, team: { __typename?: 'Team', id: string, name: string, created_at: string, contact?: { __typename?: 'Contact', first_name: string, last_name: string, phone: string, email: string } | null | undefined } } | null | undefined> | null | undefined, penalties?: Array<{ __typename?: 'RankingPenalty', id: string, reason: string, created_at: string, points: number, team: { __typename?: 'Team', id: string, name: string, created_at: string, contact?: { __typename?: 'Contact', first_name: string, last_name: string, phone: string, email: string } | null | undefined } } | null | undefined> | null | undefined } | null | undefined };

export type PenaltyFragment = { __typename?: 'RankingPenalty', id: string, reason: string, created_at: string, points: number, team: { __typename?: 'Team', id: string, name: string, created_at: string, contact?: { __typename?: 'Contact', first_name: string, last_name: string, phone: string, email: string } | null | undefined } };

export type SubmitResultMutationVariables = Exact<{
  match_id: Scalars['String'];
  home_score: Scalars['Int'];
  guest_score: Scalars['Int'];
}>;


export type SubmitResultMutation = { __typename?: 'mutation', submitMatchResult?: boolean | null | undefined };

export type ScheduleMatchMutationVariables = Exact<{
  match_id: Scalars['String'];
  kickoff: Scalars['DateTime'];
}>;


export type ScheduleMatchMutation = { __typename?: 'mutation', scheduleMatch?: boolean | null | undefined };

export type LocateMatchMutationVariables = Exact<{
  match_id: Scalars['String'];
  pitch_id: Scalars['String'];
}>;


export type LocateMatchMutation = { __typename?: 'mutation', locateMatch?: boolean | null | undefined };

export type CancelMatchMutationVariables = Exact<{
  match_id: Scalars['String'];
  reason: Scalars['String'];
}>;


export type CancelMatchMutation = { __typename?: 'mutation', cancelMatch?: boolean | null | undefined };

export type ScheduleAllMatchesForSeasonMutationVariables = Exact<{
  season_id: Scalars['String'];
  match_appointments: Array<InputMaybe<MatchAppointment>> | InputMaybe<MatchAppointment>;
}>;


export type ScheduleAllMatchesForSeasonMutation = { __typename?: 'mutation', scheduleAllMatchesForSeason?: boolean | null | undefined };

export type ScheduleAllMatchesForMatchDayMutationVariables = Exact<{
  match_day_id: Scalars['String'];
  match_appointments: Array<InputMaybe<MatchAppointment>> | InputMaybe<MatchAppointment>;
}>;


export type ScheduleAllMatchesForMatchDayMutation = { __typename?: 'mutation', scheduleAllMatchesForMatchDay?: boolean | null | undefined };

export type PasswordResetMutationVariables = Exact<{
  email: Scalars['String'];
  target_path: Scalars['String'];
}>;


export type PasswordResetMutation = { __typename?: 'mutation', sendPasswordResetMail?: boolean | null | undefined };

export type PasswordChangeMutationVariables = Exact<{
  new_password: Scalars['String'];
}>;


export type PasswordChangeMutation = { __typename?: 'mutation', changeUserPassword?: boolean | null | undefined };

export type AddRankingPenaltyMutationVariables = Exact<{
  id: Scalars['String'];
  season_id: Scalars['String'];
  team_id: Scalars['String'];
  reason: Scalars['String'];
  points: Scalars['Int'];
}>;


export type AddRankingPenaltyMutation = { __typename?: 'mutation', addRankingPenalty?: boolean | null | undefined };

export type RemoveRankingPenaltyMutationVariables = Exact<{
  ranking_penalty_id: Scalars['String'];
  season_id: Scalars['String'];
}>;


export type RemoveRankingPenaltyMutation = { __typename?: 'mutation', removeRankingPenalty?: boolean | null | undefined };

export type DeletePitchMutationVariables = Exact<{
  pitch_id: Scalars['String'];
}>;


export type DeletePitchMutation = { __typename?: 'mutation', deletePitch?: boolean | null | undefined };

export type UpdatePitchContactMutationVariables = Exact<{
  pitch_id: Scalars['String'];
  first_name: Scalars['String'];
  last_name: Scalars['String'];
  phone: Scalars['String'];
  email: Scalars['String'];
}>;


export type UpdatePitchContactMutation = { __typename?: 'mutation', updatePitchContact?: boolean | null | undefined };

export type CreatePitchMutationVariables = Exact<{
  id: Scalars['String'];
  label: Scalars['String'];
  longitude: Scalars['Float'];
  latitude: Scalars['Float'];
}>;


export type CreatePitchMutation = { __typename?: 'mutation', createPitch?: boolean | null | undefined };

export type CreateSeasonMutationVariables = Exact<{
  id?: InputMaybe<Scalars['String']>;
  name: Scalars['String'];
}>;


export type CreateSeasonMutation = { __typename?: 'mutation', createSeason?: boolean | null | undefined };

export type AddTeamToSeasonMutationVariables = Exact<{
  season_id: Scalars['String'];
  team_id: Scalars['String'];
}>;


export type AddTeamToSeasonMutation = { __typename?: 'mutation', addTeamToSeason?: boolean | null | undefined };

export type RemoveTeamFromSeasonMutationVariables = Exact<{
  season_id: Scalars['String'];
  team_id: Scalars['String'];
}>;


export type RemoveTeamFromSeasonMutation = { __typename?: 'mutation', removeTeamFromSeason?: boolean | null | undefined };

export type CreateMatchesForSeasonMutationVariables = Exact<{
  season_id: Scalars['String'];
  dates: Array<InputMaybe<DatePeriod>> | InputMaybe<DatePeriod>;
}>;


export type CreateMatchesForSeasonMutation = { __typename?: 'mutation', createMatchesForSeason?: boolean | null | undefined };

export type RescheduleMatchDayMutationVariables = Exact<{
  match_day_id: Scalars['String'];
  date_period: DatePeriod;
}>;


export type RescheduleMatchDayMutation = { __typename?: 'mutation', rescheduleMatchDay?: boolean | null | undefined };

export type StartSeasonMutationVariables = Exact<{
  id: Scalars['String'];
}>;


export type StartSeasonMutation = { __typename?: 'mutation', startSeason?: boolean | null | undefined };

export type EndSeasonMutationVariables = Exact<{
  season_id: Scalars['String'];
}>;


export type EndSeasonMutation = { __typename?: 'mutation', endSeason?: boolean | null | undefined };

export type CreateTeamMutationVariables = Exact<{
  id: Scalars['String'];
  name: Scalars['String'];
}>;


export type CreateTeamMutation = { __typename?: 'mutation', createTeam?: boolean | null | undefined };

export type UpdateTeamContactMutationVariables = Exact<{
  team_id: Scalars['String'];
  first_name: Scalars['String'];
  last_name: Scalars['String'];
  phone: Scalars['String'];
  email: Scalars['String'];
}>;


export type UpdateTeamContactMutation = { __typename?: 'mutation', updateTeamContact?: boolean | null | undefined };

export type RenameTeamMutationVariables = Exact<{
  team_id: Scalars['String'];
  new_name: Scalars['String'];
}>;


export type RenameTeamMutation = { __typename?: 'mutation', renameTeam?: boolean | null | undefined };

export type DeleteTeamMutationVariables = Exact<{
  team_id: Scalars['String'];
}>;


export type DeleteTeamMutation = { __typename?: 'mutation', deleteTeam?: boolean | null | undefined };

export type CreateTournamentMutationVariables = Exact<{
  id?: InputMaybe<Scalars['String']>;
  name: Scalars['String'];
}>;


export type CreateTournamentMutation = { __typename?: 'mutation', createTournament?: boolean | null | undefined };

export type CreateTournamentRoundMutationVariables = Exact<{
  tournament_id: Scalars['String'];
  round: Scalars['Int'];
  team_id_pairs: Array<InputMaybe<TeamIdPair>> | InputMaybe<TeamIdPair>;
  date_period: DatePeriod;
}>;


export type CreateTournamentRoundMutation = { __typename?: 'mutation', setTournamentRound?: boolean | null | undefined };

export type DeleteTournamentMutationVariables = Exact<{
  tournament_id: Scalars['String'];
}>;


export type DeleteTournamentMutation = { __typename?: 'mutation', deleteTournament?: boolean | null | undefined };

export type CreateUserMutationVariables = Exact<{
  id?: InputMaybe<Scalars['String']>;
  email: Scalars['String'];
  password: Scalars['String'];
  first_name: Scalars['String'];
  last_name: Scalars['String'];
  role: Scalars['String'];
  team_ids: Array<InputMaybe<Scalars['String']>> | InputMaybe<Scalars['String']>;
}>;


export type CreateUserMutation = { __typename?: 'mutation', createUser?: boolean | null | undefined };

export type UpdateUserMutationVariables = Exact<{
  user_id: Scalars['String'];
  email?: InputMaybe<Scalars['String']>;
  first_name?: InputMaybe<Scalars['String']>;
  last_name?: InputMaybe<Scalars['String']>;
  role?: InputMaybe<Scalars['String']>;
  team_ids?: InputMaybe<Array<InputMaybe<Scalars['String']>> | InputMaybe<Scalars['String']>>;
}>;


export type UpdateUserMutation = { __typename?: 'mutation', updateUser?: boolean | null | undefined };

export type DeleteUserMutationVariables = Exact<{
  user_id: Scalars['String'];
}>;


export type DeleteUserMutation = { __typename?: 'mutation', deleteUser?: boolean | null | undefined };

export type EventQueryVariables = Exact<{
  id: Scalars['String'];
}>;


export type EventQuery = { __typename?: 'query', event?: { __typename?: 'Event', id: string, occurred_at: string, type: string } | null | undefined };

export type LatestEventQueryVariables = Exact<{
  start_date?: InputMaybe<Scalars['Date']>;
  end_date?: InputMaybe<Scalars['Date']>;
  type?: InputMaybe<Scalars['String']>;
}>;


export type LatestEventQuery = { __typename?: 'query', latestEvents?: Array<{ __typename?: 'Event', id: string, occurred_at: string, type: string } | null | undefined> | null | undefined };

export type MatchQueryVariables = Exact<{
  id: Scalars['String'];
}>;


export type MatchQuery = { __typename?: 'query', match?: { __typename?: 'Match', id: string, home_score?: number | null | undefined, guest_score?: number | null | undefined, kickoff?: any | null | undefined, cancelled_at?: string | null | undefined, cancellation_reason?: string | null | undefined, home_team: { __typename?: 'Team', id: string, name: string, created_at: string, contact?: { __typename?: 'Contact', first_name: string, last_name: string, phone: string, email: string } | null | undefined }, guest_team: { __typename?: 'Team', id: string, name: string, created_at: string, contact?: { __typename?: 'Contact', first_name: string, last_name: string, phone: string, email: string } | null | undefined }, pitch?: { __typename?: 'Pitch', id: string, label: string, location_longitude: number, location_latitude: number, contact?: { __typename?: 'Contact', first_name: string, last_name: string, phone: string, email: string } | null | undefined } | null | undefined } | null | undefined };

export type MatchPlanQueryVariables = Exact<{
  id: Scalars['String'];
}>;


export type MatchPlanQuery = { __typename?: 'query', season?: { __typename?: 'Season', id: string, name: string, teams?: Array<{ __typename?: 'Team', id: string, name: string, created_at: string, contact?: { __typename?: 'Contact', first_name: string, last_name: string, phone: string, email: string } | null | undefined } | null | undefined> | null | undefined, match_days?: Array<{ __typename?: 'MatchDay', id: string, number: number, start_date: string, end_date: string, matches?: Array<{ __typename?: 'Match', id: string, home_score?: number | null | undefined, guest_score?: number | null | undefined, kickoff?: any | null | undefined, cancelled_at?: string | null | undefined, cancellation_reason?: string | null | undefined, home_team: { __typename?: 'Team', id: string, name: string, created_at: string, contact?: { __typename?: 'Contact', first_name: string, last_name: string, phone: string, email: string } | null | undefined }, guest_team: { __typename?: 'Team', id: string, name: string, created_at: string, contact?: { __typename?: 'Contact', first_name: string, last_name: string, phone: string, email: string } | null | undefined }, pitch?: { __typename?: 'Pitch', id: string, label: string, location_longitude: number, location_latitude: number, contact?: { __typename?: 'Contact', first_name: string, last_name: string, phone: string, email: string } | null | undefined } | null | undefined } | null | undefined> | null | undefined } | null | undefined> | null | undefined } | null | undefined };

export type SeasonPenaltiesQueryVariables = Exact<{
  id: Scalars['String'];
}>;


export type SeasonPenaltiesQuery = { __typename?: 'query', season?: { __typename?: 'Season', id: string, teams?: Array<{ __typename?: 'Team', id: string, name: string, created_at: string, contact?: { __typename?: 'Contact', first_name: string, last_name: string, phone: string, email: string } | null | undefined } | null | undefined> | null | undefined, ranking?: { __typename?: 'Ranking', penalties?: Array<{ __typename?: 'RankingPenalty', id: string, reason: string, created_at: string, points: number, team: { __typename?: 'Team', id: string, name: string, created_at: string, contact?: { __typename?: 'Contact', first_name: string, last_name: string, phone: string, email: string } | null | undefined } } | null | undefined> | null | undefined } | null | undefined } | null | undefined };

export type PitchesQueryVariables = Exact<{ [key: string]: never; }>;


export type PitchesQuery = { __typename?: 'query', allPitches?: Array<{ __typename?: 'Pitch', id: string, label: string, location_longitude: number, location_latitude: number, contact?: { __typename?: 'Contact', first_name: string, last_name: string, phone: string, email: string } | null | undefined } | null | undefined> | null | undefined };

export type RankingQueryVariables = Exact<{
  id: Scalars['String'];
}>;


export type RankingQuery = { __typename?: 'query', season?: { __typename?: 'Season', id: string, ranking?: { __typename?: 'Ranking', updated_at?: string | null | undefined, positions?: Array<{ __typename?: 'RankingPosition', sort_index: number, number: number, matches: number, wins: number, draws: number, losses: number, scored_goals: number, conceded_goals: number, points: number, team: { __typename?: 'Team', id: string, name: string, created_at: string, contact?: { __typename?: 'Contact', first_name: string, last_name: string, phone: string, email: string } | null | undefined } } | null | undefined> | null | undefined, penalties?: Array<{ __typename?: 'RankingPenalty', id: string, reason: string, created_at: string, points: number, team: { __typename?: 'Team', id: string, name: string, created_at: string, contact?: { __typename?: 'Contact', first_name: string, last_name: string, phone: string, email: string } | null | undefined } } | null | undefined> | null | undefined } | null | undefined } | null | undefined };

export type AllSeasonsListQueryVariables = Exact<{ [key: string]: never; }>;


export type AllSeasonsListQuery = { __typename?: 'query', allSeasons?: Array<{ __typename?: 'Season', id: string, name: string, state: SeasonState } | null | undefined> | null | undefined };

export type AllSeasonsCalendarQueryVariables = Exact<{ [key: string]: never; }>;


export type AllSeasonsCalendarQuery = { __typename?: 'query', allSeasons?: Array<{ __typename?: 'Season', id: string, name: string, state: SeasonState, match_days?: Array<{ __typename?: 'MatchDay', id: string, number: number, start_date: string, end_date: string, matches?: Array<{ __typename?: 'Match', id: string, home_score?: number | null | undefined, guest_score?: number | null | undefined, kickoff?: any | null | undefined, cancelled_at?: string | null | undefined, cancellation_reason?: string | null | undefined, home_team: { __typename?: 'Team', id: string, name: string, created_at: string, contact?: { __typename?: 'Contact', first_name: string, last_name: string, phone: string, email: string } | null | undefined }, guest_team: { __typename?: 'Team', id: string, name: string, created_at: string, contact?: { __typename?: 'Contact', first_name: string, last_name: string, phone: string, email: string } | null | undefined }, pitch?: { __typename?: 'Pitch', id: string, label: string, location_longitude: number, location_latitude: number, contact?: { __typename?: 'Contact', first_name: string, last_name: string, phone: string, email: string } | null | undefined } | null | undefined } | null | undefined> | null | undefined } | null | undefined> | null | undefined } | null | undefined> | null | undefined };

export type AllTeamsQueryVariables = Exact<{ [key: string]: never; }>;


export type AllTeamsQuery = { __typename?: 'query', allTeams?: Array<{ __typename?: 'Team', id: string, name: string, created_at: string, contact?: { __typename?: 'Contact', first_name: string, last_name: string, phone: string, email: string } | null | undefined } | null | undefined> | null | undefined };

export type AllTournamentListQueryVariables = Exact<{ [key: string]: never; }>;


export type AllTournamentListQuery = { __typename?: 'query', allTournaments?: Array<{ __typename?: 'Tournament', id: string, name: string } | null | undefined> | null | undefined };

export type AllTournamentCalendarQueryVariables = Exact<{ [key: string]: never; }>;


export type AllTournamentCalendarQuery = { __typename?: 'query', allTournaments?: Array<{ __typename?: 'Tournament', id: string, name: string, rounds?: Array<{ __typename?: 'MatchDay', id: string, number: number, start_date: string, end_date: string, matches?: Array<{ __typename?: 'Match', id: string, home_score?: number | null | undefined, guest_score?: number | null | undefined, kickoff?: any | null | undefined, cancelled_at?: string | null | undefined, cancellation_reason?: string | null | undefined, home_team: { __typename?: 'Team', id: string, name: string, created_at: string, contact?: { __typename?: 'Contact', first_name: string, last_name: string, phone: string, email: string } | null | undefined }, guest_team: { __typename?: 'Team', id: string, name: string, created_at: string, contact?: { __typename?: 'Contact', first_name: string, last_name: string, phone: string, email: string } | null | undefined }, pitch?: { __typename?: 'Pitch', id: string, label: string, location_longitude: number, location_latitude: number, contact?: { __typename?: 'Contact', first_name: string, last_name: string, phone: string, email: string } | null | undefined } | null | undefined } | null | undefined> | null | undefined } | null | undefined> | null | undefined } | null | undefined> | null | undefined };

export type TournamentQueryVariables = Exact<{
  id: Scalars['String'];
}>;


export type TournamentQuery = { __typename?: 'query', tournament?: { __typename?: 'Tournament', id: string, name: string, rounds?: Array<{ __typename?: 'MatchDay', id: string, number: number, start_date: string, end_date: string, matches?: Array<{ __typename?: 'Match', id: string, home_score?: number | null | undefined, guest_score?: number | null | undefined, kickoff?: any | null | undefined, cancelled_at?: string | null | undefined, cancellation_reason?: string | null | undefined, home_team: { __typename?: 'Team', id: string, name: string, created_at: string, contact?: { __typename?: 'Contact', first_name: string, last_name: string, phone: string, email: string } | null | undefined }, guest_team: { __typename?: 'Team', id: string, name: string, created_at: string, contact?: { __typename?: 'Contact', first_name: string, last_name: string, phone: string, email: string } | null | undefined }, pitch?: { __typename?: 'Pitch', id: string, label: string, location_longitude: number, location_latitude: number, contact?: { __typename?: 'Contact', first_name: string, last_name: string, phone: string, email: string } | null | undefined } | null | undefined } | null | undefined> | null | undefined } | null | undefined> | null | undefined } | null | undefined };

export type UserQueryVariables = Exact<{ [key: string]: never; }>;


export type UserQuery = { __typename?: 'query', authenticatedUser?: { __typename?: 'User', id: string, email: string, role: UserRole, first_name: string, last_name: string, teams?: Array<{ __typename?: 'Team', id: string, name: string, created_at: string, contact?: { __typename?: 'Contact', first_name: string, last_name: string, phone: string, email: string } | null | undefined } | null | undefined> | null | undefined } | null | undefined };

export type AllUsersQueryVariables = Exact<{ [key: string]: never; }>;


export type AllUsersQuery = { __typename?: 'query', allUsers?: Array<{ __typename?: 'User', id: string, email: string, role: UserRole, first_name: string, last_name: string, teams?: Array<{ __typename?: 'Team', id: string, name: string, created_at: string, contact?: { __typename?: 'Contact', first_name: string, last_name: string, phone: string, email: string } | null | undefined } | null | undefined> | null | undefined } | null | undefined> | null | undefined };

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
  submitMatchResult(match_id: $match_id, home_score: $home_score, guest_score: $guest_score)
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
  scheduleAllMatchesForSeason(season_id: $season_id, match_appointments: $match_appointments)
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
  scheduleAllMatchesForMatchDay(match_day_id: $match_day_id, match_appointments: $match_appointments)
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
export const AddRankingPenaltyDocument = gql`
    mutation AddRankingPenalty($id: String!, $season_id: String!, $team_id: String!, $reason: String!, $points: Int!) {
  addRankingPenalty(id: $id, season_id: $season_id, team_id: $team_id, reason: $reason, points: $points)
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class AddRankingPenaltyGQL extends Apollo.Mutation<AddRankingPenaltyMutation, AddRankingPenaltyMutationVariables> {
    document = AddRankingPenaltyDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const RemoveRankingPenaltyDocument = gql`
    mutation RemoveRankingPenalty($ranking_penalty_id: String!, $season_id: String!) {
  removeRankingPenalty(ranking_penalty_id: $ranking_penalty_id, season_id: $season_id)
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class RemoveRankingPenaltyGQL extends Apollo.Mutation<RemoveRankingPenaltyMutation, RemoveRankingPenaltyMutationVariables> {
    document = RemoveRankingPenaltyDocument;
    
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
  updatePitchContact(pitch_id: $pitch_id, first_name: $first_name, last_name: $last_name, phone: $phone, email: $email)
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
    mutation CreatePitch($id: String!, $label: String!, $longitude: Float!, $latitude: Float!) {
  createPitch(id: $id, label: $label, longitude: $longitude, latitude: $latitude)
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
    mutation CreateSeason($id: String, $name: String!) {
  createSeason(id: $id, name: $name)
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
export const StartSeasonDocument = gql`
    mutation StartSeason($id: String!) {
  startSeason(season_id: $id)
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
  updateTeamContact(team_id: $team_id, first_name: $first_name, last_name: $last_name, phone: $phone, email: $email)
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
  setTournamentRound(tournament_id: $tournament_id, round: $round, team_id_pairs: $team_id_pairs, date_period: $date_period)
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
export const CreateUserDocument = gql`
    mutation CreateUser($id: String, $email: String!, $password: String!, $first_name: String!, $last_name: String!, $role: String!, $team_ids: [String]!) {
  createUser(id: $id, email: $email, password: $password, first_name: $first_name, last_name: $last_name, role: $role, team_ids: $team_ids)
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
  updateUser(user_id: $user_id, email: $email, first_name: $first_name, last_name: $last_name, role: $role, team_ids: $team_ids)
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
export const EventDocument = gql`
    query Event($id: String!) {
  event(id: $id) {
    ...Event
  }
}
    ${EventFragmentDoc}`;

  @Injectable({
    providedIn: 'root'
  })
  export class EventGQL extends Apollo.Query<EventQuery, EventQueryVariables> {
    document = EventDocument;
    
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
export const MatchDocument = gql`
    query Match($id: String!) {
  match(id: $id) {
    ...Match
  }
}
    ${MatchFragmentDoc}`;

  @Injectable({
    providedIn: 'root'
  })
  export class MatchGQL extends Apollo.Query<MatchQuery, MatchQueryVariables> {
    document = MatchDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const MatchPlanDocument = gql`
    query MatchPlan($id: String!) {
  season(id: $id) {
    ...Season
  }
}
    ${SeasonFragmentDoc}`;

  @Injectable({
    providedIn: 'root'
  })
  export class MatchPlanGQL extends Apollo.Query<MatchPlanQuery, MatchPlanQueryVariables> {
    document = MatchPlanDocument;
    
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
    ${PitchFragmentDoc}`;

  @Injectable({
    providedIn: 'root'
  })
  export class PitchesGQL extends Apollo.Query<PitchesQuery, PitchesQueryVariables> {
    document = PitchesDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const RankingDocument = gql`
    query Ranking($id: String!) {
  season(id: $id) {
    ...Ranking
  }
}
    ${RankingFragmentDoc}`;

  @Injectable({
    providedIn: 'root'
  })
  export class RankingGQL extends Apollo.Query<RankingQuery, RankingQueryVariables> {
    document = RankingDocument;
    
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
    document = AllSeasonsListDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const AllSeasonsCalendarDocument = gql`
    query AllSeasonsCalendar {
  allSeasons {
    ...AllSeasonsCalendar
  }
}
    ${AllSeasonsCalendarFragmentDoc}`;

  @Injectable({
    providedIn: 'root'
  })
  export class AllSeasonsCalendarGQL extends Apollo.Query<AllSeasonsCalendarQuery, AllSeasonsCalendarQueryVariables> {
    document = AllSeasonsCalendarDocument;
    
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
    document = AllTeamsDocument;
    
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
    document = AllTournamentListDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const AllTournamentCalendarDocument = gql`
    query AllTournamentCalendar {
  allTournaments {
    ...AllTournamentsCalendar
  }
}
    ${AllTournamentsCalendarFragmentDoc}`;

  @Injectable({
    providedIn: 'root'
  })
  export class AllTournamentCalendarGQL extends Apollo.Query<AllTournamentCalendarQuery, AllTournamentCalendarQueryVariables> {
    document = AllTournamentCalendarDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const TournamentDocument = gql`
    query Tournament($id: String!) {
  tournament(id: $id) {
    ...Tournament
  }
}
    ${TournamentFragmentDoc}`;

  @Injectable({
    providedIn: 'root'
  })
  export class TournamentGQL extends Apollo.Query<TournamentQuery, TournamentQueryVariables> {
    document = TournamentDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const UserDocument = gql`
    query User {
  authenticatedUser {
    ...User
  }
}
    ${UserFragmentDoc}`;

  @Injectable({
    providedIn: 'root'
  })
  export class UserGQL extends Apollo.Query<UserQuery, UserQueryVariables> {
    document = UserDocument;
    
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
    document = AllUsersDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }