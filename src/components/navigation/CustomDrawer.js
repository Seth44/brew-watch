import React from 'react';
import { Link } from 'react-router-dom';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import Divider from 'material-ui/Divider';
import Subheader from 'material-ui/Subheader';

const menuItemStyle = {
  paddingLeft: '20px',
}
const linkStyle = {
  height: '100%',
  display: 'block'
}

export default class CustomDrawer extends React.Component {
  buildLoggedIn = () => {
    return (
      <div>
        <MenuItem onTouchTap={this.props.handleClose} style={menuItemStyle}>
          <Link to='/' style={linkStyle}>Home</Link>
        </MenuItem>
        <MenuItem onTouchTap={this.props.handleClose} style={menuItemStyle}>
          <Link to='/find' style={linkStyle}>Find</Link>
        </MenuItem>
        <MenuItem onTouchTap={this.props.handleClose} style={menuItemStyle}>About</MenuItem> 
        <MenuItem onTouchTap={this.props.handleClose} style={menuItemStyle}>Contact</MenuItem>
      </div>
    );
  }
  buildLoggedOut = () => {
    return (
      <div>
        <MenuItem onTouchTap={this.props.handleClose} style={menuItemStyle}>
          <Link to='/' style={linkStyle}>Home</Link>
        </MenuItem>
        <MenuItem onTouchTap={this.props.handleClose} style={menuItemStyle}>
          <Link to='/login' style={linkStyle}>Login</Link>
        </MenuItem>
        <MenuItem onTouchTap={this.props.handleClose} style={menuItemStyle}>
          <Link to='/signup' style={linkStyle}>Signup</Link>
        </MenuItem>
        <MenuItem onTouchTap={this.props.handleClose} style={menuItemStyle}>About</MenuItem> 
        <MenuItem onTouchTap={this.props.handleClose} style={menuItemStyle}>Contact</MenuItem>
      </div>
    );
  }
  render() {
    const menu = this.props.loggedIn ? this.buildLoggedIn() : this.buildLoggedOut();
    
    return (
      <div>
        <Drawer
          docked={false}
          width={300}
          open={this.props.open}
          onRequestChange={this.props.handleToggle}
        >
          <Subheader>Brew-Watch </Subheader>
          <Divider />
          {menu}
        </Drawer>
      </div>
    );
  }
}