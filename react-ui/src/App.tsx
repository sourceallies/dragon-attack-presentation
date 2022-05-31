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

function AttackButton() {
  const [doAttack] = useAttackMutation();
  const {data} = useWatchCharacterSubscription();

  return (
    <button onClick={() => doAttack()}>
      Attack {data?.watchCharacter?.newHealth}hp
    </button>
  )
}

function App() {
  return (
    <div className="App">
      <ApolloProvider client={apolloClient}>
        <AttackButton />
      </ApolloProvider>
    </div>
  )
}

export default App
