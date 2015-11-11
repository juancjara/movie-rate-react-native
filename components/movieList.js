'use strict';

import React from 'react-native';
import Button from 'react-native-button';

import MovieSearch from './movieSearch';

const {
  SwitchAndroid,
  AsyncStorage,
  ListView,
  AppRegistry,
  StyleSheet,
  Text,
  TextInput,
  View,
  Image,
  TouchableHighlight,
  ToastAndroid,
} = React;

class MovieList extends React.Component {

  constructor(props) {
    super(props);
    this.state  = {
      searchText: '',
      dataSource: new  ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2
      })
    };
  }

  async _loadMovies() {
    try {
      let rawMovies = await AsyncStorage.getItem('MOVIES');
      let movies = JSON.parse(rawMovies);
      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(movies),
      });
    } catch(error) {
      console.log(error.message);
    }
  }

  componentDidMount() {
    this._loadMovies().done();
  }

  _onSelect(movie) {
    if (Date.now() > movie.endTime) {
      ToastAndroid.show('Vote time ended', ToastAndroid.SHORT);
    } else {
      this.props.navigator.push({
        index: this.props.nextIndex,
        passProps: {movie}
      });
    }
  }

  filter(text) {
    let matches = MOVIES.filter(({name}) => name.search(text) >= 0);
    this.setState({
      dataSource: this.state.dataSource.cloneWthRows(matches)
    });
  }

  render() {
    return (
      <View>
        <View style={styles.oneColumn}>
          <Text>Movie list</Text>
          <Button>Upload votes</Button>
        </View>
        <MovieSearch filter={this.filter} />
        <ListView
          dataSource={this.state.dataSource}
          renderRow={this.renderMovie.bind(this)}
        />
      </View>
    );
  }

  renderMovieDetail({name, date, startTime, room, place}) {
    return (
      <View style={styles.oneColumn}>
        <Text>{name}</Text>
        <Text>{date}</Text>
        <Text>{startTime}</Text>
        <Text>{room}</Text>
        <Text>{place}</Text>
      </View>
    );
  }

  renderVoteInfo({numVotes, numSend, endTime}) {
    let status = Date.now() < endTime? 'In progress': 'Ended';
    return (
      <View style={styles.oneColumn}>
        <Text>{numVotes}</Text>
        <Text>{numSend}</Text>
        <Text>{status}</Text>
      </View>
    );
  }

  renderMovie(movie) {
    return (
      <TouchableHighlight onPress={this._onSelect.bind(this, movie)}>
        <View style={styles.movieContainer}>
          <SwitchAndroid value={false}/>
          {this.renderMovieDetail(movie)}
          {this.renderVoteInfo(movie)}
        </View>
      </TouchableHighlight>
    );
  }
};

var styles = {
  movieContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  oneColumn: {
    flex: 1,
    marginLeft: 10
  }
};

export default MovieList;
