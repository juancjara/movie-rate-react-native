'use strict';

import React from 'react-native';

import Button from 'react-native-button';
import MovieActions from '../actions/MovieActions';

const {
  View,
  Text,
} = React;

class VoteVerification extends React.Component {

  _accept() {
    let {movie, vote} = this.props;
    MovieActions.vote(movie, vote);
    this.props.next();
  }

  _cancel() {
    this.props.next();
  }

  render() {
    let {movie, vote} = this.props;
    return (
      <View>
        <Text>Are you sure to rate {vote} the movie {movie.name}</Text>
        <Button onPress={this._accept.bind(this)}>Accept</Button>
        <Button onPress={this._cancel.bind(this)}>Cancel</Button>
      </View>
    );
  }
};

export default VoteVerification;
