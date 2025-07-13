/* eslint-disable */
/* GENERATED DO NOT EDIT */
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
};

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

export type MatchFragment = { __typename?: 'Match', id: string, home_score?: number | null, guest_score?: number | null, kickoff?: any | null, cancelled_at?: string | null, cancellation_reason?: string | null, home_team: { __typename?: 'Team', id: string, name: string, logo_id?: string | null, created_at: string, contact?: { __typename?: 'Contact', first_name: string, last_name: string, phone: string, email: string } | null }, guest_team: { __typename?: 'Team', id: string, name: string, logo_id?: string | null, created_at: string, contact?: { __typename?: 'Contact', first_name: string, last_name: string, phone: string, email: string } | null }, pitch?: { __typename?: 'Pitch', id: string, label: string, location_longitude: number, location_latitude: number, contact?: { __typename?: 'Contact', first_name: string, last_name: string, phone: string, email: string } | null } | null };

export type MatchDayFragment = { __typename?: 'MatchDay', id: string, number: number, start_date: string, end_date: string, matches?: Array<{ __typename?: 'Match', id: string, home_score?: number | null, guest_score?: number | null, kickoff?: any | null, cancelled_at?: string | null, cancellation_reason?: string | null, home_team: { __typename?: 'Team', id: string, name: string, logo_id?: string | null, created_at: string, contact?: { __typename?: 'Contact', first_name: string, last_name: string, phone: string, email: string } | null }, guest_team: { __typename?: 'Team', id: string, name: string, logo_id?: string | null, created_at: string, contact?: { __typename?: 'Contact', first_name: string, last_name: string, phone: string, email: string } | null }, pitch?: { __typename?: 'Pitch', id: string, label: string, location_longitude: number, location_latitude: number, contact?: { __typename?: 'Contact', first_name: string, last_name: string, phone: string, email: string } | null } | null } | null> | null };

export type PitchFragment = { __typename?: 'Pitch', id: string, label: string, location_longitude: number, location_latitude: number, contact?: { __typename?: 'Contact', first_name: string, last_name: string, phone: string, email: string } | null };

export type TeamFragment = { __typename?: 'Team', id: string, name: string, logo_id?: string | null, created_at: string, contact?: { __typename?: 'Contact', first_name: string, last_name: string, phone: string, email: string } | null };

export type ContactFragment = { __typename?: 'Contact', first_name: string, last_name: string, phone: string, email: string };

export type SeasonFragment = { __typename?: 'Season', id: string, name: string, state: SeasonState, teams?: Array<{ __typename?: 'Team', id: string, name: string, logo_id?: string | null, created_at: string, contact?: { __typename?: 'Contact', first_name: string, last_name: string, phone: string, email: string } | null } | null> | null, match_days?: Array<{ __typename?: 'MatchDay', id: string, number: number, start_date: string, end_date: string, matches?: Array<{ __typename?: 'Match', id: string, home_score?: number | null, guest_score?: number | null, kickoff?: any | null, cancelled_at?: string | null, cancellation_reason?: string | null, home_team: { __typename?: 'Team', id: string, name: string, logo_id?: string | null, created_at: string, contact?: { __typename?: 'Contact', first_name: string, last_name: string, phone: string, email: string } | null }, guest_team: { __typename?: 'Team', id: string, name: string, logo_id?: string | null, created_at: string, contact?: { __typename?: 'Contact', first_name: string, last_name: string, phone: string, email: string } | null }, pitch?: { __typename?: 'Pitch', id: string, label: string, location_longitude: number, location_latitude: number, contact?: { __typename?: 'Contact', first_name: string, last_name: string, phone: string, email: string } | null } | null } | null> | null } | null> | null };

export type AllSeasonsFragment = { __typename?: 'Season', id: string, name: string, state: SeasonState, match_days?: Array<{ __typename?: 'MatchDay', number: number, start_date: string } | null> | null };

export type AllSeasonsHoFFragment = { __typename?: 'Season', id: string, name: string, state: SeasonState, match_days?: Array<{ __typename?: 'MatchDay', number: number, start_date: string } | null> | null, ranking?: { __typename?: 'Ranking', positions?: Array<{ __typename?: 'RankingPosition', sort_index: number, team: { __typename?: 'Team', id: string, name: string, logo_id?: string | null } } | null> | null } | null };

