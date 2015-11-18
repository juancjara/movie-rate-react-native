'use strict'

import FluxStore from './FluxStore';
import {CREATE_NOTIFICATION} from '../constants/NotificationConstants';
import {Map} from 'immutable';

class NotificationStore extends FluxStore {

  constructor() {
    super();
    this.subscribe(() => this._registerToActions.bind(this));
    this.state = Map({message: ''});
  }

  getState() {
    return this.state;
  }

  _createNotification({message}) {
    this.state = this.state.merge({message});
  }

  _registerToActions(action) {
    switch(action.type) {
    case CREATE_NOTIFICATION:
      this._createNotification(action.payload);
      break;
    default:
      return;
    }
    this.emitChange();
  }

}

export default new NotificationStore();
