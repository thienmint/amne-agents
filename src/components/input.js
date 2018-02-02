import React, { Component } from 'react';
import {TextField, Typography} from 'material-ui'



export default class Input extends Component {
  render() {

    return (
      <div>
        <TextField
          id="address1"
          label="Address #1"
          InputLabelProps={{
            shrink: true,
            required: true
          }}
          placeholder="Please enter your first address..."
          fullWidth
          required
          margin="normal"
        />

        <TextField
          id="address2"
          label="Address #2"
          InputLabelProps={{
            shrink: true,
            required: true
          }}
          placeholder="Please enter your second address..."
          fullWidth
          required
          margin="normal"
        />
      </div>
    )
  }
}