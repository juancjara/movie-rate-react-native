'use strict';

import React from 'react-native';

import Button from 'react-native-button';

const {
  View,
  Text,
  ToastAndroid,
} = React;

class VoteVerification extends React.Component {

  _accept() {
    //handle vote
    ToastAndroid.show('Movie Rated. Thanks', ToastAndroid.LONG);
    this.props.next();
  }

  _cancel() {
    this.props.next();
  }

  render() {
    console.log(this.props);
    let {movie, vote} = this.props;
    return (
      <View>
        <Text>{movie.name}</Text>
        <Text>{vote}</Text>
        <Button onPress={this._accept.bind(this)}>Accept</Button>
        <Button onPress={this._cancel.bind(this)}>Cancel</Button>
      </View>
    );
  }
};

export default VoteVerification;
