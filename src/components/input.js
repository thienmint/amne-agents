import React, { Component } from 'react';
import {InputLabel, Button} from 'material-ui'
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete'



export default class InputForm extends Component {
  constructor(props) {
    super(props);
    this.state = { address: 'Austin, TX' };
    this.onChange = (address) => this.setState({ address })
  }

  handleFormSubmit = (event) => {
    event.preventDefault();

    geocodeByAddress(this.state.address)
      .then(results => getLatLng(results[0]))
      .then(latLng => console.log('Success', latLng))
      .catch(error => console.error('Error', error))
  };

  render() {
    const inputProps = {
      value: this.state.address,
      onChange: this.onChange,
    };
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
          inputProps={inputProps}
          renderSuggestion={renderSuggestion}
          styles={myStyles}
        />

        <InputLabel>Address #2</InputLabel>
        <PlacesAutocomplete
          inputProps={{value: 'Austin, TX', onChange: () => console.log('Change')}}
          renderSuggestion={renderSuggestion}
          styles={myStyles}
        />
        <Button
          color = 'primary'
          raised
          size = 'small'
          onClick={this.handleFormSubmit}
        >
          Submit
        </Button>
        <Button
          color = 'secondary'
          raised
          size = 'small'
        >
          Reset
        </Button>

      </div>
    )
  }
}