export type AllSeasonsCalendarFragment = { __typename?: 'Season', id: string, name: string, state: SeasonState, match_days?: Array<{ __typename?: 'MatchDay', id: string, number: number, start_date: string, end_date: string, matches?: Array<{ __typename?: 'Match', id: string, home_score?: number | null, guest_score?: number | null, kickoff?: any | null, cancelled_at?: string | null, cancellation_reason?: string | null, home_team: { __typename?: 'Team', id: string, name: string, logo_id?: string | null, created_at: string, contact?: { __typename?: 'Contact', first_name: string, last_name: string, phone: string, email: string } | null }, guest_team: { __typename?: 'Team', id: string, name: string, logo_id?: string | null, created_at: string, contact?: { __typename?: 'Contact', first_name: string, last_name: string, phone: string, email: string } | null }, pitch?: { __typename?: 'Pitch', id: string, label: string, location_longitude: number, location_latitude: number, contact?: { __typename?: 'Contact', first_name: string, last_name: string, phone: string, email: string } | null } | null } | null> | null } | null> | null };

export type AllTournamentsFragment = { __typename?: 'Tournament', id: string, name: string };

export type AllTournamentsCalendarFragment = { __typename?: 'Tournament', id: string, name: string, rounds?: Array<{ __typename?: 'MatchDay', id: string, number: number, start_date: string, end_date: string, matches?: Array<{ __typename?: 'Match', id: string, home_score?: number | null, guest_score?: number | null, kickoff?: any | null, cancelled_at?: string | null, cancellation_reason?: string | null, home_team: { __typename?: 'Team', id: string, name: string, logo_id?: string | null, created_at: string, contact?: { __typename?: 'Contact', first_name: string, last_name: string, phone: string, email: string } | null }, guest_team: { __typename?: 'Team', id: string, name: string, logo_id?: string | null, created_at: string, contact?: { __typename?: 'Contact', first_name: string, last_name: string, phone: string, email: string } | null }, pitch?: { __typename?: 'Pitch', id: string, label: string, location_longitude: number, location_latitude: number, contact?: { __typename?: 'Contact', first_name: string, last_name: string, phone: string, email: string } | null } | null } | null> | null } | null> | null };

export type TournamentFragment = { __typename?: 'Tournament', id: string, name: string, rounds?: Array<{ __typename?: 'MatchDay', id: string, number: number, start_date: string, end_date: string, matches?: Array<{ __typename?: 'Match', id: string, home_score?: number | null, guest_score?: number | null, kickoff?: any | null, cancelled_at?: string | null, cancellation_reason?: string | null, home_team: { __typename?: 'Team', id: string, name: string, logo_id?: string | null, created_at: string, contact?: { __typename?: 'Contact', first_name: string, last_name: string, phone: string, email: string } | null }, guest_team: { __typename?: 'Team', id: string, name: string, logo_id?: string | null, created_at: string, contact?: { __typename?: 'Contact', first_name: string, last_name: string, phone: string, email: string } | null }, pitch?: { __typename?: 'Pitch', id: string, label: string, location_longitude: number, location_latitude: number, contact?: { __typename?: 'Contact', first_name: string, last_name: string, phone: string, email: string } | null } | null } | null> | null } | null> | null };

export type UserFragment = { __typename?: 'User', id: string, email: string, role: UserRole, first_name: string, last_name: string, teams?: Array<{ __typename?: 'Team', id: string, name: string, logo_id?: string | null, created_at: string, contact?: { __typename?: 'Contact', first_name: string, last_name: string, phone: string, email: string } | null } | null> | null };

export type EventFragment = { __typename?: 'Event', id: string, occurred_at: string, type: string };

export type RankingFragment = { __typename?: 'Season', id: string, ranking?: { __typename?: 'Ranking', updated_at?: string | null, positions?: Array<{ __typename?: 'RankingPosition', sort_index: number, number: number, matches: number, wins: number, draws: number, losses: number, scored_goals: number, conceded_goals: number, points: number, team: { __typename?: 'Team', id: string, name: string, logo_id?: string | null, created_at: string, contact?: { __typename?: 'Contact', first_name: string, last_name: string, phone: string, email: string } | null } } | null> | null, penalties?: Array<{ __typename?: 'RankingPenalty', id: string, reason: string, created_at: string, points: number, team: { __typename?: 'Team', id: string, name: string, logo_id?: string | null, created_at: string, contact?: { __typename?: 'Contact', first_name: string, last_name: string, phone: string, email: string } | null } } | null> | null } | null };

