import React, { Component } from 'react';
import {Typography, Grid} from 'material-ui';
import ResultCard from './resultcard';



export default class ResultList extends Component {
  constructor(props) {
    super(props)
  }
  render() {

    return (
      <div className="result-list">
        <Grid container>
          {
            this.props.businesses.map(
            (business, index) => {
              return (
                <Grid item xs={12}>
                  <ResultCard key={'ResultCard#' + index} business={business}/>
                </Grid>)
            }
            )
          }
        </Grid>
      </div>
    )
  }
}