/* tslint:disable */
export type Maybe<T> = T | null;

export interface DatePeriod {
  from: Date;

  to: Date;
}

export interface MatchAppointment {
  kickoff: DateTime;

  unavailable_team_ids: (Maybe<string>)[];

  pitch_id: string;
}

export interface TeamIdPair {
  home_team_id: string;

  guest_team_id: string;
}

export enum SeasonState {
  Preparation = "preparation",
  Progress = "progress",
  Ended = "ended"
}

export enum UserRole {
  Admin = "admin",
  TeamManager = "team_manager"
}

/** The `String` scalar type represents textual data, represented as UTF-8 character sequences. The String type is most often used by GraphQL to represent free-form human-readable text. */
export type Date = any;

/** The `String` scalar type represents textual data, represented as UTF-8 character sequences. The String type is most often used by GraphQL to represent free-form human-readable text. */
export type DateTime = any;

// ====================================================
// Documents
// ====================================================

export namespace SubmitResult {
  export type Variables = {
    match_id: string;
    home_score: number;
    guest_score: number;
  };

  export type Mutation = {
    __typename?: "Mutation";

    submitMatchResult: Maybe<boolean>;
  };
}

export namespace ScheduleMatch {
  export type Variables = {
    match_id: string;
    kickoff: DateTime;
  };

  export type Mutation = {
    __typename?: "Mutation";

    scheduleMatch: Maybe<boolean>;
  };
}

export namespace LocateMatch {
  export type Variables = {
    match_id: string;
    pitch_id: string;
  };

  export type Mutation = {
    __typename?: "Mutation";

    locateMatch: Maybe<boolean>;
  };
}

export namespace CancelMatch {
  export type Variables = {
    match_id: string;
    reason: string;
  };

  export type Mutation = {
    __typename?: "Mutation";

    cancelMatch: Maybe<boolean>;
  };
}

export namespace ScheduleAllMatchesForSeason {
  export type Variables = {
    season_id: string;
    match_appointments: (Maybe<MatchAppointment>)[];
  };

  export type Mutation = {
    __typename?: "Mutation";

    scheduleAllMatchesForSeason: Maybe<boolean>;
  };
}

export namespace PasswordReset {
  export type Variables = {
    email: string;
    target_path: string;
  };

  export type Mutation = {
    __typename?: "Mutation";

    sendPasswordResetMail: Maybe<boolean>;
  };
}

export namespace PasswordChange {
  export type Variables = {
    new_password: string;
  };

  export type Mutation = {
    __typename?: "Mutation";

    changeUserPassword: Maybe<boolean>;
  };
}

export namespace AddRankingPenalty {
  export type Variables = {
    id: string;
    season_id: string;
    team_id: string;
    reason: string;
    points: number;
  };

  export type Mutation = {
    __typename?: "Mutation";

    addRankingPenalty: Maybe<boolean>;
  };
}

export namespace RemoveRankingPenalty {
  export type Variables = {
    ranking_penalty_id: string;
    season_id: string;
  };

  export type Mutation = {
    __typename?: "Mutation";

    removeRankingPenalty: Maybe<boolean>;
  };
}

export namespace DeletePitch {
  export type Variables = {
    pitch_id: string;
  };

  export type Mutation = {
    __typename?: "Mutation";

    deletePitch: Maybe<boolean>;
  };
}

export namespace UpdatePitchContact {
  export type Variables = {
    pitch_id: string;
    first_name: string;
    last_name: string;
    phone: string;
    email: string;
  };

  export type Mutation = {
    __typename?: "Mutation";

    updatePitchContact: Maybe<boolean>;
  };
}

export namespace CreatePitch {
  export type Variables = {
    id: string;
    label: string;
    longitude: number;
    latitude: number;
  };

  export type Mutation = {
    __typename?: "Mutation";

    createPitch: Maybe<boolean>;
  };
}

export namespace CreateSeason {
  export type Variables = {
    id?: Maybe<string>;
    name: string;
  };

  export type Mutation = {
    __typename?: "Mutation";

    createSeason: Maybe<boolean>;
  };
}

export namespace AddTeamToSeason {
  export type Variables = {
    season_id: string;
    team_id: string;
  };

  export type Mutation = {
    __typename?: "Mutation";

    addTeamToSeason: Maybe<boolean>;
  };
}

