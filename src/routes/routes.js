import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from 'react-router-dom'

import Home from '../components/Home';
import Find from '../components/Find';
import Settings from '../components/Settings';
import Login from '../components/Login';
import NotFound from '../components/NotFound';
import Signup from '../components/Signup';

// import * as firebase from 'firebase';

const Routes = ({ authed }) => (
  <Switch>
    <Route exact path="/" component={Home} />
    <PublicRoute authed={authed} path="/login" component={Login} />
    <PublicRoute authed={authed} path="/signup" component={Signup} />
    <PrivateRoute authed={authed} path="/find" component={Find} />
    <PrivateRoute authed={authed} path="/settings" component={Settings} />
    <Route path="/404" component={NotFound} />
    <Redirect from="*" to="/404" />
  </Switch>
);


const PublicRoute = ({ authed, component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) => (!authed)
      ? <Component {...props} />
      : <Redirect to='/' />}
  />
);

const PrivateRoute = ({ authed, component: Component, ...rest }) => (
    <Route
      {...rest}
      render={(props) => (authed === true)
        ? <Component {...props} />
        : <Redirect to={{pathname: '/login', state: {from: props.location}}} />}
    />
);

export default Routes;
