/* tslint:disable */
export type Maybe<T> = T | null;

// ====================================================
// Documents
// ====================================================

export namespace RedisEvent {
  export type Variables = {};

  export type Subscription = {
    __typename?: "Subscription";

    redisevent: Maybe<string>;
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
export class RedisEventGQL extends Apollo.Subscription<
  RedisEvent.Subscription,
  RedisEvent.Variables
> {
  document: any = gql`
    subscription RedisEvent {
      redisevent
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