export namespace RemoveTeamFromSeason {
  export type Variables = {
    season_id: string;
    team_id: string;
  };

  export type Mutation = {
    __typename?: "Mutation";

    removeTeamFromSeason: Maybe<boolean>;
  };
}

export namespace CreateMatchesForSeason {
  export type Variables = {
    season_id: string;
    dates: (Maybe<DatePeriod>)[];
  };

  export type Mutation = {
    __typename?: "Mutation";

    createMatchesForSeason: Maybe<boolean>;
  };
}

export namespace RescheduleMatchDay {
  export type Variables = {
    match_day_id: string;
    date_period: DatePeriod;
  };

  export type Mutation = {
    __typename?: "Mutation";

    rescheduleMatchDay: Maybe<boolean>;
  };
}

export namespace StartSeason {
  export type Variables = {
    id: string;
  };

  export type Mutation = {
    __typename?: "Mutation";

    startSeason: Maybe<boolean>;
  };
}

export namespace EndSeason {
  export type Variables = {
    season_id: string;
  };

  export type Mutation = {
    __typename?: "Mutation";

    endSeason: Maybe<boolean>;
  };
}

export namespace CreateTeam {
  export type Variables = {
    id: string;
    name: string;
  };

  export type Mutation = {
    __typename?: "Mutation";

    createTeam: Maybe<boolean>;
  };
}

export namespace UpdateTeamContact {
  export type Variables = {
    team_id: string;
    first_name: string;
    last_name: string;
    phone: string;
    email: string;
  };

  export type Mutation = {
    __typename?: "Mutation";

    updateTeamContact: Maybe<boolean>;
  };
}

export namespace RenameTeam {
  export type Variables = {
    team_id: string;
    new_name: string;
  };

  export type Mutation = {
    __typename?: "Mutation";

    renameTeam: Maybe<boolean>;
  };
}

export namespace DeleteTeam {
  export type Variables = {
    team_id: string;
  };

  export type Mutation = {
    __typename?: "Mutation";

    deleteTeam: Maybe<boolean>;
  };
}

export namespace CreateTournament {
  export type Variables = {
    id?: Maybe<string>;
    name: string;
  };

  export type Mutation = {
    __typename?: "Mutation";

    createTournament: Maybe<boolean>;
  };
}

export namespace CreateTournamentRound {
  export type Variables = {
    tournament_id: string;
    round: number;
    team_id_pairs: (Maybe<TeamIdPair>)[];
    date_period: DatePeriod;
  };

  export type Mutation = {
    __typename?: "Mutation";

    setTournamentRound: Maybe<boolean>;
  };
}

export namespace DeleteTournament {
  export type Variables = {
    tournament_id: string;
  };

  export type Mutation = {
    __typename?: "Mutation";

    deleteTournament: Maybe<boolean>;
  };
}

export namespace CreateUser {
  export type Variables = {
    id?: Maybe<string>;
    email: string;
    password: string;
    first_name: string;
    last_name: string;
    role: string;
    team_ids: (Maybe<string>)[];
  };

  export type Mutation = {
    __typename?: "Mutation";

    createUser: Maybe<boolean>;
  };
}

export namespace UpdateUser {
  export type Variables = {
    user_id: string;
    email?: Maybe<string>;
    first_name?: Maybe<string>;
    last_name?: Maybe<string>;
    role?: Maybe<string>;
    team_ids?: Maybe<(Maybe<string>)[]>;
  };

  export type Mutation = {
    __typename?: "Mutation";

    updateUser: Maybe<boolean>;
  };
}

export namespace DeleteUser {
  export type Variables = {
    user_id: string;
  };

  export type Mutation = {
    __typename?: "Mutation";

    deleteUser: Maybe<boolean>;
  };
}

export namespace Event {
  export type Variables = {
    id: string;
  };

  export type Query = {
    __typename?: "Query";

    event: Maybe<Event>;
  };

  export type Event = Event.Fragment;
}

export namespace LatestEvent {
  export type Variables = {
    start_date?: Maybe<Date>;
    end_date?: Maybe<Date>;
    type?: Maybe<string>;
  };

  export type Query = {
    __typename?: "Query";

    latestEvents: Maybe<(Maybe<LatestEvents>)[]>;
  };

  export type LatestEvents = Event.Fragment;
}

export namespace Match {
  export type Variables = {
    id: string;
  };

