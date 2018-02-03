import React, { Component } from 'react';

import Card, { CardActions, CardContent, CardMedia } from 'material-ui/Card';
import Button from 'material-ui/Button';
import Typography from 'material-ui/Typography';
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
            image="/realty_austin.jpg"
            title="Realty Austin"
          />
          <CardContent>
            <Typography type="headline" component="h2">
              Realty Austin
            </Typography>
            <Typography component="p">
              15211 Shapiro Springs Ln, Houston, TX 78705
            </Typography>
          </CardContent>
          <CardActions>
            <Button size="small" color="primary">
              Open on Yelp
            </Button>
            <Button size="small" color="primary">
              Learn More
            </Button>
          </CardActions>
        </Card>
      </div>
    )
  }
}