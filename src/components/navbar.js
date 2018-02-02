import React, { Component } from 'react';
import {AppBar, Typography} from 'material-ui'



export default class NavBar extends Component {
  render() {

    return (
      <div>
        <AppBar position="static" color="default">
          <Typography type="title" color="inherit">
            Navigation to be completed
          </Typography>
        </AppBar>
      </div>
    )
  }
}