  export type Query = {
    __typename?: "Query";

    match: Maybe<Match>;
  };

  export type Match = Match.Fragment;
}

export namespace MatchPlan {
  export type Variables = {
    id: string;
  };

  export type Query = {
    __typename?: "Query";

    season: Maybe<Season>;
  };

  export type Season = Season.Fragment;
}

export namespace SeasonPenalties {
  export type Variables = {
    id: string;
  };

  export type Query = {
    __typename?: "Query";

    season: Maybe<Season>;
  };

  export type Season = {
    __typename?: "Season";

    id: string;

    teams: Maybe<(Maybe<Teams>)[]>;

    ranking: Maybe<Ranking>;
  };

  export type Teams = Team.Fragment;

  export type Ranking = {
    __typename?: "Ranking";

    penalties: Maybe<(Maybe<Penalties>)[]>;
  };

  export type Penalties = Penalty.Fragment;
}

export namespace Pitches {
  export type Variables = {};

  export type Query = {
    __typename?: "Query";

    allPitches: Maybe<(Maybe<AllPitches>)[]>;
  };

  export type AllPitches = Pitch.Fragment;
}

export namespace Ranking {
  export type Variables = {
    id: string;
  };

  export type Query = {
    __typename?: "Query";

    season: Maybe<Season>;
  };

  export type Season = Ranking.Fragment;
}

export namespace AllSeasonsList {
  export type Variables = {};

  export type Query = {
    __typename?: "Query";

    allSeasons: Maybe<(Maybe<AllSeasons>)[]>;
  };

  export type AllSeasons = AllSeasons.Fragment;
}

export namespace AllSeasonsCalendar {
  export type Variables = {};

  export type Query = {
    __typename?: "Query";

    allSeasons: Maybe<(Maybe<AllSeasons>)[]>;
  };

  export type AllSeasons = AllSeasonsCalendar.Fragment;
}

export namespace AllTeams {
  export type Variables = {};

  export type Query = {
    __typename?: "Query";

    allTeams: Maybe<(Maybe<AllTeams>)[]>;
  };

  export type AllTeams = Team.Fragment;
}

export namespace AllTournamentList {
  export type Variables = {};

  export type Query = {
    __typename?: "Query";

    allTournaments: Maybe<(Maybe<AllTournaments>)[]>;
  };

  export type AllTournaments = AllTournaments.Fragment;
}

export namespace Tournament {
  export type Variables = {
    id: string;
  };

  export type Query = {
    __typename?: "Query";

    tournament: Maybe<Tournament>;
  };

  export type Tournament = Tournament.Fragment;
}

export namespace User {
  export type Variables = {};

  export type Query = {
    __typename?: "Query";

    authenticatedUser: Maybe<AuthenticatedUser>;
  };

  export type AuthenticatedUser = User.Fragment;
}

export namespace AllUsers {
  export type Variables = {};

  export type Query = {
    __typename?: "Query";

    allUsers: Maybe<(Maybe<AllUsers>)[]>;
  };

  export type AllUsers = User.Fragment;
}

export namespace Match {
  export type Fragment = {
    __typename?: "Match";

    id: string;

    home_team: HomeTeam;

    home_score: Maybe<number>;

    guest_team: GuestTeam;

    guest_score: Maybe<number>;

    kickoff: Maybe<DateTime>;

    pitch: Maybe<Pitch>;

    cancelled_at: Maybe<string>;

    cancellation_reason: Maybe<string>;
  };

  export type HomeTeam = Team.Fragment;

  export type GuestTeam = Team.Fragment;

  export type Pitch = Pitch.Fragment;
}

export namespace MatchDay {
  export type Fragment = {
    __typename?: "MatchDay";

    id: string;

    number: number;

    start_date: string;

    end_date: string;

    matches: Maybe<(Maybe<Matches>)[]>;
  };

  export type Matches = Match.Fragment;
}

export namespace Pitch {
  export type Fragment = {
    __typename?: "Pitch";

    id: string;

    label: string;

    location_longitude: number;

    location_latitude: number;

    contact: Maybe<Contact>;
  };

  export type Contact = Contact.Fragment;
}

export namespace Team {
  export type Fragment = {
    __typename?: "Team";

    id: string;

    name: string;

    created_at: string;

    contact: Maybe<Contact>;
  };

