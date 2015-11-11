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
      data: [],
      dataSource: new  ListView.DataSource({
        rowHasChanged: (row1, row2) => true
      })
    };
  }

  async _loadMovies() {
    try {
      let rawMovies = await AsyncStorage.getItem('MOVIES');
      let movies = JSON.parse(rawMovies);
      movies.forEach((m) => m.selected = false);
      this.setState({data: movies});
      this.updateListView(movies);
    } catch(error) {
      console.log(error.message);
    }
  }

  componentDidMount() {
    this._loadMovies().done();
  }

  _toggleSwitch(checked, name) {
    let data = this.state.data.slice();
    data.forEach((m) => {
      if (m.name === name) {
        m.selected = checked;
      }
    });
    let matches = data.filter((movie) => movie.name.search(this.state.searchText) >= 0);
    this.setState({data});
    this.updateListView(matches);
  }

  _onSelect(movie) {
    if (Date.now() > movie.endTime) {
      ToastAndroid.show('Vote time ended', ToastAndroid.SHORT);
    } else {
      this.props.next({movie});
    }
  }

  updateListView(newRows) {
    this.setState({
      dataSource: this.state.dataSource.cloneWithRows(newRows),
    });
  }

  filter(text) {
    let matches = this.state.data.filter(({name}) => name.search(text) >= 0);
    this.setState({searchText: text});
    this.updateListView(matches);
  }

  render() {
    return (
      <View>
        <View style={styles.oneColumn}>
          <Text>Movie list</Text>
          <Button>Upload votes</Button>
        </View>
        <MovieSearch filter={this.filter.bind(this)} />
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
      <View>
        <SwitchAndroid
          onValueChange={(value) => this._toggleSwitch(value, movie.name)}
          value={movie.selected}/>
        <TouchableHighlight onPress={this._onSelect.bind(this, movie)}>
          <View style={styles.movieContainer}>
            {this.renderMovieDetail(movie)}
            {this.renderVoteInfo(movie)}
          </View>
        </TouchableHighlight>
      </View>
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
