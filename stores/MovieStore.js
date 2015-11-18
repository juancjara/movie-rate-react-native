'use strict';

import Immutable from 'immutable';
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
    this._movies = Immutable.List();
    this.subscribe(() => this._registerToActions.bind(this));
  }

  _loadInitialData({movies}) {
    this._movies = Immutable.fromJS(movies);
  }

  _generateVote({movie}) {
    var idx= this._movies
      .findIndex(m => m.get('name ')=== movie.name);

    this._movies = this._movies
      .updateIn([idx, 'numVotes'], votes => votes + 1);
    //TODO
    //save movie after update
  }

  _sendVotes() {
    this._movies = this._movies
      .map((movie) => {
        if (movie.get('selected')) {
          movie = movie.updateIn(['numSent'], n => n + 1);
        }
        return movie;
      });
  }

  _toggleSelection({checked, name}) {
    var idx = this._movies
      .findIndex(m => m.get('name') === name);

    this._movies = this._movies
      .setIn([idx, 'selected'], checked);
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
