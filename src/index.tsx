import React from 'react';
import ReactDOM from 'react-dom';
import { App } from './page/index';
import reportWebVitals from './reportWebVitals';
import { theme } from './style/Theme';
import { ThemeProvider } from 'styled-components';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';

import 'rsuite/dist/styles/rsuite-default.css';
const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql',
  cache: new InMemoryCache(),
});

ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