  export type Contact = Contact.Fragment;
}

export namespace Contact {
  export type Fragment = {
    __typename?: "Contact";

    first_name: string;

    last_name: string;

    phone: string;

    email: string;
  };
}

export namespace Season {
  export type Fragment = {
    __typename?: "Season";

    id: string;

    name: string;

    teams: Maybe<(Maybe<Teams>)[]>;

    match_days: Maybe<(Maybe<MatchDays>)[]>;
  };

  export type Teams = Team.Fragment;

  export type MatchDays = MatchDay.Fragment;
}

export namespace AllSeasons {
  export type Fragment = {
    __typename?: "Season";

    id: string;

    name: string;

    state: SeasonState;
  };
}

export namespace AllSeasonsCalendar {
  export type Fragment = {
    __typename?: "Season";

    id: string;

    name: string;

    state: SeasonState;

    match_days: Maybe<(Maybe<MatchDays>)[]>;
  };

  export type MatchDays = MatchDay.Fragment;
}

export namespace AllTournaments {
  export type Fragment = {
    __typename?: "Tournament";

    id: string;

    name: string;
  };
}

export namespace Tournament {
  export type Fragment = {
    __typename?: "Tournament";

    id: string;

    name: string;

    rounds: Maybe<(Maybe<Rounds>)[]>;
  };

  export type Rounds = MatchDay.Fragment;
}

export namespace User {
  export type Fragment = {
    __typename?: "User";

    id: string;

    email: string;

    teams: Maybe<(Maybe<Teams>)[]>;

    role: UserRole;

    first_name: string;

    last_name: string;
  };

  export type Teams = Team.Fragment;
}

export namespace Event {
  export type Fragment = {
    __typename?: "Event";

    id: string;

    occurred_at: string;

    type: string;
  };
}

export namespace Ranking {
  export type Fragment = {
    __typename?: "Season";

    id: string;

    ranking: Maybe<Ranking>;
  };

  export type Ranking = {
    __typename?: "Ranking";

    updated_at: Maybe<string>;

    positions: Maybe<(Maybe<Positions>)[]>;

    penalties: Maybe<(Maybe<Penalties>)[]>;
  };

  export type Positions = {
    __typename?: "RankingPosition";

    team: Team;

    sort_index: number;

    number: number;

    matches: number;

    wins: number;

    draws: number;

    losses: number;

    scored_goals: number;

    conceded_goals: number;

    points: number;
  };

  export type Team = Team.Fragment;

  export type Penalties = Penalty.Fragment;
}

export namespace Penalty {
  export type Fragment = {
    __typename?: "RankingPenalty";

    id: string;

    team: Team;

    reason: string;

    created_at: string;

    points: number;
  };

  export type Team = Team.Fragment;
}

// ====================================================
// START: Apollo Angular template
// ====================================================

import { Injectable } from "@angular/core";
import * as Apollo from "apollo-angular";

import gql from "graphql-tag";

// ====================================================
// GraphQL Fragments
// ====================================================

export const ContactFragment = gql`
  fragment Contact on Contact {
    first_name
    last_name
    phone
    email
  }
`;

export const TeamFragment = gql`
  fragment Team on Team {
    id
    name
    created_at
    contact {
      ...Contact
    }
  }

  ${ContactFragment}
`;

export const PitchFragment = gql`
  fragment Pitch on Pitch {
    id
    label
    location_longitude
    location_latitude
    contact {
      ...Contact
    }
  }

  ${ContactFragment}
`;

export const MatchFragment = gql`
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

  ${TeamFragment}
  ${PitchFragment}
`;

export const MatchDayFragment = gql`
  fragment MatchDay on MatchDay {
    id
    number
    start_date
    end_date
    matches {
      ...Match
    }
  }

  ${MatchFragment}
`;

export const SeasonFragment = gql`
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

  ${TeamFragment}
  ${MatchDayFragment}
`;

export const AllSeasonsFragment = gql`
  fragment AllSeasons on Season {
    id
    name
    state
  }
`;

export const AllSeasonsCalendarFragment = gql`
  fragment AllSeasonsCalendar on Season {
    id
    name
    state
    match_days {
      ...MatchDay
    }
  }

  ${MatchDayFragment}
`;

export const AllTournamentsFragment = gql`
  fragment AllTournaments on Tournament {
    id
    name
  }
`;

