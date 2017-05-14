import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { RaisedButton, FlatButton, Paper, Dialog, TextField, CircularProgress } from 'material-ui';

import * as firebase from 'firebase';

import Terms from './Terms';

const paperStyle = {
  width: 500,
  maxWidth: '90%',
  margin: 20,
  textAlign: 'center',
  display: 'inline-block',
};

class Signup extends Component {
  state = {
    open: false,
    name: '', 
    email: '',
    email_error_text: null, 
    password: '',
    password_error_text: null, 
    logging_in: false,
    login_error_text: null,
    disabled: true
  };

  signup = () => {
    // createUser(this.state.name, this.state.email, this.state.password);
    const self = this;
    self.setState({
        logging_in: true,
    });
    firebase.auth().createUserWithEmailAndPassword(self.state.email, self.state.password)
      .then(function(response) {
        const user = firebase.auth().currentUser;
        user.updateProfile({
          displayName: self.state.name,
        }).then(function() {
          // Update successful.
        }, function(error) {
          // An error happened.
        });       
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

  validateEmail = (email) => {
    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }

  isDisabled = () => {
    let nameIsValid = false;
    let emailIsValid = false;
    let passwordIsValid = false;

    if (this.state.name.length > 0) {
      nameIsValid = true;
    } 

    if (this.state.email === "") {
        this.setState({
            email_error_text: null
        });
    } else {
        if (this.state.email.length > 0 && this.validateEmail(this.state.email)) {
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

    if (emailIsValid && passwordIsValid && nameIsValid) {
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
    const actions = [
      <FlatButton
        label="Close"
        primary={true}
        onTouchTap={this.handleClose}
      />,
    ];
    return (<form onSubmit={this.signup}>
              <TextField
                floatingLabelText="Name"
                hintText="First and last name"
                onChange={e => this.changeValue(e, 'name')}
                onBlur={this.isDisabled}
              />
              <TextField
                floatingLabelText="Email"
                hintText="This will be your login"
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
              <p style={{padding: 10}}>By clicking on “Sign Up” below, you accept the <a onClick={this.handleOpen} style={{color: '#4078c0'}}>Terms of Service</a>.</p>
              <Dialog
                title="Terms of Service"
                actions={actions}
                modal={false}
                open={this.state.open}
                onRequestClose={this.handleClose}
                autoScrollBodyContent={true}
              >
                <Terms />
              </Dialog>
              <br/>
              <RaisedButton style={{marginBottom: 20}} type="submit" disabled={this.state.disabled} label="SIGN UP" onTouchTap={this.signup} primary={true} />
              <br/>
              <p style={{color: 'red'}}>{this.state.login_error_text}</p>
            </form>)
  };

  handleOpen = () => {
    this.setState({open: true});
  };

  handleClose = () => {
    this.setState({open: false});
  };

  render() {
    return (
      <div className="App-header">
        <h2 style={{fontWeight: 100}}>Create your free account</h2>
        <Paper style={paperStyle} zDepth={2}>
          {this.buildForm()}
        </Paper>
        <h3 style={{fontWeight: 100}}>Already have an account? Simply <Link to="/login" style={{color: '#4078c0'}}>sign in</Link>.</h3>
      </div>
    );
  }
}

export default withRouter(Signup);
