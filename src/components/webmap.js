/*
 * Base Google Map example
 */
import React, {Component} from 'react';
import Marker from './marker';
import GoogleMap from 'google-map-react';
import controllable from 'react-controllables';

const WebMap = controllable(['center', 'zoom', 'hoverKey', 'clickKey'])(
class WebMap extends Component {
  static defaultProps = {
    center: [30.2396338, -97.728029],
    zoom: 12
  };

  constructor(props) {
    super(props);

    this.generateMarkers = this.generateMarkers.bind(this);
  }

  _onBoundsChange = (center, zoom /* , bounds, marginBounds */) => {
    this.props.onCenterChange(center);
    this.props.onZoomChange(zoom);
  };

  _onChildClick = (key, childProps) => {
    // this.props.onCenterChange([childProps.lat, childProps.lng]);
  };

  _onChildMouseEnter = (key /*, childProps */) => {
    this.props.onHoverKeyChange(key);
  };

  _onChildMouseLeave = (/* key, childProps */) => {
    this.props.onHoverKeyChange(null);
  };

  generateMarkers() {
    let firstAddress = this.props.locations['firstAddress'];
    let secondAddress = this.props.locations['secondAddress'];
    let midpoint = this.props.locations['midpoint'];

    let elems = [];
    if (Object.keys(midpoint).length > 0)
          elems.push(<Marker key={'midpoint'} lat={midpoint.lat} lng={midpoint.lng}
                             defaultColor={"action"} hover={this.props.hoverKey === 'midpoint'}
                             cardInfo={{
                               'title': 'Mid point between addresses',
                               'body1': '',
                               'body2': ''
                             }}
          />);

    if (Object.keys(firstAddress).length > 0)
      elems.push(<Marker key={'firstaddress'} lat={firstAddress.lat} lng={firstAddress.lng}
                         defaultColor={"primary"} hover={this.props.hoverKey === 'never'}
                         cardInfo={{
                           'title': 'Address #1',
                           'body1': '',
                           'body2': ''
                         }}/>);

    if (Object.keys(secondAddress).length > 0)
      elems.push(<Marker key={'secondaddress'} lat={secondAddress.lat} lng={secondAddress.lng}
                         defaultColor={"primary"} hover={this.props.hoverKey === 'never'}
                         cardInfo={{
                           'title': 'Address #2',
                           'body1': '',
                           'body2': ''
                         }}/>);

    this.props.businesses.map((business, index) => {
      elems.push(<Marker key={index} lat={business.coordinates.latitude} lng={business.coordinates.longitude}
                         defaultColor={"secondary"} hover={this.props.hoverKey === index}
                         cardInfo={{
                           'title': business.name,
                           'body1': 'Distance from #1: ' + business.distanceText[0],
                           'body2': 'Distance from #2: ' + business.distanceText[1],
                         }}/>)
    });

    return elems
  }

  render() {
    return (
      <div className="webmap">
        <GoogleMap
          apiKey='AIzaSyALINww1dMSk0T_EXLNaJ3MPLDdEV02H-g'
          center={this.props.center}
          zoom={this.props.zoom}
          hoverDistance={20}
          onBoundsChange={this._onBoundsChange}
          onChildClick={this._onChildClick}
          onChildMouseEnter={this._onChildMouseEnter}
          onChildMouseLeave={this._onChildMouseLeave}
        >
          {this.generateMarkers()}
        </GoogleMap>
      </div>
    );
  }
}
);

export default WebMap;