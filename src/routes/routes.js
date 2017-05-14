import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from 'react-router-dom'

import App from '../App';
import Home from '../components/Home';
import Login from '../components/Login';
import NotFound from '../components/NotFound';
import Signup from '../components/Signup';

const Routes = () => (
  <Router >
    <App>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/login" component={Login} />
        <Route path="/signup" component={Signup} />
        <Route path="/404" component={NotFound} />
        <Redirect from="*" to="/404" />
      </Switch>
    </App>
  </Router>
);

export default Routes;