export const TournamentFragment = gql`
  fragment Tournament on Tournament {
    id
    name
    rounds {
      ...MatchDay
    }
  }

  ${MatchDayFragment}
`;

export const UserFragment = gql`
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

  ${TeamFragment}
`;

export const EventFragment = gql`
  fragment Event on Event {
    id
    occurred_at
    type
  }
`;

export const PenaltyFragment = gql`
  fragment Penalty on RankingPenalty {
    id
    team {
      ...Team
    }
    reason
    created_at
    points
  }

  ${TeamFragment}
`;

export const RankingFragment = gql`
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

  ${TeamFragment}
  ${PenaltyFragment}
`;

// ====================================================
// Apollo Services
// ====================================================

@Injectable({
  providedIn: "root"
})
export class SubmitResultGQL extends Apollo.Mutation<
  SubmitResult.Mutation,
  SubmitResult.Variables
> {
  document: any = gql`
    mutation SubmitResult(
      $match_id: String!
      $home_score: Int!
      $guest_score: Int!
    ) {
      submitMatchResult(
        match_id: $match_id
        home_score: $home_score
        guest_score: $guest_score
      )
    }
  `;
}
@Injectable({
  providedIn: "root"
})
export class ScheduleMatchGQL extends Apollo.Mutation<
  ScheduleMatch.Mutation,
  ScheduleMatch.Variables
> {
  document: any = gql`
    mutation ScheduleMatch($match_id: String!, $kickoff: DateTime!) {
      scheduleMatch(match_id: $match_id, kickoff: $kickoff)
    }
  `;
}
@Injectable({
  providedIn: "root"
})
export class LocateMatchGQL extends Apollo.Mutation<
  LocateMatch.Mutation,
  LocateMatch.Variables
> {
  document: any = gql`
    mutation LocateMatch($match_id: String!, $pitch_id: String!) {
      locateMatch(match_id: $match_id, pitch_id: $pitch_id)
    }
  `;
}
@Injectable({
  providedIn: "root"
})
export class CancelMatchGQL extends Apollo.Mutation<
  CancelMatch.Mutation,
  CancelMatch.Variables
> {
  document: any = gql`
    mutation CancelMatch($match_id: String!, $reason: String!) {
      cancelMatch(match_id: $match_id, reason: $reason)
    }
  `;
}
@Injectable({
  providedIn: "root"
})
export class ScheduleAllMatchesForSeasonGQL extends Apollo.Mutation<
  ScheduleAllMatchesForSeason.Mutation,
  ScheduleAllMatchesForSeason.Variables
> {
  document: any = gql`
    mutation ScheduleAllMatchesForSeason(
      $season_id: String!
      $match_appointments: [MatchAppointment]!
    ) {
      scheduleAllMatchesForSeason(
        season_id: $season_id
        match_appointments: $match_appointments
      )
    }
  `;
}
@Injectable({
  providedIn: "root"
})
export class PasswordResetGQL extends Apollo.Mutation<
  PasswordReset.Mutation,
  PasswordReset.Variables
> {
  document: any = gql`
    mutation PasswordReset($email: String!, $target_path: String!) {
      sendPasswordResetMail(email: $email, target_path: $target_path)
    }
  `;
}
@Injectable({
  providedIn: "root"
})
export class PasswordChangeGQL extends Apollo.Mutation<
  PasswordChange.Mutation,
  PasswordChange.Variables
> {
  document: any = gql`
    mutation PasswordChange($new_password: String!) {
      changeUserPassword(new_password: $new_password)
    }
  `;
}
@Injectable({
  providedIn: "root"
})
export class AddRankingPenaltyGQL extends Apollo.Mutation<
  AddRankingPenalty.Mutation,
  AddRankingPenalty.Variables
> {
  document: any = gql`
    mutation AddRankingPenalty(
      $id: String!
      $season_id: String!
      $team_id: String!
      $reason: String!
      $points: Int!
    ) {
      addRankingPenalty(
        id: $id
        season_id: $season_id
        team_id: $team_id
        reason: $reason
        points: $points
      )
    }
  `;
}
@Injectable({
  providedIn: "root"
})
export class RemoveRankingPenaltyGQL extends Apollo.Mutation<
  RemoveRankingPenalty.Mutation,
  RemoveRankingPenalty.Variables
