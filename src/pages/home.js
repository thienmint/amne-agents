import React, { Component } from 'react';

import NavBar from '../components/navbar';
import Input from '../components/input'


export default class Home extends Component {
  render() {

    return (
      <div>
        <NavBar/>
        <Input/>
      </div>
    )
  }
}