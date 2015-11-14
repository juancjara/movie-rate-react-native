'use strict';

import React from 'react-native';

const {
  TextInput,
} = React;

class MovieSearch extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchText: '',
    };
  }

  _onChange(searchText) {
    this.setState({searchText});
    this.props.filter(searchText);
  }

  render() {
    return (
      <TextInput
        placeholder='Search movie by name'
        onChangeText={this._onChange.bind(this)}>
        {this.state.searchText}
      </TextInput>
    );
  }
};

export default MovieSearch;
