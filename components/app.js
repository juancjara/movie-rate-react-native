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


import Home from './home';
import MovieList from './movieList';
import VoteView from './voteView';
import VoteVerification from './voteVerification';

var _navigator;
BackAndroid.addEventListener('hardwareBackPress', () => {
  if (_navigator && _navigator.getCurrentRoutes().length > 1) {
    _navigator.pop();
    return true;
  }
  return false;
});

class MovieReactNative extends React.Component {

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
      v
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

export default MovieReactNative;
