import React, { Component, PropTypes } from 'react';
import { withRouter } from 'react-router-dom';
import { IconButton, FlatButton, RaisedButton, Avatar, AppBar, Popover, Menu, MenuItem } from 'material-ui';
import NavigationMenu from 'material-ui/svg-icons/navigation/menu';
import Person from 'material-ui/svg-icons/social/person';

import * as firebase from 'firebase';

import CustomDrawer from './CustomDrawer';

class Navigation extends Component {
  static propTypes = {
    history: PropTypes.object.isRequired
  }

  constructor(props) {
    super(props);
    this.state = {
      drawerOpen: false,
      avatarMenuOpen: false,
      loggedIn: null
    };
  }

  componentWillMount() {
    this.unsubscribe = firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.setState({
          loggedIn: true,
          avatarMenuOpen: false
        });
      } else {
        this.setState({
          loggedIn: false
        });
      }
    });
  }

  componentWillUnmount() {
    // Don't forget to unsubscribe when the component unmounts
    this.unsubscribe();
  }

  handleDrawerToggle = () => {
    this.setState({drawerOpen: !this.state.drawerOpen});
  };

  handleDrawerClose = () => this.setState({drawerOpen: false});

  handleAvatarTap = (e) => {
    // This prevents ghost click.
    e.preventDefault();

    this.setState({
      avatarMenuOpen: true,
      anchorEl: e.currentTarget,
    });
  };

  handleRequestClose = () => {
    this.setState({
      avatarMenuOpen: false,
    });
  };

  signOut = (e) => {
    e.preventDefault();
    const self = this;
    firebase.auth().signOut().then(function() {
      // Sign-out successful.
      self.props.history.push('/');
    }).catch(function(error) {
      // An error happened.
    });
  }

  buildRightNav = () => {
    if (this.state.loggedIn && this.state.loggedIn !== null) {
      return (
        <div>
          <Avatar style={{cursor: 'pointer'}} onTouchTap={this.handleAvatarTap} icon={<Person />} />
          <Popover
            open={this.state.avatarMenuOpen}
            anchorEl={this.state.anchorEl}
            anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
            targetOrigin={{horizontal: 'left', vertical: 'top'}}
            onRequestClose={this.handleRequestClose}
          >
          <Menu>
            <MenuItem primaryText="Help &amp; feedback" />
            <MenuItem primaryText="Settings" />
            <MenuItem primaryText="Sign out" onTouchTap={this.signOut} />
          </Menu>
        </Popover>
        </div>
      );
    } else if (this.state.loggedIn !== null) {
      return (
        <div>
          <FlatButton label="Login" onClick={() => this.props.history.push('/login')}/>
          <RaisedButton label="Sign Up" onClick={() => this.props.history.push('/signup')}/>
        </div>
      );
    }
  }
  render() {
    return (
      <div className="Navigation">
        <AppBar
          title={<span style={{cursor: 'pointer'}}>Brew-Watch</span>}
          onTitleTouchTap={() => this.props.history.push('/')}
          iconElementLeft={<IconButton onTouchTap={this.handleDrawerToggle}><NavigationMenu /></IconButton>}
          iconElementRight={
            <div style={{marginTop: '6px', marginRight: '6px'}}>
              {this.buildRightNav()}
            </div>
            }
        />
        <CustomDrawer 
          open={this.state.drawerOpen} 
          handleClose={this.handleDrawerClose} 
          handleToggle={this.handleDrawerToggle}
          loggedIn={this.state.loggedIn} 
        />
      </div>
    );
  }
}

export default withRouter(Navigation);