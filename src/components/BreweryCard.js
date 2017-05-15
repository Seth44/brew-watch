import React from 'react';
import { Link } from 'react-router-dom'
import { Card, CardActions, CardHeader, CardTitle, CardText } from 'material-ui/Card';
import { Avatar, FlatButton } from 'material-ui';
import Drink from 'material-ui/svg-icons/maps/local-drink';

const buttonStyle = {
  paddingLeft: '16px',
  paddingRight: '16px',
  verticalAlign: 'middle',
  position: 'relative',
  letterSpacing: '0px',
  fontWeight: '500',
  fontSize: '14px',
}

const cardStyle = {
  margin: 15,
};

const BreweryCard = ({ id, brewery } ) => (
  <Card style={cardStyle}>
    <CardHeader
      title={brewery.name}
      avatar={<Avatar style={{cursor: 'pointer'}} icon={<Drink />} />}
      subtitle={`${brewery.address} ${brewery.city}, ${brewery.state}`}
      actAsExpander={true}
      showExpandableButton={true}
    />
    <CardTitle title={brewery.name} subtitle="Card subtitle" expandable={true} />
    <CardText expandable={true}>
      {brewery.about}
      <br/>
      <br/>
      <iframe className="center-block" width="95%" height="400px" src="//www.google.com/maps/embed/v1/search?q=brewery&zoom=13&key=AIzaSyAqvRa6ACJTK0--nheZHsS7j4BcIfT_oTU" allowFullScreen="false">
      </iframe>
    </CardText>
    <CardActions>
      <FlatButton>
        <Link to={`/brewery/${id}`} className="link-style" style={buttonStyle}>PAGE</Link>
      </FlatButton>
      <FlatButton>
        <Link to={brewery.website} className="link-style" target="_blank" style={buttonStyle}>WEB SITE</Link>
      </FlatButton>
    </CardActions>
  </Card>
);

export default BreweryCard;