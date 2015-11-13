import AppDispatcher from '../AppDispatcher';
import {
  INIT_DATA,
  TOGGLE_SELECTION,
  SEND_VOTES,
  VOTE,
} from '../constants/MovieConstants';


export default MovieActions = {

  loadData() {
    AppDispatcher.dispatch({
      type: INIT_DATA,
    });
  },

  toggleSelection(checked, name) {
    AppDispatcher.dispatch({
      type: TOGGLE_SELECTION,
      payload: {
        checked,
        name,
      },
    });
  },

  sendVotes() {
    AppDispatcher.dispatch({
      type: SEND_VOTES,
    });
  },

  vote(movie, vote) {
    AppDispatcher.dispatch({
      type: VOTE,
      payload: {
        movie: movie,
        vote: vote,
      },
    });
  }

};