> {
  document: any = gql`
    mutation RemoveRankingPenalty(
      $ranking_penalty_id: String!
      $season_id: String!
    ) {
      removeRankingPenalty(
        ranking_penalty_id: $ranking_penalty_id
        season_id: $season_id
      )
    }
  `;
}
@Injectable({
  providedIn: "root"
})
export class DeletePitchGQL extends Apollo.Mutation<
  DeletePitch.Mutation,
  DeletePitch.Variables
> {
  document: any = gql`
    mutation DeletePitch($pitch_id: String!) {
      deletePitch(pitch_id: $pitch_id)
    }
  `;
}
@Injectable({
  providedIn: "root"
})
export class UpdatePitchContactGQL extends Apollo.Mutation<
  UpdatePitchContact.Mutation,
  UpdatePitchContact.Variables
> {
  document: any = gql`
    mutation UpdatePitchContact(
      $pitch_id: String!
      $first_name: String!
      $last_name: String!
      $phone: String!
      $email: String!
    ) {
      updatePitchContact(
        pitch_id: $pitch_id
        first_name: $first_name
        last_name: $last_name
        phone: $phone
        email: $email
      )
    }
  `;
}
@Injectable({
  providedIn: "root"
})
export class CreatePitchGQL extends Apollo.Mutation<
  CreatePitch.Mutation,
  CreatePitch.Variables
> {
  document: any = gql`
    mutation CreatePitch(
      $id: String!
      $label: String!
      $longitude: Float!
      $latitude: Float!
    ) {
      createPitch(
        id: $id
        label: $label
        longitude: $longitude
        latitude: $latitude
      )
    }
  `;
}
@Injectable({
  providedIn: "root"
})
export class CreateSeasonGQL extends Apollo.Mutation<
  CreateSeason.Mutation,
  CreateSeason.Variables
> {
  document: any = gql`
    mutation CreateSeason($id: String, $name: String!) {
      createSeason(id: $id, name: $name)
    }
  `;
}
@Injectable({
  providedIn: "root"
})
export class AddTeamToSeasonGQL extends Apollo.Mutation<
  AddTeamToSeason.Mutation,
  AddTeamToSeason.Variables
> {
  document: any = gql`
    mutation AddTeamToSeason($season_id: String!, $team_id: String!) {
      addTeamToSeason(season_id: $season_id, team_id: $team_id)
    }
  `;
}
@Injectable({
  providedIn: "root"
})
export class RemoveTeamFromSeasonGQL extends Apollo.Mutation<
  RemoveTeamFromSeason.Mutation,
  RemoveTeamFromSeason.Variables
> {
  document: any = gql`
    mutation RemoveTeamFromSeason($season_id: String!, $team_id: String!) {
      removeTeamFromSeason(season_id: $season_id, team_id: $team_id)
    }
  `;
}
@Injectable({
  providedIn: "root"
})
export class CreateMatchesForSeasonGQL extends Apollo.Mutation<
  CreateMatchesForSeason.Mutation,
  CreateMatchesForSeason.Variables
> {
  document: any = gql`
    mutation CreateMatchesForSeason(
      $season_id: String!
      $dates: [DatePeriod]!
    ) {
      createMatchesForSeason(season_id: $season_id, dates: $dates)
    }
  `;
}
@Injectable({
  providedIn: "root"
})
export class RescheduleMatchDayGQL extends Apollo.Mutation<
  RescheduleMatchDay.Mutation,
  RescheduleMatchDay.Variables
> {
  document: any = gql`
    mutation RescheduleMatchDay(
      $match_day_id: String!
      $date_period: DatePeriod!
    ) {
      rescheduleMatchDay(match_day_id: $match_day_id, date_period: $date_period)
    }
  `;
}
@Injectable({
  providedIn: "root"
})
export class StartSeasonGQL extends Apollo.Mutation<
  StartSeason.Mutation,
  StartSeason.Variables
> {
  document: any = gql`
    mutation StartSeason($id: String!) {
      startSeason(season_id: $id)
    }
  `;
}
@Injectable({
  providedIn: "root"
})
export class EndSeasonGQL extends Apollo.Mutation<
  EndSeason.Mutation,
  EndSeason.Variables
