import './app.scss';

import { ApolloProvider } from '@apollo/client';
import { BrowserRouter } from 'react-router-dom';

import client from '@config/apollo';
import AuthProvider from '@components/providers/AuthProvider';
import Pages from './pages';

export function App() {
  return (
    <ApolloProvider client={client}>
      <AuthProvider>
        <BrowserRouter>
          <Pages />
        </BrowserRouter>
      </AuthProvider>
    </ApolloProvider>
  );
}

export default App;
