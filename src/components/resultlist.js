import React, { Component } from 'react';
import {Typography, Grid} from 'material-ui';
import ResultCard from './resultcard';



export default class ResultList extends Component {
  render() {

    return (
      <div className="result-list">
        <Grid container>
          <Grid item xs={12}>
            <ResultCard/>
          </Grid>
        </Grid>
      </div>
    )
  }
}