> {
  document: any = gql`
    mutation EndSeason($season_id: String!) {
      endSeason(season_id: $season_id)
    }
  `;
}
@Injectable({
  providedIn: "root"
})
export class CreateTeamGQL extends Apollo.Mutation<
  CreateTeam.Mutation,
  CreateTeam.Variables
> {
  document: any = gql`
    mutation CreateTeam($id: String!, $name: String!) {
      createTeam(id: $id, name: $name)
    }
  `;
}
@Injectable({
  providedIn: "root"
})
export class UpdateTeamContactGQL extends Apollo.Mutation<
  UpdateTeamContact.Mutation,
  UpdateTeamContact.Variables
> {
  document: any = gql`
    mutation UpdateTeamContact(
      $team_id: String!
      $first_name: String!
      $last_name: String!
      $phone: String!
      $email: String!
    ) {
      updateTeamContact(
        team_id: $team_id
        first_name: $first_name
        last_name: $last_name
        phone: $phone
        email: $email
      )
    }
  `;
}
@Injectable({
  providedIn: "root"
})
export class RenameTeamGQL extends Apollo.Mutation<
  RenameTeam.Mutation,
  RenameTeam.Variables
> {
  document: any = gql`
    mutation RenameTeam($team_id: String!, $new_name: String!) {
      renameTeam(team_id: $team_id, new_name: $new_name)
    }
  `;
}
@Injectable({
  providedIn: "root"
})
export class DeleteTeamGQL extends Apollo.Mutation<
  DeleteTeam.Mutation,
  DeleteTeam.Variables
> {
  document: any = gql`
    mutation DeleteTeam($team_id: String!) {
      deleteTeam(team_id: $team_id)
    }
  `;
}
@Injectable({
  providedIn: "root"
})
export class CreateTournamentGQL extends Apollo.Mutation<
  CreateTournament.Mutation,
  CreateTournament.Variables
> {
  document: any = gql`
    mutation CreateTournament($id: String, $name: String!) {
      createTournament(id: $id, name: $name)
    }
  `;
}
@Injectable({
  providedIn: "root"
})
export class CreateTournamentRoundGQL extends Apollo.Mutation<
  CreateTournamentRound.Mutation,
  CreateTournamentRound.Variables
> {
  document: any = gql`
    mutation CreateTournamentRound(
      $tournament_id: String!
      $round: Int!
      $team_id_pairs: [TeamIdPair]!
      $date_period: DatePeriod!
    ) {
      setTournamentRound(
        tournament_id: $tournament_id
        round: $round
        team_id_pairs: $team_id_pairs
        date_period: $date_period
      )
    }
  `;
}
@Injectable({
  providedIn: "root"
})
export class DeleteTournamentGQL extends Apollo.Mutation<
  DeleteTournament.Mutation,
  DeleteTournament.Variables
> {
  document: any = gql`
    mutation DeleteTournament($tournament_id: String!) {
      deleteTournament(tournament_id: $tournament_id)
    }
  `;
}
@Injectable({
  providedIn: "root"
})
export class CreateUserGQL extends Apollo.Mutation<
  CreateUser.Mutation,
  CreateUser.Variables
> {
  document: any = gql`
    mutation CreateUser(
      $id: String
      $email: String!
      $password: String!
      $first_name: String!
      $last_name: String!
      $role: String!
      $team_ids: [String]!
    ) {
      createUser(
        id: $id
        email: $email
        password: $password
        first_name: $first_name
        last_name: $last_name
        role: $role
        team_ids: $team_ids
      )
    }
  `;
}
@Injectable({
  providedIn: "root"
})
export class UpdateUserGQL extends Apollo.Mutation<
  UpdateUser.Mutation,
  UpdateUser.Variables
