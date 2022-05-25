import { useState } from 'react'
import logo from './logo.svg'
import {ApolloClient, ApolloProvider, InMemoryCache, useMutation} from '@apollo/client';
import './App.css'
import { useDecrementCounterMutation } from './generated/graphql';

const apolloClient = new ApolloClient({
  cache: new InMemoryCache(),
  uri: 'http://localhost:5000/graphql'
});

function DecrementButton() {
  const [executeDecrement, {data}] = useDecrementCounterMutation()
  return (
    <button onClick={() => executeDecrement()}>
      Decrement {data?.decrement}
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