export type PenaltyFragment = { __typename?: 'RankingPenalty', id: string, reason: string, created_at: string, points: number, team: { __typename?: 'Team', id: string, name: string, logo_id?: string | null, created_at: string, contact?: { __typename?: 'Contact', first_name: string, last_name: string, phone: string, email: string } | null } };

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

export type AddRankingPenaltyMutationVariables = Exact<{
  id: Scalars['String']['input'];
  season_id: Scalars['String']['input'];
  team_id: Scalars['String']['input'];
  reason: Scalars['String']['input'];
  points: Scalars['Int']['input'];
}>;


export type AddRankingPenaltyMutation = { __typename?: 'mutation', addRankingPenalty?: boolean | null };

export type RemoveRankingPenaltyMutationVariables = Exact<{
  ranking_penalty_id: Scalars['String']['input'];
  season_id: Scalars['String']['input'];
}>;


export type RemoveRankingPenaltyMutation = { __typename?: 'mutation', removeRankingPenalty?: boolean | null };

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
  longitude: Scalars['Float']['input'];
  latitude: Scalars['Float']['input'];
}>;


export type CreatePitchMutation = { __typename?: 'mutation', createPitch?: boolean | null };

export type CreateSeasonMutationVariables = Exact<{
  id?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
}>;


export type CreateSeasonMutation = { __typename?: 'mutation', createSeason?: boolean | null };

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

export type StartSeasonMutationVariables = Exact<{
  id: Scalars['String']['input'];
}>;


export type StartSeasonMutation = { __typename?: 'mutation', startSeason?: boolean | null };

export type EndSeasonMutationVariables = Exact<{
  season_id: Scalars['String']['input'];
}>;


export type EndSeasonMutation = { __typename?: 'mutation', endSeason?: boolean | null };

export type DeleteSeasonMutationVariables = Exact<{
  season_id: Scalars['String']['input'];
}>;


export type DeleteSeasonMutation = { __typename?: 'mutation', deleteSeason?: boolean | null };

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

export type CalendarQueryVariables = Exact<{
  min_date?: InputMaybe<Scalars['DateTime']['input']>;
  max_date?: InputMaybe<Scalars['DateTime']['input']>;
}>;


export type CalendarQuery = { __typename?: 'query', allSeasons?: Array<{ __typename?: 'Season', id: string, name: string, state: SeasonState, match_days?: Array<{ __typename?: 'MatchDay', number: number, start_date: string, end_date: string } | null> | null } | null> | null, allTournaments?: Array<{ __typename?: 'Tournament', id: string, name: string, rounds?: Array<{ __typename?: 'MatchDay', number: number, start_date: string, end_date: string } | null> | null } | null> | null, matchesByKickoff?: Array<{ __typename?: 'Match', id: string, kickoff?: any | null, home_score?: number | null, guest_score?: number | null, cancelled_at?: string | null, cancellation_reason?: string | null, home_team: { __typename?: 'Team', id: string, name: string, logo_id?: string | null, created_at: string, contact?: { __typename?: 'Contact', first_name: string, last_name: string, phone: string, email: string } | null }, guest_team: { __typename?: 'Team', id: string, name: string, logo_id?: string | null, created_at: string, contact?: { __typename?: 'Contact', first_name: string, last_name: string, phone: string, email: string } | null }, pitch?: { __typename?: 'Pitch', id: string, label: string, location_longitude: number, location_latitude: number, contact?: { __typename?: 'Contact', first_name: string, last_name: string, phone: string, email: string } | null } | null } | null> | null };

export type AllEventQueryVariables = Exact<{
  id: Scalars['String']['input'];
}>;


export type AllEventQuery = { __typename?: 'query', event?: { __typename?: 'Event', id: string, occurred_at: string, type: string } | null };

