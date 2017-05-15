import React, { Component } from 'react';
import * as firebase from 'firebase';

import BreweryCard from './BreweryCard';

class Find extends Component {
  state = {
    breweries: null,
  };

  componentWillMount() {    
    const self = this;
    return firebase.database().ref('/breweries').once('value').then(function(snapshot) {
      self.setState({
          breweries: snapshot.val(),
        })
    });
  }

  buildBreweries = (breweries) => {
    let breweryArray =[];
    if (breweries) {
      for (const brewery in breweries) {
        breweryArray.push(<BreweryCard id={brewery} brewery={breweries[brewery]} key={breweries[brewery].name}/>)
      }
    }
    return breweryArray;
  }

  render() {
    return (
      <div>
        <h3 className="text-center" style={{marginBottom: 20}}>Nearby Breweries </h3>
        {this.buildBreweries(this.state.breweries)}
      </div>
    );
  }
}

export default Find;