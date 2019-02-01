export type Maybe<T> = T | null;

// ====================================================
// Documents
// ====================================================

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

  export type Matches = {
    __typename?: "Match";

    id: Maybe<string>;

    home_team: Maybe<HomeTeam>;

    guest_team: Maybe<GuestTeam>;

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

// ====================================================
// START: Apollo Angular template
// ====================================================

import { Injectable } from "@angular/core";
import * as Apollo from "apollo-angular";

import gql from "graphql-tag";

// ====================================================
// Apollo Services
// ====================================================

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
            id
            home_team {
              id
              name
            }
            guest_team {
              id
              name
            }
            kickoff
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
