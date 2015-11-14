/**
 * Sample React Native App
 * https://github.com/facebook/react-native

 */
'use strict';

import {AsyncStorage, AppRegistry} from 'react-native';
import MovieReactNative from './components/app';

let data = [
  {name: 'name1', date: '123 34 ', startTime: '15:00:00',
   theater: 5, place: 'san borja', numVotes: 2, numSent: 0,
   endTime: Date.now(),},
  {name: 'name2', date: '123 34 ', startTime: '15:00:00',
   theater: 5, place: 'san borja', numVotes: 0, numSent: 0,
   endTime: Date.now() + 100000,},
  {name: 'test', date: '123 34 ', startTime: '15:00:00',
   theater: 5, place: 'san borja', numVotes: 0, numSent: 0,
   endTime: Date.now() + 200000,},
];

AsyncStorage.setItem('MOVIES', JSON.stringify(data), (error) => {
});

AppRegistry.registerComponent('movieReactNative', () => MovieReactNative);
