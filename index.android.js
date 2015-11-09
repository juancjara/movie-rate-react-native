/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';

import React from 'react-native';

const {
  AppRegistry,
  StyleSheet,
  Text,
  TextInput,
  View,
  Image,
} = React;


import Home from './components/home';
import MovieList from './components/movieList';
import VoteView from './components/voteView';

class movieReactNative extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      view: 'MovieList',
      data: null,
    };
  }

  changeView(view, data) {
    this.setState({view, data});
  }

  renderView() {
    switch (this.state.view) {
    case 'Home':
      return <Home changeView={this.changeView.bind(this)} />;
    case 'MovieList':
      return <MovieList changeView = {this.changeView.bind(this)} />;
    case 'VoteView':
      return <VoteView movie={this.state.data} changeView={this.changeView.bind(this)}/>;
    default:
      return null;
    }
  }

  render() {
    return this.renderView();
  }
};

AppRegistry.registerComponent('movieReactNative', () => movieReactNative);
