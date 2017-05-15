import React, { Component, PropTypes } from 'react';
import { 
  BrowserRouter as Router, 
  withRouter 
} from 'react-router-dom';
import { green400 } from 'material-ui/styles/colors';
import { CircularProgress } from 'material-ui';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import Navigation from './components/navigation/Navigation';
import Routes from './routes/routes';
import './App.css';

import * as firebase from 'firebase';

const muiTheme = getMuiTheme({
  palette: {
    primary1Color: green400
  },
  appBar: {
    height: 60,
  },
});

class App extends Component {
  state = {
    authed: false,
    loading: true,
  };

  componentDidMount () {
    this.removeListener = firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({
          authed: true,
          loading: false,
        })
      } else {
        this.setState({
          authed: false,
          loading: false
        })
      }
    })
  }
  componentWillUnmount () {
    this.removeListener()
  }

  render() {
    return this.state.loading === true ? 
      <MuiThemeProvider muiTheme={muiTheme}>
        <CircularProgress style={{marginTop: '45%'}} size={100} thickness={5} />
      </MuiThemeProvider> : (
      <Router>
        <MuiThemeProvider muiTheme={muiTheme}>
          <div className="App">
            <Navigation />
            <Routes authed={this.state.authed} />
          </div>
        </MuiThemeProvider>
      </Router>
    );
  }
}

export default App;
