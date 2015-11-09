'use strict';

var React = require('react-native');
var {
  AppRegistry,
  StyleSheet,
  Text,
  TextInput,
  View,
  Image
} = React;

var Home = React.createClass({
  getInitialState() {
    return {
      userID: ''
    };
  },

  _logIn() {
    this.props.changeView('MovieList');
  },

  _logOut() {
    this.setState({userID: 'logOut'});
  },

  _configure() {
    this.setState({userID: 'configure'});
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
            value={this.state.userID}
            onChangeText={(userID) => this.setState({userID})}
          />
          <Button onPress={this._logIn}>Ingresar</Button>
          <Button onPress={this._logOut}>Salir</Button>
          <Button onPress={this._configure}>Configurar</Button>
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
