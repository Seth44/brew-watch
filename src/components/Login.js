import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { RaisedButton, Paper, TextField, CircularProgress } from 'material-ui';

import * as firebase from 'firebase';

const paperStyle = {
  width: 500,
  maxWidth: '90%',
  minHeight: 230,
  margin: 20,
  textAlign: 'center',
  display: 'inline-block',
};

class Login extends Component {
  state = {
    email: '',
    email_error_text: null, 
    password: '',
    password_error_text: null, 
    login_error_text: null,
    logging_in: false,
    disabled: true
  };

  login = () => {
    // loginUser(this.state.email, this.state.password);
    const self = this;
    self.setState({
      logging_in: true,
    });
    firebase.auth().signInWithEmailAndPassword(self.state.email, self.state.password)
      .then(function(response) {
        self.props.history.push('/');
      })
      .catch(function(error) {
        self.setState({
          logging_in: false,
          login_error_text: error.message,
        });
      });
  };

  changeValue = (e, type) => {
    const value = e.target.value;
    const nextState = {};
    nextState[type] = value;
    this.setState(nextState);
    this.isDisabled();
  };

  isDisabled = () => {
    let emailIsValid = false;
    let passwordIsValid = false;

    if (this.state.email === "") {
        this.setState({
          email_error_text: null
        });
    } else {
        if (this.state.email.length > 1) {
            emailIsValid = true
            this.setState({
              email_error_text: null
            });
        } else {
            this.setState({
              email_error_text: "Sorry, this is not a valid email"
            });
        }
    }

    if (this.state.password === "" || !this.state.password) {
        this.setState({
          password_error_text: null
        });
    } else {
        if (this.state.password.length >= 6) {
            passwordIsValid = true;
            this.setState({
              password_error_text: null
            });
        } else {
            this.setState({
              password_error_text: "Your password must be at least 6 characters"
            });
        }
    }

    if (emailIsValid && passwordIsValid) {
      this.setState({
        disabled: false
      });
    } else {
      this.setState({
        disabled: true
      });
    }
  };

  buildForm = () => {
    if (this.state.logging_in) {
      return (<CircularProgress
              style={{marginTop: 50}} size={100} thickness={5}
            />);
    }
    return (<form onSubmit={this.login}>
              <TextField
                floatingLabelText="Email"
                errorText={this.state.email_error_text}
                onChange={e => this.changeValue(e, 'email')}
                onBlur={this.isDisabled} 
              />
              <br/>
              <TextField
                floatingLabelText="Password"
                type="password"
                errorText={this.state.password_error_text}
                onChange={e => this.changeValue(e, 'password')}
                onBlur={this.isDisabled} 
              />
              <br/>
              <br/>
              <RaisedButton style={{marginBottom: 20}} type="submit" label="LOGIN" disabled={this.state.disabled} onTouchTap={this.login} primary={true} />
              <br/>
              <p style={{color: 'red'}}>{this.state.login_error_text}</p>
            </form>);
  }

  render() {
    return (
      <div className="App-header">
        <h2 style={{fontWeight: 100}}>Sign in to Brew-Watch</h2>
        <Paper style={paperStyle} zDepth={2}>
         {this.buildForm()}
        </Paper>
        <h3 style={{fontWeight: 100}}>Not yet registered? <Link to="/signup" style={{color: '#4078c0'}}>Sign up for free</Link>.</h3>
      </div>
    );
  }
}

export default withRouter(Login);
