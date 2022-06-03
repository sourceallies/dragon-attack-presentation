import { useState } from 'react'
import logo from './logo.svg'
import './App.css'
import {ApolloClient, ApolloProvider, InMemoryCache} from '@apollo/client';
import { useAttackMutation, useWatchCharacterSubscription } from './generated/graphql';
import { WebSocketLink } from '@apollo/client/link/ws';
import { SubscriptionClient } from 'subscriptions-transport-ws';

const websocketClient = new SubscriptionClient("ws://localhost:5000/graphql", {
  reconnect: true
});

const apolloClient = new ApolloClient({
  cache: new InMemoryCache(),
  link: new WebSocketLink(websocketClient)
});

interface AttackButtonProps {
  targetId: string;
}

function AttackButton({targetId}: AttackButtonProps) {
  const [executeAttack] = useAttackMutation({
    variables: {
      targetId
    }
  });
  const {data} = useWatchCharacterSubscription({
    variables: {
      id: targetId
    }
  });

  return (
    <button onClick={() => executeAttack()}>
      Attack: {data?.watchCharacter?.resultingHealth}
    </button>
  )
}

function App() {
  return (
    <div className="App">
      <ApolloProvider client={apolloClient}>
        <AttackButton targetId='00000000-0000-0000-0000-000000000000' />

        <AttackButton targetId='00000000-0000-0000-0000-000000000001' />

        <AttackButton targetId='00000000-0000-0000-0000-000000000002' />
      </ApolloProvider>
    </div>
  )
}

export default App
