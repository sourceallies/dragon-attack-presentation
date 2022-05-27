import { useState } from 'react'
import logo from './logo.svg'
import './App.css'
import {ApolloClient, ApolloProvider, InMemoryCache} from '@apollo/client';
import { useDecrementCounterMutation } from './generated/graphql';
import { WebSocketLink } from '@apollo/client/link/ws';
import { SubscriptionClient } from 'subscriptions-transport-ws';

const websocketClient = new SubscriptionClient("ws://localhost:5000/graphql", {
  reconnect: true
});

const apolloClient = new ApolloClient({
  cache: new InMemoryCache(),
  link: new WebSocketLink(websocketClient)
});

function DecrementButton() {
  const [decrementCounter, {data}] = useDecrementCounterMutation();
  return (
    <button onClick={() => decrementCounter()}>
      Decrement: {data?.decrement}
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