export type LatestEventQueryVariables = Exact<{
  start_date?: InputMaybe<Scalars['Date']['input']>;
  end_date?: InputMaybe<Scalars['Date']['input']>;
  type?: InputMaybe<Scalars['String']['input']>;
}>;


export type LatestEventQuery = { __typename?: 'query', latestEvents?: Array<{ __typename?: 'Event', id: string, occurred_at: string, type: string } | null> | null };

export type MatchByIdQueryVariables = Exact<{
  id: Scalars['String']['input'];
}>;


export type MatchByIdQuery = { __typename?: 'query', match?: { __typename?: 'Match', id: string, home_score?: number | null, guest_score?: number | null, kickoff?: any | null, cancelled_at?: string | null, cancellation_reason?: string | null, home_team: { __typename?: 'Team', id: string, name: string, logo_id?: string | null, created_at: string, contact?: { __typename?: 'Contact', first_name: string, last_name: string, phone: string, email: string } | null }, guest_team: { __typename?: 'Team', id: string, name: string, logo_id?: string | null, created_at: string, contact?: { __typename?: 'Contact', first_name: string, last_name: string, phone: string, email: string } | null }, pitch?: { __typename?: 'Pitch', id: string, label: string, location_longitude: number, location_latitude: number, contact?: { __typename?: 'Contact', first_name: string, last_name: string, phone: string, email: string } | null } | null } | null };

export type SeasonPenaltiesQueryVariables = Exact<{
  id: Scalars['String']['input'];
}>;


export type SeasonPenaltiesQuery = { __typename?: 'query', season?: { __typename?: 'Season', id: string, teams?: Array<{ __typename?: 'Team', id: string, name: string, logo_id?: string | null, created_at: string, contact?: { __typename?: 'Contact', first_name: string, last_name: string, phone: string, email: string } | null } | null> | null, ranking?: { __typename?: 'Ranking', penalties?: Array<{ __typename?: 'RankingPenalty', id: string, reason: string, created_at: string, points: number, team: { __typename?: 'Team', id: string, name: string, logo_id?: string | null, created_at: string, contact?: { __typename?: 'Contact', first_name: string, last_name: string, phone: string, email: string } | null } } | null> | null } | null } | null };

export type PitchesQueryVariables = Exact<{ [key: string]: never; }>;


export type PitchesQuery = { __typename?: 'query', allPitches?: Array<{ __typename?: 'Pitch', id: string, label: string, location_longitude: number, location_latitude: number, contact?: { __typename?: 'Contact', first_name: string, last_name: string, phone: string, email: string } | null } | null> | null };

export type RankingByIdQueryVariables = Exact<{
  id: Scalars['String']['input'];
}>;


export type RankingByIdQuery = { __typename?: 'query', season?: { __typename?: 'Season', id: string, ranking?: { __typename?: 'Ranking', updated_at?: string | null, positions?: Array<{ __typename?: 'RankingPosition', sort_index: number, number: number, matches: number, wins: number, draws: number, losses: number, scored_goals: number, conceded_goals: number, points: number, team: { __typename?: 'Team', id: string, name: string, logo_id?: string | null, created_at: string, contact?: { __typename?: 'Contact', first_name: string, last_name: string, phone: string, email: string } | null } } | null> | null, penalties?: Array<{ __typename?: 'RankingPenalty', id: string, reason: string, created_at: string, points: number, team: { __typename?: 'Team', id: string, name: string, logo_id?: string | null, created_at: string, contact?: { __typename?: 'Contact', first_name: string, last_name: string, phone: string, email: string } | null } } | null> | null } | null } | null };

export type AllSeasonsListQueryVariables = Exact<{ [key: string]: never; }>;


export type AllSeasonsListQuery = { __typename?: 'query', allSeasons?: Array<{ __typename?: 'Season', id: string, name: string, state: SeasonState, match_days?: Array<{ __typename?: 'MatchDay', number: number, start_date: string } | null> | null } | null> | null };

export type HallOfFameQueryVariables = Exact<{ [key: string]: never; }>;


export type HallOfFameQuery = { __typename?: 'query', allSeasons?: Array<{ __typename?: 'Season', id: string, name: string, state: SeasonState, match_days?: Array<{ __typename?: 'MatchDay', number: number, start_date: string } | null> | null, ranking?: { __typename?: 'Ranking', positions?: Array<{ __typename?: 'RankingPosition', sort_index: number, team: { __typename?: 'Team', id: string, name: string, logo_id?: string | null } } | null> | null } | null } | null> | null };

