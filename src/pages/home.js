import React, { Component } from 'react';

/* Front-end imports */
import {Grid} from 'material-ui';

/* Components */
import NavBar from '../components/navbar';
import Input from '../components/input'
import ResultList from '../components/resultlist'
import WebMap from '../components/webmap'

/* External */
import axios from 'axios';

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mapCoordinates: {
        'search': [],
        'firstAddress': {},
        'secondAddress': {},
        'midpoint': {}
      }
    };
    this.yelpKey = '3tQmAEwuO1WpacLY5V8IOLH3289iryiuedM3nrX5PF6fZr3CLUyMq4EQZcjSWqZ-moDczoazxwpEJClCQyT45i887MIXJrl6fUioL_TdHLkNd5l7GWEZWA1f9tR0WnYx'
    this.handleSubmission = this.handleSubmission.bind(this);
  }

  /**
   * Given A and B, we find the midpoint so that we can expand radius from midpoint instead
   * Get Yelp data,
   * Build up a unique set of locations
   * Build up unique dictionary
   */
  handleSubmission (submitLocations) {
    let stateCopy = Object.assign({}, this.state);
    let object = this;
    console.log("Got submitted locations", submitLocations);
    stateCopy.mapCoordinates['firstAddress'] = submitLocations[1];
    stateCopy.mapCoordinates['secondAddress'] = submitLocations[2];

    let midpoint = Home.findMidPoint(submitLocations[1], submitLocations[2]);
    console.log("Mid point = ", midpoint);
    stateCopy.mapCoordinates['midpoint'] = midpoint;

    // Invoke API
    let endpoint = 'https://api.yelp.com/v3/businesses/search?';
    // TODO: Set the maximum radius to the
    let searchQuery = endpoint +
      'latitude=' + midpoint['lat'] +
      '&longitude=' + midpoint['lng'] +
      '&categories=realestatesvcs' +
      '&sort_by=distance' +
      '&radius=40000';
    let proxy = "https://cors.now.sh/";

    let config = {
      headers: {
        'Authorization': 'Bearer ' + this.yelpKey,
      }
    };

    axios.get(proxy+searchQuery, config).then((response) => {
      console.log("GOT DATA!");
      let data = response.data.businesses;
      let temp = [];
      for(let i = 0; i < data.length; ++i) {
        temp.push(data[i]["coordinates"])
      }
      stateCopy.mapCoordinates.search = temp;
      console.log(data);
      object.setState(stateCopy);

    },(error) => {
      console.log("CALLBACK ERROR");
      console.log(error)
    });
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
            <WebMap locations={this.state.mapCoordinates}/>
          </Grid>
        </Grid>
      </div>
    )
  }
}