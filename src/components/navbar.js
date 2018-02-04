import React, { Component } from 'react';
import {AppBar, Typography} from 'material-ui'



export default class NavBar extends Component {
  render() {

    return (
      <div>
        <AppBar position="static" color="default">
          <Typography type="title" color="inherit">
            Please enter 2 valid addresses below to search!
          </Typography>
        </AppBar>
      </div>
    )
  }
}