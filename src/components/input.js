import React, { Component } from 'react';
import {InputLabel, Button} from 'material-ui'
import {FormHelperText, Divider} from 'material-ui'
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete'
import async from 'async'



export default class InputForm extends Component {
  // TODO add addres validation by only allowing them to pick from the list
  constructor(props) {
    super(props);
    this.state = {
      addressInput: {
        1: {
          'address': 'Austin, TX',
          'validated': true,
          'inputHelpText': ''
        },
        2: {
          'address': 'Dallas, TX',
          'validated': true,
          'inputHelpText': ''
        },
      },
      submitLocations: {},
      waitingSubmit: false
    };
    // Define function repeatedly used in components
    this.onChange1 = (address) => this.handleChange(1, address);
    this.onChange2 = (address) => this.handleChange(2, address);
    this.onSelect1 = (address, placeId) => this.handleSelect(1, address);
    this.onSelect2 = (address, placeId) => this.handleSelect(2, address);
    this.onNonSelect1 = (address, placeId) => this.handleNonSelect(1);
    this.onNonSelect2 = (address, placeId) => this.handleNonSelect(2);

    // Handler functions
    this.handleChange = this.handleChange.bind(this);
    this.handleSelect = this.handleSelect.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleReset = this.handleReset.bind(this);
  }

  /**
   * Update the input address component as the user types
   * @param addressNum the ordering of the input
   * @param newAddress the new address to change in state
   */
  handleChange (addressNum, newAddress) {
    let stateCopy = Object.assign({}, this.state);
    stateCopy.addressInput[addressNum]['address'] = newAddress;
    stateCopy.addressInput[addressNum]['validated'] = false;
    this.setState(stateCopy)
  }


  /**
   * When select an address from the autocomplete list, the address will be marked validated.
   * @param addressNum the ordering of the input
   * @param newAddress the new address to change in state
   */
  handleSelect (addressNum, newAddress) {
    let stateCopy = Object.assign({}, this.state);
    stateCopy.addressInput[addressNum]['address'] = newAddress;
    stateCopy.addressInput[addressNum]['validated'] = true;
    stateCopy.addressInput[addressNum]['inputHelpText'] = '';
    this.setState(stateCopy)
  }


  /**
   * Validate the input to make sure the user select a suggested address
   * @param addressNum the ordering of the input
   */
  handleNonSelect (addressNum) {
    let stateCopy = Object.assign({}, this.state);
    if (!stateCopy.addressInput[addressNum]['validated'])
      stateCopy.addressInput[addressNum]['inputHelpText'] = "Please select an address from autocomplete list!";
    else
      stateCopy.addressInput[addressNum]['inputHelpText'] = "";
    this.setState(stateCopy)
  }


  /**
   * Handle reset form back to default
   */
  handleReset() {
    let stateCopy = Object.assign({}, this.state);
    stateCopy.addressInput = {
      1: {
        'address': 'Austin, TX',
        'validated': true,
        'inputHelpText': ''
      },
      2: {
        'address': 'Dallas, TX',
        'validated': true,
        'inputHelpText': ''
      },
    }
    this.setState(stateCopy)
  }


  /**
   * Handle submission
   */
  handleSubmit() {
    this.setState((state) => ({waitingSubmit: true}));

    const object = this;

    let stateCopy = Object.assign({}, this.state);
    stateCopy.submitLocations = [];

    async.every([1,2], function(addressNum, callback) {
      geocodeByAddress(stateCopy.addressInput[addressNum]['address'])
        .then(results => getLatLng(results[0]))
        .then(latLng => {
          stateCopy.submitLocations[addressNum] = latLng;
          callback(null, true)
        })
        .catch(error => {
          stateCopy.addressInput[addressNum]['inputHelpText'] = "Error getting long/lat. Try another address or try again!";
          callback(error, false)
        });
    }, function (err, result) {
      if (err) {
        stateCopy.addressInput[1]['inputHelpText'] = "Error getting long/lat. Try another address or try again!";
        stateCopy.addressInput[2]['inputHelpText'] = "Error getting long/lat. Try another address or try again!";
        console.log(err);
      }
      stateCopy.waitingSubmit = false;

      // Set state to report any errors
      object.setState(stateCopy);
      // If succeed, then return data to parent
      if (result)
        object.props.afterSubmit(stateCopy.submitLocations);
    });
  }

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
          inputProps={
            {
              name: 'firstAddress',
              value: this.state.addressInput[1]['address'],
              onChange: this.onChange1,
              onBlur: this.onNonSelect1,
              type: 'search',
              placeholder: 'Please enter and select an address',
              required: true
            }
          }
          renderSuggestion={renderSuggestion}
          styles={myStyles}
          onSelect={this.onSelect1}
          onError={(status, clearSuggestions) => {
            console.log('Google Maps API returned error with status: ', status);
            clearSuggestions()
          }}
          onEnterKeyDown={this.onNonSelect1}
        />
        <FormHelperText margin='dense' error>{this.state.addressInput[1]['inputHelpText']}</FormHelperText>

        <InputLabel>Address #2</InputLabel>
        <PlacesAutocomplete
          inputProps={
            {
              name: 'secondAddress',
              value: this.state.addressInput[2]['address'],
              onChange: this.onChange2,
              onBlur: this.onNonSelect2,
              type: 'search',
              placeholder: 'Please enter and select an address',
              required: true
            }
          }
          renderSuggestion={renderSuggestion}
          styles={myStyles}
          onSelect={this.onSelect2}
          onError={(status, clearSuggestions) => {
            console.log('Google Maps API returned error with status: ', status);
            clearSuggestions()
          }}
          onEnterKeyDown={this.onNonSelect2}
        />
        <FormHelperText margin='dense' error>{this.state.addressInput[2]['inputHelpText']}</FormHelperText>

        <Button color = 'primary' raised size = 'small'
                onClick={this.handleSubmit}
                disabled={this.state.waitingSubmit |
                (!this.state.addressInput[1]['validated'] | !this.state.addressInput[2]['validated'])}>
          Submit
        </Button>
        <Button color = 'secondary' raised size = 'small'
                onClick={this.handleReset} disable={this.state.waitingSubmit}>
          Reset
        </Button>
      </div>
    )
  }
}