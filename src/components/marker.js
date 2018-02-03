import React, {Component} from 'react';

import {Room} from 'material-ui-icons'

export default class Marker extends Component {
  constructor(props) {
    super(props);
  }

    render() {
    const str = this.props.$hover ? "#000" : this.props.defaultColor;

    return (
      <Room lat={this.props.lat} lng={this.props.lng} color={str}/>
    );
  }
}