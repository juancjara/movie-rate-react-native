'use strict';

import React from 'react-native';

import Button from 'react-native-button';

const {
  AsyncStorage,
  View,
  Text,
  ToastAndroid,
} = React;

class VoteVerification extends React.Component {

  async _vote(name) {
    let rawMovies = await AsyncStorage.getItem('MOVIES');
    let movies = JSON.parse(rawMovies);
    movies.forEach((movie) => {
      if (movie.name === name) {
        movie.numVotes++;
      }
    })
    await AsyncStorage.setItem('MOVIES', JSON.stringify(movies));
  }

  _accept(name) {
    this._vote(name).done(() => {
      this.props.next();
      ToastAndroid.show('Movie Rated. Thanks', ToastAndroid.SHORT);
    });
  }

  _cancel() {
    this.props.next();
  }

  render() {
    let {movie, vote} = this.props;
    return (
      <View>
        <Text>Are you sure to rate {vote} the movie {movie.name}</Text>
        <Button onPress={this._accept.bind(this, movie.name)}>Accept</Button>
        <Button onPress={this._cancel.bind(this)}>Cancel</Button>
      </View>
    );
  }
};

export default VoteVerification;
