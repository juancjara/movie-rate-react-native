import AppDispatcher from '../AppDispatcher';
import {AsyncStorage} from 'react-native';
import {
  INIT_DATA,
  TOGGLE_SELECTION,
  SEND_VOTES,
  VOTE,
} from '../constants/MovieConstants';
import {CREATE_NOTIFICATION} from '../constants/NotificationConstants';

let createNotification = (message) => {
  AppDispatcher.dispatch({
    type: CREATE_NOTIFICATION,
    payload: {
      message: message,
    },
  });
};

export default MovieActions = {

  loadData() {
    try {

      AsyncStorage.getItem('MOVIES', (err, rawMovies) => {
        AppDispatcher.dispatch({
          type: INIT_DATA,
          payload: {
            movies: JSON.parse(rawMovies),
          },
        });
        createNotification('data created');
      });

    } catch(error) {
      createNotification('err ' + error);
    }
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
    createNotification('Votes sent');
  },

  vote(movie, vote) {
    AppDispatcher.dispatch({
      type: VOTE,
      payload: {
        movie: movie,
        vote: vote,
      },
    });
    createNotification('Movie Rated. Thanks.');
  }

};
