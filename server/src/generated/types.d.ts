/* tslint:disable */
export type Maybe<T> = T | null;

export type DateTime = any;

// ====================================================
// Scalars
// ====================================================

// ====================================================
// Types
// ====================================================

export interface Query {
  hello?: Maybe<string>;
}

export interface Subscription {
  redisevent?: Maybe<RedisEvent>;
}

export interface RedisEvent {
  id: string;

  occurredAt: DateTime;

  payload?: Maybe<string>;

  type?: Maybe<string>;
}

// ====================================================
// Arguments
// ====================================================
