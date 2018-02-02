/*
 * Base Google Map example
 */
import React, {Component} from 'react';

import GoogleMap from 'google-map-react';

export default class WebMap extends Component {
  static defaultProps = {
    center: [59.938043, 30.337157],
    zoom: 9,
  };

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="webmap">
        <GoogleMap
          // apiKey={YOUR_GOOGLE_MAP_API_KEY} // set if you need stats etc ...
          center={this.props.center}
          zoom={this.props.zoom}>
        </GoogleMap>
      </div>
    );
  }
}