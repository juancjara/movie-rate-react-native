'use strict';

var React = require('react-native');
var {
  AppRegistry,
  StyleSheet,
  Text,
  TextInput,
  View,
  Image,
} = React;

import Button from 'react-native-button';
import LoginActions from '../actions/LoginActions';
import LoginStore from '../stores/LoginStore';

var Home = React.createClass({
  getInitialState() {
    return {
      user: ''
    };
  },

  _logIn() {
    LoginActions.loginUser(this.state.user);
    this.props.next();
  },

  _logOut() {
    this.setState({user: 'logOut'});
  },

  _configure() {
    this.setState({user: 'configure'});
  },

  render() {
    return (
      <View style={[styles.container, styles.horizontalCenter]}>
        <Image
          source={{uri: 'http://i.imgur.com/UePbdph.jpg'}}
          style={styles.logo}
        />
        <View style={styles.rightContainer}>
          <Text style={styles.title}>Please login with your user ID</Text>
          <TextInput
            value={this.state.user}
            onChangeText={(userID) => this.setState({userID})}
          />
          <View style={styles.horizontalCenter}>
            <Button onPress={this._logIn}>Login</Button>
            <Button onPress={this._configure}>Settings</Button>
          </View>
        </View>
      </View>
    );
  }
});

var styles = {
  horizontalCenter: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  logo: {
    width: 53,
    height: 81,
  },
  rightContainer: {
    width: 250,
  },
  title: {
    textAlign: 'center',
  },
};

module.exports = Home;
