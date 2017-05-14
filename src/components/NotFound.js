import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { green400 } from 'material-ui/styles/colors';


class NotFound extends Component {
   render() {
    return (
      <div className="App-header">
        <h2>Whoopsie! We can't seem to find the page you are looking for.</h2>
        <h3><Link to="/" style={{color: green400 }}>E.T. phone home</Link></h3>
      </div>
    );
  }
}

export default NotFound;
