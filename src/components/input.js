import React, { Component } from 'react';
import {InputLabel, Button, CircularProgress} from 'material-ui'
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete'
import async from 'async'



export default class InputForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      address: {
        1: 'Austin, TX',
        2: 'Austin, TX'
      },
      submitLocations: [],
      waitingSubmit: false
    };
    this.onChange1 = (address) => this.handleChange(1, address);
    this.onChange2 = (address) => this.handleChange(2, address);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleReset = this.handleReset.bind(this);
  }
  handleChange (addressNum, newAddress) {
    let stateCopy = Object.assign({}, this.state);
    stateCopy.address[addressNum] = newAddress;
    this.setState(stateCopy)
  }

  handleSubmit() {
    this.setState({waitingSubmit: true});

    let stateCopy = Object.assign({}, this.state);
    stateCopy.submitLocations = [];

    let geoCode1 = geocodeByAddress(stateCopy.address[1]);
    let geoCode2 =geocodeByAddress(stateCopy.address[2]);

    async.every([geoCode1, geoCode2], function (geoCodePromise, callback) {
      geoCodePromise
        .then(results => getLatLng(results[0]))
        .then(latLng => {
          stateCopy.submitLocations.push(latLng);
          console.log("Got a result", latLng);
          callback(null, true)
        })
        .catch(error => {
          console.log("Error getting long/lat", error);
          callback(error, false)
        });
    }, function (err, result) {
      if (err) {console.log(err); return;}

      console.log("Final result", result)
    })

  }

  handleReset() {
    let stateCopy = Object.assign({}, this.state);
    stateCopy.address[1] = 'Austin, TX';
    stateCopy.address[2] = 'Austin, TX';
    this.setState(stateCopy)
  }

  handleFormSubmit = (event) => {
    event.preventDefault();

    geocodeByAddress(this.state.address[1])
      .then(results => getLatLng(results[0]))
      .then(latLng => console.log('Success', latLng))
      .catch(error => console.error('Error', error))
  };

  render() {
    // TODO update how suggestions are listed
    const renderSuggestion = ({ suggestion }) => (<div><i className="fa fa-map-marker"/>{suggestion}</div>);
    // TODO: Update this
    const myStyles = {
      root: {
        position: 'relative',
        paddingBottom: '0px',
      },
      input: {
        display: 'inline-block',
        width: '100%',
        padding: '0px',
      },
      autocompleteContainer: {
        position: 'absolute',
        top: '100%',
        backgroundColor: 'white',
        border: '1px solid #555555',
        width: '100%',
        zIndex: 9999
      },
      autocompleteItem: {
        backgroundColor: '#ffffff',
        padding: '10px',
        color: '#555555',
        cursor: 'pointer',
      },
      autocompleteItemActive: {
        backgroundColor: '#fafafa'
      },
    };
    // TODO: update the handlers
    return (
      <div>
        <InputLabel>Address #1</InputLabel>
        <PlacesAutocomplete
          name="firstAddress"
          inputProps={{value: this.state.address[1], onChange: this.onChange1}}
          renderSuggestion={renderSuggestion}
          styles={myStyles}
        />

        <InputLabel>Address #2</InputLabel>
        <PlacesAutocomplete
          name="secondAddress"
          inputProps={{value: this.state.address[2], onChange: this.onChange2}}
          renderSuggestion={renderSuggestion}
          styles={myStyles}
        />

        <Button
          color = 'primary'
          raised
          size = 'small'
          onClick={this.handleSubmit}
          disabled={this.state.waitingSubmit}
        >
          Submit
        </Button>
        <Button
          color = 'secondary'
          raised
          size = 'small'
          onClick={this.handleReset}
          disable={this.state.waitingSubmit}
        >
          Reset
        </Button>

        {this.state.waitingSubmit && <CircularProgress size={25}/>}

      </div>
    )
  }
}