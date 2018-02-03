import React, { Component } from 'react';

/* Front-end imports */
import {Grid} from 'material-ui';

/* Components */
import NavBar from '../components/navbar';
import Input from '../components/input'
import ResultList from '../components/resultlist'
import WebMap from '../components/webmap'


export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
    this.handleSubmission = this.handleSubmission.bind(this);
  }

  handleSubmission (submitLocations) {
    /**
     * Get Yelp data here
     * Build up a unique set of locations
     * Build up unique dictionary
     */
    console.log("Got submitted locations", submitLocations)
    console.log("Mid point = ", Home.findMidPoint(submitLocations[1], submitLocations[2]))
  }

  static findMidPoint (coor1, coor2) {
    return {
      'lat': (coor1['lat'] + coor2['lat'])/2,
      'lng': (coor1['lng'] + coor2['lng'])/2
    }
  }

  render() {

    return (
      <div>
        <Grid container>
          <Grid item xs={12} sm={6} md={4} >
            <Grid container>
              <Grid item xs={12}>
                <NavBar/>
              </Grid>
              <Grid item xs={12}>
                <Input afterSubmit={this.handleSubmission}/>
              </Grid>
              <Grid item xs={12}>
                <ResultList/>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} sm={6} md={8} >
            <WebMap/>
          </Grid>
        </Grid>
      </div>
    )
  }
}