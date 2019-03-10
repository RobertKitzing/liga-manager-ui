/* tslint:disable */
export type Maybe<T> = T | null;

export interface DatePeriod {
  from?: Maybe<Date>;

  to?: Maybe<Date>;
}

export interface TeamIdPair {
  home_team_id?: Maybe<string>;

  guest_team_id?: Maybe<string>;
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

export type Date = any;

// ====================================================
// Documents
// ====================================================

export namespace Matches {
  export type Variables = {
    season_id: string;
    dates: (Maybe<DatePeriod>)[];
  };

  export type Mutation = {
    __typename?: "Mutation";

    createMatchesForSeason: Maybe<boolean>;
  };
}

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
    kickoff: string;
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

export namespace Teams {
  export type Variables = {
    name: string;
  };

  export type Mutation = {
    __typename?: "Mutation";

    createTeam: Maybe<boolean>;
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

export namespace MatchPlan {
  export type Variables = {
    id: string;
  };

  export type Query = {
    __typename?: "Query";

    season: Maybe<Season>;
  };

  export type Season = {
    __typename?: "Season";

    teams: Maybe<(Maybe<Teams>)[]>;

    match_days: Maybe<(Maybe<MatchDays>)[]>;
  };

  export type Teams = {
    __typename?: "Team";

    id: Maybe<string>;

    name: Maybe<string>;
  };

  export type MatchDays = MatchDay.Fragment;
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

  export type Season = {
    __typename?: "Season";

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

    team: Maybe<Team>;

    sort_index: Maybe<number>;

    number: Maybe<number>;

    matches: Maybe<number>;

    wins: Maybe<number>;

    draws: Maybe<number>;

    losses: Maybe<number>;

    scored_goals: Maybe<number>;

    conceded_goals: Maybe<number>;

    points: Maybe<number>;
  };

  export type Team = {
    __typename?: "Team";

    id: Maybe<string>;

    name: Maybe<string>;
  };

  export type Penalties = {
    __typename?: "RankingPenalty";

    team: Maybe<_Team>;

    reason: Maybe<string>;

    created_at: Maybe<string>;

    points: Maybe<number>;
  };

  export type _Team = {
    __typename?: "Team";

    id: Maybe<string>;

    name: Maybe<string>;
  };
}

export namespace AllSeasonsList {
  export type Variables = {};

  export type Query = {
    __typename?: "Query";

    allSeasons: Maybe<(Maybe<AllSeasons>)[]>;
  };

  export type AllSeasons = Season.Fragment;
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

  export type AllTournaments = {
    __typename?: "Tournament";

    id: Maybe<string>;

    name: Maybe<string>;
  };
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

  export type AuthenticatedUser = {
    __typename?: "User";

    email: Maybe<string>;

    teams: Maybe<(Maybe<Teams>)[]>;

    first_name: Maybe<string>;

    last_name: Maybe<string>;

    role: Maybe<UserRole>;
  };

  export type Teams = {
    __typename?: "Team";

    id: Maybe<string>;

    name: Maybe<string>;
  };
}

export namespace Match {
  export type Fragment = {
    __typename?: "Match";

    id: Maybe<string>;

    home_team: Maybe<HomeTeam>;

    home_score: Maybe<number>;

    guest_team: Maybe<GuestTeam>;

    guest_score: Maybe<number>;

    kickoff: Maybe<string>;

    pitch: Maybe<Pitch>;
  };

  export type HomeTeam = Team.Fragment;

  export type GuestTeam = Team.Fragment;

  export type Pitch = Pitch.Fragment;
}

export namespace MatchDay {
  export type Fragment = {
    __typename?: "MatchDay";

    id: Maybe<string>;

    number: Maybe<number>;

    start_date: Maybe<string>;

    end_date: Maybe<string>;

    matches: Maybe<(Maybe<Matches>)[]>;
  };

  export type Matches = Match.Fragment;
}

export namespace Pitch {
  export type Fragment = {
    __typename?: "Pitch";

    id: Maybe<string>;

    label: Maybe<string>;

    location_longitude: Maybe<number>;

    location_latitude: Maybe<number>;

    contact: Maybe<Contact>;
  };

  export type Contact = Contact.Fragment;
}

export namespace Team {
  export type Fragment = {
    __typename?: "Team";

    id: Maybe<string>;

    name: Maybe<string>;

    created_at: Maybe<string>;

    contact: Maybe<Contact>;
  };

  export type Contact = Contact.Fragment;
}

export namespace Contact {
  export type Fragment = {
    __typename?: "Contact";

    first_name: Maybe<string>;

    last_name: Maybe<string>;

    phone: Maybe<string>;

    email: Maybe<string>;
  };
}

export namespace Season {
  export type Fragment = {
    __typename?: "Season";

    id: Maybe<string>;

    name: Maybe<string>;

    state: Maybe<SeasonState>;
  };
}

export namespace Tournament {
  export type Fragment = {
    __typename?: "Tournament";

    id: Maybe<string>;

    name: Maybe<string>;

    rounds: Maybe<(Maybe<Rounds>)[]>;
  };

  export type Rounds = MatchDay.Fragment;
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

export const SeasonFragment = gql`
  fragment Season on Season {
    id
    name
    state
  }
`;

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

// ====================================================
// Apollo Services
// ====================================================

@Injectable({
  providedIn: "root"
})
export class MatchesGQL extends Apollo.Mutation<
  Matches.Mutation,
  Matches.Variables
> {
  document: any = gql`
    mutation Matches($season_id: String!, $dates: [DatePeriod]!) {
      createMatchesForSeason(season_id: $season_id, dates: $dates)
    }
  `;
}
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
    mutation ScheduleMatch($match_id: String!, $kickoff: String!) {
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
export class TeamsGQL extends Apollo.Mutation<Teams.Mutation, Teams.Variables> {
  document: any = gql`
    mutation Teams($name: String!) {
      createTeam(name: $name)
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
export class MatchPlanGQL extends Apollo.Query<
  MatchPlan.Query,
  MatchPlan.Variables
> {
  document: any = gql`
    query MatchPlan($id: String!) {
      season(id: $id) {
        teams {
          id
          name
        }
        match_days {
          ...MatchDay
        }
      }
    }

    ${MatchDayFragment}
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
        ranking {
          updated_at
          positions {
            team {
              id
              name
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
            team {
              id
              name
            }
            reason
            created_at
            points
          }
        }
      }
    }
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
        ...Season
      }
    }

    ${SeasonFragment}
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
        id
        name
      }
    }
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
        email
        teams {
          id
          name
        }
        first_name
        last_name
        role
      }
    }
  `;
}

// ====================================================
// END: Apollo Angular template
// ====================================================

export interface IntrospectionResultData {
  __schema: {
    types: {
      kind: string;
      name: string;
      possibleTypes: {
        name: string;
      }[];
    }[];
  };
}

const result: IntrospectionResultData = {
  __schema: {
    types: []
  }
};

export default result;