export type SeasonByIdQueryVariables = Exact<{
  id: Scalars['String']['input'];
}>;


export type SeasonByIdQuery = { __typename?: 'query', season?: { __typename?: 'Season', id: string, name: string, state: SeasonState, teams?: Array<{ __typename?: 'Team', id: string, name: string, logo_id?: string | null, created_at: string, contact?: { __typename?: 'Contact', first_name: string, last_name: string, phone: string, email: string } | null } | null> | null, match_days?: Array<{ __typename?: 'MatchDay', id: string, number: number, start_date: string, end_date: string, matches?: Array<{ __typename?: 'Match', id: string, home_score?: number | null, guest_score?: number | null, kickoff?: any | null, cancelled_at?: string | null, cancellation_reason?: string | null, home_team: { __typename?: 'Team', id: string, name: string, logo_id?: string | null, created_at: string, contact?: { __typename?: 'Contact', first_name: string, last_name: string, phone: string, email: string } | null }, guest_team: { __typename?: 'Team', id: string, name: string, logo_id?: string | null, created_at: string, contact?: { __typename?: 'Contact', first_name: string, last_name: string, phone: string, email: string } | null }, pitch?: { __typename?: 'Pitch', id: string, label: string, location_longitude: number, location_latitude: number, contact?: { __typename?: 'Contact', first_name: string, last_name: string, phone: string, email: string } | null } | null } | null> | null } | null> | null } | null };

export type AllTeamsQueryVariables = Exact<{ [key: string]: never; }>;


export type AllTeamsQuery = { __typename?: 'query', allTeams?: Array<{ __typename?: 'Team', id: string, name: string, logo_id?: string | null, created_at: string, contact?: { __typename?: 'Contact', first_name: string, last_name: string, phone: string, email: string } | null } | null> | null };

export type TeamByIdQueryVariables = Exact<{
  id: Scalars['String']['input'];
}>;


export type TeamByIdQuery = { __typename?: 'query', team?: { __typename?: 'Team', id: string, name: string, logo_id?: string | null, created_at: string, contact?: { __typename?: 'Contact', first_name: string, last_name: string, phone: string, email: string } | null } | null };

export type AllTournamentListQueryVariables = Exact<{ [key: string]: never; }>;


export type AllTournamentListQuery = { __typename?: 'query', allTournaments?: Array<{ __typename?: 'Tournament', id: string, name: string } | null> | null };

export type TournamentByIdQueryVariables = Exact<{
  id: Scalars['String']['input'];
}>;


export type TournamentByIdQuery = { __typename?: 'query', tournament?: { __typename?: 'Tournament', id: string, name: string, rounds?: Array<{ __typename?: 'MatchDay', id: string, number: number, start_date: string, end_date: string, matches?: Array<{ __typename?: 'Match', id: string, home_score?: number | null, guest_score?: number | null, kickoff?: any | null, cancelled_at?: string | null, cancellation_reason?: string | null, home_team: { __typename?: 'Team', id: string, name: string, logo_id?: string | null, created_at: string, contact?: { __typename?: 'Contact', first_name: string, last_name: string, phone: string, email: string } | null }, guest_team: { __typename?: 'Team', id: string, name: string, logo_id?: string | null, created_at: string, contact?: { __typename?: 'Contact', first_name: string, last_name: string, phone: string, email: string } | null }, pitch?: { __typename?: 'Pitch', id: string, label: string, location_longitude: number, location_latitude: number, contact?: { __typename?: 'Contact', first_name: string, last_name: string, phone: string, email: string } | null } | null } | null> | null } | null> | null } | null };

export type AuthenticatedUserQueryVariables = Exact<{ [key: string]: never; }>;


export type AuthenticatedUserQuery = { __typename?: 'query', authenticatedUser?: { __typename?: 'User', id: string, email: string, role: UserRole, first_name: string, last_name: string, teams?: Array<{ __typename?: 'Team', id: string, name: string, logo_id?: string | null, created_at: string, contact?: { __typename?: 'Contact', first_name: string, last_name: string, phone: string, email: string } | null } | null> | null } | null };

