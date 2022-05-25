import { useState } from 'react'
import logo from './logo.svg'
import './App.css'
import {ApolloClient, ApolloProvider, InMemoryCache} from '@apollo/client';
import { useDecrementCounterMutation } from './generated/graphql';

const apolloClient = new ApolloClient({
  cache: new InMemoryCache(),
  uri: 'http://localhost:5000/graphql'
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
