import FluxStore from './FluxStore';
import {LOGIN_USER} from '../constants/LoginConstants';

class LoginStore extends FluxStore {

  constructor() {
    super();
    this.subscribe(() => this._registerToActions.bind(this));
  }

  _registerToActions(action) {
    switch(action.type) {
    case LOGIN_USER:
      //do something with the user
      this.emitChange();
      break;
    }
  }

}

export default new LoginStore();
