import AppDispatcher from '../AppDispatcher';
import {INIT_DATA} from '../constants/MovieConstants';

export default MovieActions = {

  loadData() {
    AppDispatcher.dispatch({
      type: INIT_DATA,
    });
  }

};
