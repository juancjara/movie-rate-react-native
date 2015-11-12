/**
 * Sample React Native App
 * https://github.com/facebook/react-native

 */
'use strict';

import React from 'react-native';

const {
  ToastAndroid,
  AsyncStorage,
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

  _renderScene(route, navigator) {
    _navigator = navigator;

    let next = (nextIndex) => {
      return (props = {}) => {
        navigator.push({index: nextIndex, passProps: props});
      };
    };

    switch(route.index) {
    case 0:
      return <Home next={next(1)}/>;
    case 1:
      return <MovieList next={next(2)}/>;
    case 2:
      return <VoteView next={next(3)} {...route.passProps} />
    case 3:
      return <VoteVerification
               next = {() => {
                 navigator.replaceAtIndex({index: 1}, 1);
                 navigator.pop();
               }}
               {...route.passProps}/>;
    default: return null;
    }
  }

  render() {
    return (
      <Navigator
        initialRoute = {{index: 0}}
        renderScene = {this._renderScene.bind(this)}/>
    );
  }
};

let data = [
  {name: 'name1', date: '123 34 ', startTime: '15:00:00',
   room: 5, place: 'san borja', numVotes: 2, numSent: 0,
   endTime: Date.now(),},
  {name: 'name2', date: '123 34 ', startTime: '15:00:00',
   room: 5, place: 'san borja', numVotes: 0, numSent: 0,
   endTime: Date.now() + 100000,},
  {name: 'test', date: '123 34 ', startTime: '15:00:00',
   room: 5, place: 'san borja', numVotes: 0, numSent: 0,
   endTime: Date.now() + 200000,},
];

AsyncStorage.setItem('MOVIES', JSON.stringify(data), (error) => {
});

AppRegistry.registerComponent('movieReactNative', () => movieReactNative);
