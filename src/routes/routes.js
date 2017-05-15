import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from 'react-router-dom'
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup';

import Home from '../components/Home';
import Find from '../components/Find';
import Settings from '../components/Settings';
import Login from '../components/Login';
import NotFound from '../components/NotFound';
import Signup from '../components/Signup';

// import * as firebase from 'firebase';

const Routes = ({ authed }) => (
    <Switch>
      <NormalRoute exact path="/" component={Home} key="/" />
      <PublicRoute authed={authed} path="/login" component={Login} key="/login"/>
      <PublicRoute authed={authed} path="/signup" component={Signup} key="/signup"/>
      <PrivateRoute authed={authed} path="/find" component={Find} key="/find"/>
      <PrivateRoute authed={authed} path="/settings" component={Settings} key="/settings"/>
      <NormalRoute path="/404" component={NotFound} key="/404"/>
      <Redirect from="*" to="/404" />
    </Switch>
);


const PublicRoute = ({ authed, component: Component, ...rest }) => (
  <CSSTransitionGroup
    transitionName="example"
    transitionAppear={true}
    transitionAppearTimeout={500}
    transitionEnterTimeout={500}
    transitionLeaveTimeout={300}>
    <Route
      {...rest}
      render={(props) => (!authed)
        ? 
        <Component {...props}/>
        : <Redirect to='/' />}
    />
  </CSSTransitionGroup>
);

const PrivateRoute = ({ authed, component: Component, ...rest }) => (
  <CSSTransitionGroup
    transitionName="example"
    transitionAppear={true}
    transitionAppearTimeout={500}
    transitionEnterTimeout={500}
    transitionLeaveTimeout={300}>
    <Route
      {...rest}
      render={(props) => (authed === true)
        ? <Component {...props} />
        : <Redirect to={{pathname: '/login', state: {from: props.location}}} />}
    />
  </CSSTransitionGroup>
);

const NormalRoute = ({ component: Component, ...rest }) => (
  <CSSTransitionGroup
    transitionName="example"
    transitionAppear={true}
    transitionAppearTimeout={500}
    transitionEnterTimeout={500}
    transitionLeaveTimeout={300}>
    <Route
      {...rest}
      render={(props) => <Component {...props}/>}
    />
  </CSSTransitionGroup>
);

export default Routes;
