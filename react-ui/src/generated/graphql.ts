import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
import gql from 'graphql-tag';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type GameCharacter = {
  __typename?: 'GameCharacter';
  currentHealth: Scalars['Int'];
};

export type HealthChangedEvent = {
  __typename?: 'HealthChangedEvent';
  resultingHealth: Scalars['Int'];
};

export type Mutation = {
  __typename?: 'Mutation';
  attack: Scalars['Int'];
};


export type MutationAttackArgs = {
  targetId: Scalars['ID'];
};

export type Query = {
  __typename?: 'Query';
  gameCharacter: GameCharacter;
};


export type QueryGameCharacterArgs = {
  id: Scalars['ID'];
};

export type Subscription = {
  __typename?: 'Subscription';
  watchCharacter: HealthChangedEvent;
};


export type SubscriptionWatchCharacterArgs = {
  id: Scalars['ID'];
};

export type AttackMutationVariables = Exact<{
  targetId: Scalars['ID'];
}>;


export type AttackMutation = { __typename?: 'Mutation', attack: number };

export type WatchCharacterSubscriptionVariables = Exact<{
  id: Scalars['ID'];
}>;


export type WatchCharacterSubscription = { __typename?: 'Subscription', watchCharacter: { __typename?: 'HealthChangedEvent', resultingHealth: number } };


export const AttackDocument = gql`
    mutation Attack($targetId: ID!) {
  attack(targetId: $targetId)
}
    `;
export type AttackMutationFn = Apollo.MutationFunction<AttackMutation, AttackMutationVariables>;

/**
 * __useAttackMutation__
 *
 * To run a mutation, you first call `useAttackMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAttackMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [attackMutation, { data, loading, error }] = useAttackMutation({
 *   variables: {
 *      targetId: // value for 'targetId'
 *   },
 * });
 */
export function useAttackMutation(baseOptions?: Apollo.MutationHookOptions<AttackMutation, AttackMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AttackMutation, AttackMutationVariables>(AttackDocument, options);
      }
export type AttackMutationHookResult = ReturnType<typeof useAttackMutation>;
export type AttackMutationResult = Apollo.MutationResult<AttackMutation>;
export type AttackMutationOptions = Apollo.BaseMutationOptions<AttackMutation, AttackMutationVariables>;
export const WatchCharacterDocument = gql`
    subscription WatchCharacter($id: ID!) {
  watchCharacter(id: $id) {
    resultingHealth
  }
}
    `;

/**
 * __useWatchCharacterSubscription__
 *
 * To run a query within a React component, call `useWatchCharacterSubscription` and pass it any options that fit your needs.
 * When your component renders, `useWatchCharacterSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useWatchCharacterSubscription({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useWatchCharacterSubscription(baseOptions: Apollo.SubscriptionHookOptions<WatchCharacterSubscription, WatchCharacterSubscriptionVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useSubscription<WatchCharacterSubscription, WatchCharacterSubscriptionVariables>(WatchCharacterDocument, options);
      }
export type WatchCharacterSubscriptionHookResult = ReturnType<typeof useWatchCharacterSubscription>;
export type WatchCharacterSubscriptionResult = Apollo.SubscriptionResult<WatchCharacterSubscription>;

export const Attack = gql`
    mutation Attack($targetId: ID!) {
  attack(targetId: $targetId)
}
    `;
export const WatchCharacter = gql`
    subscription WatchCharacter($id: ID!) {
  watchCharacter(id: $id) {
    resultingHealth
  }
}
    `;