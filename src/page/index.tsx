import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Navbar } from '../components/Navbar';
import { Auth } from './Auth';
import { Register } from './Register';
import { MyProfile } from './MyProfile';
import { NotFound } from './NotFound';
import { GlobalStyle } from '../style/GlobalStyle';
import { Helmet } from 'react-helmet';

export function App() {
  return (
    <React.Fragment>
      <BrowserRouter>
        <Helmet titleTemplate="Auth - %s" defaultTitle="Auth" />
        <Navbar />
        <Switch>
          <Route exact path="/" component={Auth} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/myprofile" component={MyProfile} />
          <Route path="*" component={NotFound} />
        </Switch>
      </BrowserRouter>
      <GlobalStyle />
    </React.Fragment>
  );
}
