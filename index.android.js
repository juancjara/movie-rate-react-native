/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';

import React from 'react-native';

const {
  Navigator,
  AppRegistry,
  StyleSheet,
  Text,
  TextInput,
  View,
  Image,
  BackAndroid,
} = React;


import Home from './components/home';
import MovieList from './components/movieList';
import VoteView from './components/voteView';
import VoteVerification from './components/VoteVerification';

var _navigator;
BackAndroid.addEventListener('hardwareBackPress', () => {
  if (_navigator && _navigator.getCurrentRoutes().length > 1) {
    _navigator.pop();
    return true;
  }
  return false;
});

class movieReactNative extends React.Component {

  changeView(view, data) {
    this.setState({view, data});
  }

  _renderScene(route, navigator) {
    _navigator = navigator;
    switch(route.index) {
    case 0:
      return <Home navigator = {navigator} nextIndex = {1}/>;
    case 1:
      return <MovieList navigator={navigator} nextIndex = {2}/>;
    case 2:
      return <VoteView navigator={navigator} {...route.passProps} nextIndex={3}/>
    case 3:
      return <VoteVerification
               next = {() => navigator.pop()}
               {...route.passProps}/>;
    default: return null;
    }
  }

  render() {
    return (
      <Navigator
        initialRoute = {{name: 'Home', index: 0}}
        renderScene = {this._renderScene.bind(this)}/>
    );
  }
};

AppRegistry.registerComponent('movieReactNative', () => movieReactNative);
