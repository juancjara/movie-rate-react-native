'use strict'

import FluxStore from './FluxStore';
import {CREATE_NOTIFICATION} from '../constants/NotificationConstants';

class NotificationStore extends FluxStore {

  constructor() {
    super();
    this.subscribe(() => this._registerToActions.bind(this));
    this._message = '';
  }

  getState() {
    return this._message;
  }

  _createNotification({message}) {
    this._message = message;
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
