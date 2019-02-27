/* tslint:disable */
export type Maybe<T> = T | null;

export type DatePeriod = any;

export type TeamIdPair = any;

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

export namespace Teams {
  export type Variables = {
    name: string;
  };

  export type Mutation = {
    __typename?: "Mutation";

    createTeam: Maybe<boolean>;
  };
}

export namespace MatchPlan {
  export type Variables = {
    id?: Maybe<string>;
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

  export type MatchDays = {
    __typename?: "MatchDay";

    id: Maybe<string>;

    number: Maybe<number>;

    matches: Maybe<(Maybe<Matches>)[]>;
  };

  export type Matches = Match.Fragment;
}

export namespace Ranking {
  export type Variables = {
    id?: Maybe<string>;
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

export namespace Season {
  export type Variables = {
    id?: Maybe<string>;
  };

  export type Query = {
    __typename?: "Query";

    season: Maybe<Season>;
  };

  export type Season = {
    __typename?: "Season";

    id: Maybe<string>;

    name: Maybe<string>;

    state: Maybe<string>;

    teams: Maybe<(Maybe<Teams>)[]>;

    match_days: Maybe<(Maybe<MatchDays>)[]>;

    ranking: Maybe<Ranking>;
  };

  export type Teams = {
    __typename?: "Team";

    id: Maybe<string>;

    name: Maybe<string>;
  };

  export type MatchDays = {
    __typename?: "MatchDay";

    id: Maybe<string>;

    number: Maybe<number>;

    matches: Maybe<(Maybe<Matches>)[]>;
  };

  export type Matches = Match.Fragment;

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

  export type AllSeasons = {
    __typename?: "Season";

    id: Maybe<string>;

    name: Maybe<string>;

    state: Maybe<string>;
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
  };

  export type HomeTeam = {
    __typename?: "Team";

    id: Maybe<string>;

    name: Maybe<string>;
  };

  export type GuestTeam = {
    __typename?: "Team";

    id: Maybe<string>;

    name: Maybe<string>;
  };
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

export const MatchFragment = gql`
  fragment Match on Match {
    id
    home_team {
      id
      name
    }
    home_score
    guest_team {
      id
      name
    }
    guest_score
    kickoff
  }
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
export class MatchPlanGQL extends Apollo.Query<
  MatchPlan.Query,
  MatchPlan.Variables
> {
  document: any = gql`
    query MatchPlan($id: String) {
      season(id: $id) {
        teams {
          id
          name
        }
        match_days {
          id
          number
          matches {
            ...Match
          }
        }
      }
    }

    ${MatchFragment}
  `;
}
@Injectable({
  providedIn: "root"
})
export class RankingGQL extends Apollo.Query<Ranking.Query, Ranking.Variables> {
  document: any = gql`
    query Ranking($id: String) {
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
export class SeasonGQL extends Apollo.Query<Season.Query, Season.Variables> {
  document: any = gql`
    query Season($id: String) {
      season(id: $id) {
        id
        name
        state
        teams {
          id
          name
        }
        match_days {
          id
          number
          matches {
            ...Match
          }
        }
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

    ${MatchFragment}
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
        id
        name
        state
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
