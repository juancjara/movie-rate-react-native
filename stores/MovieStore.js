'use strict'

import FluxStore from './FluxStore';
import {INIT_DATA} from '../constants/MovieConstants';
import {AsyncStorage} from 'react-native';

class MovieStore extends FluxStore {

  constructor() {
    super();
    this._movies = [];
    this.subscribe(() => this._registerToActions.bind(this));
  }

  _loadInitialData() {
    try {
      AsyncStorage.getItem('MOVIES', (err, rawMovies) => {
        this._movies = JSON.parse(rawMovies);
        this._movies.forEach((m) => m.selected = false);
        this.emitChange();
      });
    } catch(error) {
      console.log(error.message);
    }
  }

  _registerToActions(action) {
    switch(action.type) {
    case INIT_DATA:
      this._loadInitialData();
      break;
    }
  }

  getState() {
    return this._movies;
  }

}

export default new MovieStore();
