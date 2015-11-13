import AppDispatcher from '../AppDispatcher';
import {LOGIN_USER} from '../constants/LoginConstants';

export default LoginActions = {

  loginUser(user, pw) {
    //do something with user and pw
    AppDispatcher.dispatch({
      type: LOGIN_USER
    });
  }

};
