'use strict'

import FluxStore from './FluxStore';
import {
  INIT_DATA,
  VOTE,
  TOGGLE_SELECTION,
  SEND_VOTES,
} from '../constants/MovieConstants';

class MovieStore extends FluxStore {

  constructor() {
    super();
    this._movies = [];
    this.subscribe(() => this._registerToActions.bind(this));
  }

  _loadInitialData({movies}) {
    this._movies = movies;
  }

  _generateVote({movie}) {
    this._movies.forEach((m) => {
      if (m.name === movie.name) {
        m.numVotes++;
      }
    });
    //TODO
    //save movie after update
  }

  _sendVotes() {
    this._movies.forEach((movie) => {
      if (movie.selected) {
        movie.selected = false;
        movie.numSent++;
      }
    });
  }

  _toggleSelection({checked, name}) {
    this._movies.forEach((m) => {
      if (m.name === name) {
        m.selected = checked;
      }
    });
  }

  _registerToActions(action) {
    switch(action.type) {
    case INIT_DATA:
      this._loadInitialData(action.payload);
      break;
    case VOTE:
      this._generateVote(action.payload);
      break;
    case TOGGLE_SELECTION:
      this._toggleSelection(action.payload);
      break;
    case SEND_VOTES:
      this._sendVotes();
      break;
    default:
      return;
    }
    this.emitChange();
  }

  getState() {
   return this._movies;
  }

}

export default new MovieStore();
