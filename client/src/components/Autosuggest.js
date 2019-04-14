import React, { Component } from 'react'
import Autosuggest from 'react-autosuggest'
import { debounce } from 'throttle-debounce'
import { connect } from 'react-redux';
import { Label} from 'reactstrap';

import { findUser } from '../redux/actions';


const theme = {
  input: 'react-autosuggest__input form-control'
};

class AutoComplete extends Component {
  state = {
    value: '',
    suggestions: []
  }

  componentWillMount() {
    this.onSuggestionsFetchRequested = debounce(
      500,
      this.onSuggestionsFetchRequested
    )
  }

  renderSuggestion = suggestion => {
    return (
      <div className="result">
        <div>{`${suggestion.first_name} ${suggestion.last_name}`}</div>
      </div>
    )
  }

  onChange = (event, { newValue }) => {
    this.setState({ value: newValue })
  }

  onSuggestionsFetchRequested = ({ value }) => {
    this.props.findUser(value)
      .then(res => {
        let results = [];
        if (res.data.length) {
          results = res.data.map(h => h._source);
        }
        this.setState({ suggestions: results })
      })
  }

  onSuggestionsClearRequested = () => {
    this.setState({ suggestions: [] })
  }

  getSuggestionValue = (suggestion) => {
    this.props.onChange(suggestion.id);
    return `${suggestion.first_name} ${suggestion.last_name}`;
  }

  render() {
    const { value, suggestions } = this.state

    const inputProps = {
      placeholder: 'Customer name',
      value,
      onChange: this.onChange
    }

    return (
      <div>
        <Label for="user">Customer</Label>
        <Autosuggest
          suggestions={suggestions}
          onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
          onSuggestionsClearRequested={this.onSuggestionsClearRequested}
          getSuggestionValue={this.getSuggestionValue}
          renderSuggestion={this.renderSuggestion}
          inputProps={inputProps}
          theme={theme}
          id="user"
        />
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    apiUrl: state.api.url,
    headers: state.authenticate.headers
  };
};
  
export default connect(
  mapStateToProps,
  { findUser }
)(AutoComplete);

