import React, { Component } from 'react';

import Card, { CardActions, CardContent, CardMedia } from 'material-ui/Card';
import Button from 'material-ui/Button';
import Typography from 'material-ui/Typography';
import Chip from 'material-ui/Chip'
import { withStyles } from 'material-ui/styles';

const styles = {
  card: {
    maxWidth: 345,
  },
  media: {
    height: 200,
  },
};

export default class ResultCard extends Component {
  constructor(props) {
    super(props)
  }

  render() {

    return (
      <div>
        <Card >
          <CardMedia
            className={"card-media"}
            image={this.props.business.image_url}
            title={this.props.business.id}
          />
          <CardContent>
            <Typography type="headline" component="h2">
              {this.props.business.name}
            </Typography>
            <Typography component="p">
              {
                this.props.business.location.address1 + ', ' +
                this.props.business.location.city + ', ' +
                this.props.business.location.state + ' ' + this.props.business.location.zip_code
              }
            </Typography>
          </CardContent>
          <CardActions>
            <Button size="small" color="primary" href={this.props.business.url}>
              Open on Yelp
            </Button>
            <Chip label={"Total distance: " +
            ((this.props.business.distanceValue[0] + this.props.business.distanceValue[1])*0.00062137).toFixed(2) +" mile(s)."}/>
          </CardActions>
        </Card>
      </div>
    )
  }
}