/*
 * Base Google Map example
 */
import React, {Component} from 'react';

import {Room} from 'material-ui-icons'
import GoogleMap from 'google-map-react';

export default class WebMap extends Component {
  static defaultProps = {
    center: [30.2396338, -97.728029],
    zoom: 12, // 12+
  };

  constructor(props) {
    super(props);
  }

  render() {
    //TODO set api key in process environment
    return (
      <div className="webmap">
        <GoogleMap
          // apiKey={YOUR_GOOGLE_MAP_API_KEY} // set if you need stats etc ...
          center={this.props.center}
          zoom={this.props.zoom}>
          <Room lat={30.239808} lng={-97.727961} color="secondary"/>
        </GoogleMap>
      </div>
    );
  }
}