export type AllUsersQueryVariables = Exact<{ [key: string]: never; }>;


export type AllUsersQuery = { __typename?: 'query', allUsers?: Array<{ __typename?: 'User', id: string, email: string, role: UserRole, first_name: string, last_name: string, teams?: Array<{ __typename?: 'Team', id: string, name: string, logo_id?: string | null, created_at: string, contact?: { __typename?: 'Contact', first_name: string, last_name: string, phone: string, email: string } | null } | null> | null } | null> | null };


export const aContact = (overrides?: Partial<Contact>): Contact => {
    return {
        email: overrides && overrides.hasOwnProperty('email') ? overrides.email! : 'calco',
        first_name: overrides && overrides.hasOwnProperty('first_name') ? overrides.first_name! : 'casus',
        last_name: overrides && overrides.hasOwnProperty('last_name') ? overrides.last_name! : 'auxilium',
        phone: overrides && overrides.hasOwnProperty('phone') ? overrides.phone! : 'turba',
    };
};

export const aDatePeriod = (overrides?: Partial<DatePeriod>): DatePeriod => {
    return {
        from: overrides && overrides.hasOwnProperty('from') ? overrides.from! : '2021-01-22T18:30:09.813Z',
        to: overrides && overrides.hasOwnProperty('to') ? overrides.to! : '2021-01-05T07:24:55.732Z',
    };
};

export const anEvent = (overrides?: Partial<Event>): Event => {
    return {
        id: overrides && overrides.hasOwnProperty('id') ? overrides.id! : 'temeritas',
        occurred_at: overrides && overrides.hasOwnProperty('occurred_at') ? overrides.occurred_at! : 'adfectus',
        type: overrides && overrides.hasOwnProperty('type') ? overrides.type! : 'copiose',
    };
};

export const aMatch = (overrides?: Partial<Match>): Match => {
    return {
        cancellation_reason: overrides && overrides.hasOwnProperty('cancellation_reason') ? overrides.cancellation_reason! : 'desino',
        cancelled_at: overrides && overrides.hasOwnProperty('cancelled_at') ? overrides.cancelled_at! : 'voco',
        guest_score: overrides && overrides.hasOwnProperty('guest_score') ? overrides.guest_score! : 6016,
        guest_team: overrides && overrides.hasOwnProperty('guest_team') ? overrides.guest_team! : aTeam(),
        home_score: overrides && overrides.hasOwnProperty('home_score') ? overrides.home_score! : 192,
        home_team: overrides && overrides.hasOwnProperty('home_team') ? overrides.home_team! : aTeam(),
        id: overrides && overrides.hasOwnProperty('id') ? overrides.id! : 'venustas',
        kickoff: overrides && overrides.hasOwnProperty('kickoff') ? overrides.kickoff! : 'temperantia',
        pitch: overrides && overrides.hasOwnProperty('pitch') ? overrides.pitch! : aPitch(),
    };
};

export const aMatchAppointment = (overrides?: Partial<MatchAppointment>): MatchAppointment => {
    return {
        kickoff: overrides && overrides.hasOwnProperty('kickoff') ? overrides.kickoff! : 'at',
        pitch_id: overrides && overrides.hasOwnProperty('pitch_id') ? overrides.pitch_id! : 'canonicus',
        unavailable_team_ids: overrides && overrides.hasOwnProperty('unavailable_team_ids') ? overrides.unavailable_team_ids! : ['cruentus'],
    };
};

export const aMatchDay = (overrides?: Partial<MatchDay>): MatchDay => {
    return {
        end_date: overrides && overrides.hasOwnProperty('end_date') ? overrides.end_date! : 'volutabrum',
        id: overrides && overrides.hasOwnProperty('id') ? overrides.id! : 'timor',
        matches: overrides && overrides.hasOwnProperty('matches') ? overrides.matches! : [aMatch()],
        number: overrides && overrides.hasOwnProperty('number') ? overrides.number! : 6472,
        start_date: overrides && overrides.hasOwnProperty('start_date') ? overrides.start_date! : 'tristis',
    };
};

