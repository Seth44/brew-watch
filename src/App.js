import React, { Component } from 'react';
import { green400 } from 'material-ui/styles/colors';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import Navigation from './components/navigation/Navigation';
import './App.css';

const muiTheme = getMuiTheme({
  palette: {
    primary1Color: green400
  },
  appBar: {
    height: 60,
  },
});

class App extends Component {
  render() {
    return (
      <div>
        <MuiThemeProvider muiTheme={muiTheme}>
          <div className="App">
            <Navigation />
            {this.props.children}
          </div>
        </MuiThemeProvider>
      </div>
    );
  }
}

export default App;
