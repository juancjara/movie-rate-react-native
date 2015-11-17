'use strict';

import React from 'react-native';

import Button from 'react-native-button';
import MovieActions from '../actions/MovieActions';

const {
  View,
  Text,
  StyleSheet,
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
      <View style={styles.container}>
        <Text>Are you sure to rate {vote} the movie {movie.name}?</Text>
        <View style={styles.row}>
          <Button style={styles.btn} onPress={this._accept.bind(this)}>Accept</Button>
          <Button style={styles.btn} onPress={this._cancel.bind(this)}>Cancel</Button>
        </View>
      </View>
    );
  }
};

let styles = {
  container: {
    flex: 1,
    alignItems: 'center',
  },
  row: {
    flexDirection: 'row',
  },
  btn: {
    margin: 10,
  },
};

export default VoteVerification;
