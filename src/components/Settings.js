import React, { Component } from 'react';
import { RaisedButton, TextField, Snackbar } from 'material-ui';

import * as firebase from 'firebase';

class Settings extends Component {
  state = {
    username: '',
    email: '',
    openSnackbar: false,
    snackBarMessage: '',
  };

  componentWillMount () {    
    const userId = firebase.auth().currentUser.uid;    
    const self = this;
    return firebase.database().ref('/users/' + userId).once('value').then(function(snapshot) {
      self.setState({
          username: snapshot.val().username,
          email: snapshot.val().email,
        })
    });
  }

  handleUsernameChange = (e) => {
    this.setState({
      username: e.target.value,
    });
  };

  handleEmailChange = (e) => {
    this.setState({
      email: e.target.value,
    });
  }

  handleSnackBarClose = (e) => {
    this.setState({
      openSnackbar: false
    })
  }

  saveSettings = () => {
    const user = firebase.auth().currentUser;
    const self = this;
    firebase.database().ref('users/' + user.uid).set({
      username: self.state.username,
      email: self.state.email,
    })
    .then(function() {
      self.setState({
        openSnackbar: true,
        snackBarMessage: 'Successfully Saved!',
      });
    }, function(error) {
      self.setState({
        openSnackbar: true,
        snackBarMessage: 'Oops, something went wrong. Try again.',
      }); 
    });
  };

  render() {
    return (
      <div className="App-header">
        <h3>My Settings Page</h3>
        <TextField
          value={this.state.username}
          floatingLabelText="Username"
          onChange={this.handleUsernameChange}
        />
        <br/>
        <TextField
          value={this.state.email}
          floatingLabelText="Email"
          onChange={this.handleEmailChange}
        />
        <br/>
        <br/>
        <RaisedButton label="Save" primary={true} onTouchTap={this.saveSettings}/>

      <Snackbar
        open={this.state.openSnackbar}
        message={this.state.snackBarMessage}
        autoHideDuration={4000}
        onRequestClose={this.handleSnackBarClose}
      />   
      </div>
    );
  }
}

export default Settings;