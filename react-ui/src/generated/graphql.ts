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

export type Mutation = {
  __typename?: 'Mutation';
  decrement: Scalars['Int'];
};

export type Query = {
  __typename?: 'Query';
  counter: Scalars['Int'];
};

export type DecrementCounterMutationVariables = Exact<{ [key: string]: never; }>;


export type DecrementCounterMutation = { __typename?: 'Mutation', decrement: number };


export const DecrementCounterDocument = gql`
    mutation DecrementCounter {
  decrement
}
    `;
export type DecrementCounterMutationFn = Apollo.MutationFunction<DecrementCounterMutation, DecrementCounterMutationVariables>;

/**
 * __useDecrementCounterMutation__
 *
 * To run a mutation, you first call `useDecrementCounterMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDecrementCounterMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [decrementCounterMutation, { data, loading, error }] = useDecrementCounterMutation({
 *   variables: {
 *   },
 * });
 */
export function useDecrementCounterMutation(baseOptions?: Apollo.MutationHookOptions<DecrementCounterMutation, DecrementCounterMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DecrementCounterMutation, DecrementCounterMutationVariables>(DecrementCounterDocument, options);
      }
export type DecrementCounterMutationHookResult = ReturnType<typeof useDecrementCounterMutation>;
export type DecrementCounterMutationResult = Apollo.MutationResult<DecrementCounterMutation>;
export type DecrementCounterMutationOptions = Apollo.BaseMutationOptions<DecrementCounterMutation, DecrementCounterMutationVariables>;

export const DecrementCounter = gql`
    mutation DecrementCounter {
  decrement
}
    `;