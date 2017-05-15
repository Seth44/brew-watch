import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import { Jumbotron } from 'react-bootstrap';
import { RaisedButton } from 'material-ui';

const buttonStyle = {
  color: 'white',
  paddingLeft: '16px',
  paddingRight: '16px',
}
class Home extends Component {
   render() {
    return (
      <div className="App-header">
        <Jumbotron>
          <h1>Welcome to Brew-Watch!</h1>
          <p>The site to get all the most up-to-date info on your favorite brews.</p>
          <RaisedButton primary={true}>
            <Link to="/find" className="link-style" style={buttonStyle}>LEARN MORE</Link>
          </RaisedButton>
        </Jumbotron>
      </div>
    );
  }
}

export default Home;