> {
  document: any = gql`
    mutation UpdateUser(
      $user_id: String!
      $email: String
      $first_name: String
      $last_name: String
      $role: String
      $team_ids: [String]
    ) {
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
}
@Injectable({
  providedIn: "root"
})
export class DeleteUserGQL extends Apollo.Mutation<
  DeleteUser.Mutation,
  DeleteUser.Variables
> {
  document: any = gql`
    mutation DeleteUser($user_id: String!) {
      deleteUser(user_id: $user_id)
    }
  `;
}
@Injectable({
  providedIn: "root"
})
export class EventGQL extends Apollo.Query<Event.Query, Event.Variables> {
  document: any = gql`
    query Event($id: String!) {
      event(id: $id) {
        ...Event
      }
    }

    ${EventFragment}
  `;
}
@Injectable({
  providedIn: "root"
})
export class LatestEventGQL extends Apollo.Query<
  LatestEvent.Query,
  LatestEvent.Variables
> {
  document: any = gql`
    query LatestEvent($start_date: Date, $end_date: Date, $type: String) {
      latestEvents(start_date: $start_date, end_date: $end_date, type: $type) {
        ...Event
      }
    }

    ${EventFragment}
  `;
}
@Injectable({
  providedIn: "root"
})
export class MatchGQL extends Apollo.Query<Match.Query, Match.Variables> {
  document: any = gql`
    query Match($id: String!) {
      match(id: $id) {
        ...Match
      }
    }

    ${MatchFragment}
  `;
}
@Injectable({
  providedIn: "root"
})
export class MatchPlanGQL extends Apollo.Query<
  MatchPlan.Query,
  MatchPlan.Variables
> {
  document: any = gql`
    query MatchPlan($id: String!) {
      season(id: $id) {
        ...Season
      }
    }

    ${SeasonFragment}
  `;
}
@Injectable({
  providedIn: "root"
})
export class SeasonPenaltiesGQL extends Apollo.Query<
  SeasonPenalties.Query,
  SeasonPenalties.Variables
> {
  document: any = gql`
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

    ${TeamFragment}
    ${PenaltyFragment}
  `;
}
@Injectable({
  providedIn: "root"
})
export class PitchesGQL extends Apollo.Query<Pitches.Query, Pitches.Variables> {
  document: any = gql`
    query Pitches {
      allPitches {
        ...Pitch
      }
    }

    ${PitchFragment}
  `;
}
@Injectable({
  providedIn: "root"
})
export class RankingGQL extends Apollo.Query<Ranking.Query, Ranking.Variables> {
  document: any = gql`
    query Ranking($id: String!) {
      season(id: $id) {
        ...Ranking
      }
    }

    ${RankingFragment}
  `;
}
@Injectable({
  providedIn: "root"
})
export class AllSeasonsListGQL extends Apollo.Query<
  AllSeasonsList.Query,
  AllSeasonsList.Variables
> {
  document: any = gql`
    query AllSeasonsList {
      allSeasons {
        ...AllSeasons
      }
    }

    ${AllSeasonsFragment}
  `;
}
@Injectable({
  providedIn: "root"
})
export class AllSeasonsCalendarGQL extends Apollo.Query<
  AllSeasonsCalendar.Query,
  AllSeasonsCalendar.Variables
> {
  document: any = gql`
    query AllSeasonsCalendar {
      allSeasons {
        ...AllSeasonsCalendar
      }
    }

    ${AllSeasonsCalendarFragment}
  `;
}
@Injectable({
  providedIn: "root"
})
export class AllTeamsGQL extends Apollo.Query<
  AllTeams.Query,
  AllTeams.Variables
> {
  document: any = gql`
    query AllTeams {
      allTeams {
        ...Team
      }
    }

    ${TeamFragment}
  `;
}
@Injectable({
  providedIn: "root"
})
export class AllTournamentListGQL extends Apollo.Query<
  AllTournamentList.Query,
  AllTournamentList.Variables
> {
  document: any = gql`
    query AllTournamentList {
      allTournaments {
        ...AllTournaments
      }
    }

    ${AllTournamentsFragment}
  `;
}
@Injectable({
  providedIn: "root"
})
export class TournamentGQL extends Apollo.Query<
  Tournament.Query,
  Tournament.Variables
> {
  document: any = gql`
    query Tournament($id: String!) {
      tournament(id: $id) {
        ...Tournament
      }
    }

    ${TournamentFragment}
  `;
}
@Injectable({
  providedIn: "root"
})
export class UserGQL extends Apollo.Query<User.Query, User.Variables> {
  document: any = gql`
    query User {
      authenticatedUser {
        ...User
      }
    }

    ${UserFragment}
  `;
}
@Injectable({
  providedIn: "root"
})
export class AllUsersGQL extends Apollo.Query<
  AllUsers.Query,
  AllUsers.Variables
> {
  document: any = gql`
    query AllUsers {
      allUsers {
        ...User
      }
    }

    ${UserFragment}
  `;
}

// ====================================================
// END: Apollo Angular template
// ====================================================
