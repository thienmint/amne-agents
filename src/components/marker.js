import React, {Component} from 'react';

import {Room} from 'material-ui-icons'
import {Popover, Typography} from 'material-ui'
import Card, { CardActions, CardContent } from 'material-ui/Card';
export default class Marker extends Component {

  constructor(props) {
    super(props);
    this.state = {
      anchorEl: null,
      popperOpen: false,
    };
  }

  handlePopoverOpen = event => {
    this.setState({ anchorEl: event.target });
  };

  handlePopoverClose = () => {
    this.setState({ anchorEl: null });
  };

  render() {
    const { anchorEl } = this.state;
    const open = !!anchorEl;


    const str = this.props.hover ? "#000" : this.props.defaultColor;

    return (
      <div>
        <Room onClick={this.handlePopoverOpen}
              lat={this.props.lat} lng={this.props.lng} color={str}/>
        <div>
          <Popover
            open={open}
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'left',
            }}

            transformOrigin={{
              vertical: 'top',
              horizontal: 'left',
            }}
            onClose={this.handlePopoverClose}
          >
            <Card>
              <CardContent>
                <Typography type="title" component="h2">
                  Company name
                </Typography>
                <Typography type="body1">
                  Distance from #1: 15 miles
                </Typography>
                <Typography type="body1">
                  Distance from #2: 25 miles
                </Typography>
              </CardContent>
            </Card>
          </Popover>

        </div>
      </div>

    );
  }
}