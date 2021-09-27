import React from 'react';
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import { AppNavigation } from './navigation';
import { AppLayout } from './layout/AppLayout';

const client = new ApolloClient({
  uri: '/graphql',
  cache: new InMemoryCache(),
});

function App(): JSX.Element {
  return (
    <ApolloProvider client={client}>
      <AppLayout>
        <AppNavigation />
      </AppLayout>
    </ApolloProvider>
  );
}

export default App;
