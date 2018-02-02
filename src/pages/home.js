import React, { Component } from 'react';

/* Front-end imports */
import {Grid} from 'material-ui';

/* Components */
import NavBar from '../components/navbar';
import Input from '../components/input'
import ResultList from '../components/resultlist'
import WebMap from '../components/webmap'


export default class Home extends Component {
  render() {

    return (
      <div>
        <Grid container>
          <Grid item xs={12} sm={4} md={3}>
            <Grid container>
              <Grid item xs={12}>
                <NavBar/>
              </Grid>
              <Grid item xs={12}>
                <Input/>
              </Grid>
              <Grid item xs={12}>
                <ResultList/>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} sm={8} md={9}>
            <WebMap/>
          </Grid>
        </Grid>
      </div>
    )
  }
}