import React, { Component } from 'react';

import NavBar from '../components/navbar';
import Input from '../components/input'
import ResultList from '../components/resultlist'
import WebMap from '../components/webmap'


export default class Home extends Component {
  render() {

    return (
      <div>
        <NavBar/>
        <Input/>
        <ResultList/>
        <WebMap/>
      </div>
    )
  }
}