import { useState } from 'react'
import logo from './logo.svg'
import './App.css'
import {ApolloClient, ApolloProvider, InMemoryCache} from '@apollo/client';
import { useDecrementCounterMutation, useWatchCounterSubscription } from './generated/graphql';
import { SubscriptionClient } from 'subscriptions-transport-ws'
import { WebSocketLink } from '@apollo/client/link/ws';

const subscriptionClient = new SubscriptionClient('ws://localhost:5000/graphql', {
  reconnect: true
});
const apolloClient = new ApolloClient({
  cache: new InMemoryCache(),
  link: new WebSocketLink(subscriptionClient)
});

function DecrementButton() {
  const {data} = useWatchCounterSubscription();
  const [decrementCounter] = useDecrementCounterMutation();
  return (
    <button onClick={() => decrementCounter()}>
      Decrement: {data?.watchCounter?.newValue}
    </button>
  )
}

function App() {
  return (
    <div className="App">
      <ApolloProvider client={apolloClient}>
        <DecrementButton />
      </ApolloProvider>
    </div>
  )
}

export default App
