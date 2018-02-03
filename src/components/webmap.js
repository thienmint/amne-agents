/*
 * Base Google Map example
 */
import React, {Component} from 'react';

import {Room} from 'material-ui-icons'
import GoogleMap from 'google-map-react';

export default class WebMap extends Component {
  constructor(props) {
    super(props);

    this.state = {
      center: [30.2396338, -97.728029],
      zoom: 10
    };

    this.generateMarkers = this.generateMarkers.bind(this);
  }

  generateMarkers() {
    let search = this.props.locations['search'];
    let firstAddress = this.props.locations['firstAddress'];
    let secondAddress = this.props.locations['secondAddress'];
    let midpoint = this.props.locations['midpoint'];

    let elems = [];
    if (Object.keys(midpoint).length > 0)
      elems.push(<Room lat={midpoint.lat} lng={midpoint.lng} color="action"/>);

    if (Object.keys(firstAddress).length > 0)
      elems.push(<Room lat={firstAddress.lat} lng={firstAddress.lng} color="primary"/>);

    if (Object.keys(secondAddress).length > 0)
      elems.push(<Room lat={secondAddress.lat} lng={secondAddress.lng} color="primary"/>);

    console.log(search);
    search.map((coor, index) => {
      elems.push(<Room key={index} lat={coor.latitude} lng={coor.longitude} color="secondary"/>)
    });

    return elems
  }

  static getCenter(midpoint) {
    // There is a midpoint
    if (Object.keys(midpoint).length > 0)
      return [midpoint.lat, midpoint.lng]
    else
      return [30.2396338, -97.728029]
  }

  render() {
    return (
      <div className="webmap">
        <GoogleMap
          apiKey='AIzaSyALINww1dMSk0T_EXLNaJ3MPLDdEV02H-g'
          center={WebMap.getCenter(this.props.locations['midpoint'])}
          zoom={10}>
          {this.generateMarkers()}
        </GoogleMap>
      </div>
    );
  }
}