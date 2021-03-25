import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Navbar } from '../components/Navbar';
import { Auth } from './Auth';
import { Register } from './Register';
import { NotFound } from './NotFound';
import { GlobalStyle } from '../style/GlobalStyle';

export function App() {
  return (
    <React.Fragment>
      <BrowserRouter>
        <Navbar />
        <Switch>
          <Route exact path="/" component={Auth} />
          <Route exact path="/register" component={Register} />
          <Route path="*" component={NotFound} />
        </Switch>
      </BrowserRouter>
      <GlobalStyle />
    </React.Fragment>
  );
}