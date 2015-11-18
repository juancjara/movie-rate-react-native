'use strict';

import React from 'react-native';
import {Map} from 'immutable';

const {
  TextInput,
} = React;

class MovieSearch extends React.Component {
  constructor(props) {
    super(props);
    this.shouldComponentUpdate = React.addons.PureRenderMixin.shouldComponentUpdate.bind(this);
    this.state = {
      data: Map({searchText: ''}),
    };
  }

  _onChange(searchText) {
    this.setState(state => ({ data: state.data.set('searchText', searchText) }));
    this.props.filter(searchText);
  }

  render() {
    return (
      <TextInput
        placeholder='Search movie by name'
        onChangeText={this._onChange.bind(this)}>
        {this.state.data.get('searchText')}
      </TextInput>
    );
  }
};

export default MovieSearch;