export const aPitch = (overrides?: Partial<Pitch>): Pitch => {
    return {
        contact: overrides && overrides.hasOwnProperty('contact') ? overrides.contact! : aContact(),
        id: overrides && overrides.hasOwnProperty('id') ? overrides.id! : 'deleo',
        label: overrides && overrides.hasOwnProperty('label') ? overrides.label! : 'vulariter',
        location_latitude: overrides && overrides.hasOwnProperty('location_latitude') ? overrides.location_latitude! : 6.9,
        location_longitude: overrides && overrides.hasOwnProperty('location_longitude') ? overrides.location_longitude! : 4.8,
    };
};

export const aRanking = (overrides?: Partial<Ranking>): Ranking => {
    return {
        penalties: overrides && overrides.hasOwnProperty('penalties') ? overrides.penalties! : [aRankingPenalty()],
        positions: overrides && overrides.hasOwnProperty('positions') ? overrides.positions! : [aRankingPosition()],
        updated_at: overrides && overrides.hasOwnProperty('updated_at') ? overrides.updated_at! : 'virgo',
    };
};

export const aRankingPenalty = (overrides?: Partial<RankingPenalty>): RankingPenalty => {
    return {
        created_at: overrides && overrides.hasOwnProperty('created_at') ? overrides.created_at! : 'delectus',
        id: overrides && overrides.hasOwnProperty('id') ? overrides.id! : 'commodo',
        points: overrides && overrides.hasOwnProperty('points') ? overrides.points! : 2510,
        reason: overrides && overrides.hasOwnProperty('reason') ? overrides.reason! : 'supra',
        team: overrides && overrides.hasOwnProperty('team') ? overrides.team! : aTeam(),
    };
};

export const aRankingPosition = (overrides?: Partial<RankingPosition>): RankingPosition => {
    return {
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

export const aSeason = (overrides?: Partial<Season>): Season => {
    return {
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

export const aTeam = (overrides?: Partial<Team>): Team => {
    return {
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

export const aTournament = (overrides?: Partial<Tournament>): Tournament => {
    return {
        id: overrides && overrides.hasOwnProperty('id') ? overrides.id! : 'saepe',
        name: overrides && overrides.hasOwnProperty('name') ? overrides.name! : 'volubilis',
        rounds: overrides && overrides.hasOwnProperty('rounds') ? overrides.rounds! : [aMatchDay()],
    };
};

export const aUser = (overrides?: Partial<User>): User => {
    return {
        email: overrides && overrides.hasOwnProperty('email') ? overrides.email! : 'natus',
        first_name: overrides && overrides.hasOwnProperty('first_name') ? overrides.first_name! : 'comis',
        id: overrides && overrides.hasOwnProperty('id') ? overrides.id! : 'suscipio',
        last_name: overrides && overrides.hasOwnProperty('last_name') ? overrides.last_name! : 'sulum',
        locale: overrides && overrides.hasOwnProperty('locale') ? overrides.locale! : UserLocale.De,
        role: overrides && overrides.hasOwnProperty('role') ? overrides.role! : UserRole.Admin,
        teams: overrides && overrides.hasOwnProperty('teams') ? overrides.teams! : [aTeam()],
    };
};

export const aMutation = (overrides?: Partial<Mutation>): Mutation => {
    return {
        addRankingPenalty: overrides && overrides.hasOwnProperty('addRankingPenalty') ? overrides.addRankingPenalty! : true,
        addTeamToSeason: overrides && overrides.hasOwnProperty('addTeamToSeason') ? overrides.addTeamToSeason! : true,
        cancelMatch: overrides && overrides.hasOwnProperty('cancelMatch') ? overrides.cancelMatch! : false,
        changeUserPassword: overrides && overrides.hasOwnProperty('changeUserPassword') ? overrides.changeUserPassword! : false,
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
        submitMatchResult: overrides && overrides.hasOwnProperty('submitMatchResult') ? overrides.submitMatchResult! : false,
        updatePitchContact: overrides && overrides.hasOwnProperty('updatePitchContact') ? overrides.updatePitchContact! : false,
        updateTeamContact: overrides && overrides.hasOwnProperty('updateTeamContact') ? overrides.updateTeamContact! : true,
        updateUser: overrides && overrides.hasOwnProperty('updateUser') ? overrides.updateUser! : true,
    };
};

export const aQuery = (overrides?: Partial<Query>): Query => {
    return {
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
