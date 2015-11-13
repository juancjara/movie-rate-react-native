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
      <View style={styles.container}>
        <Image
          source={{uri: 'http://i.imgur.com/UePbdph.jpg'}}
          style={styles.logo}
        />
        <View style={styles.rightContainer}>
          <Text>Por favor ingresar su ID de usuario</Text>
          <TextInput
            value={this.state.user}
            onChangeText={(userID) => this.setState({userID})}
          />
          <Button onPress={this._logIn}>Login</Button>
          <Button onPress={this._configure}>Configuration</Button>
        </View>
      </View>
    );
  }
});

var styles = {
  logo: {
    width: 53,
    height: 81
  },
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF'
  },
  rightContainer: {
    flex: 1
  }
}

module.exports = Home;
