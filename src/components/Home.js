import React, { Component } from 'react';
import { Jumbotron } from 'react-bootstrap';
import { RaisedButton } from 'material-ui';

class Home extends Component {
   render() {
    return (
      <div className="App-header">
        <Jumbotron>
          <h1>Welcome to Brew-Watch!</h1>
          <p>The site to get all of your favorite brewery information.</p>
          <RaisedButton label="Learn More" primary={true} />
        </Jumbotron>
      </div>
    );
  }
}

export default Home;
