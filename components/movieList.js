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
      this.updateListView(movies);
    } catch(error) {
      console.log(error.message);
    }
  }

  _sendData() {
    let data = this.state.data;
    let rows = data
     .filter(({selected}) => selected)
     .length;
    ToastAndroid.show(`${rows} rows sent.`, ToastAndroid.SHORT);

    data.forEach((movie) => {
      if (movie.selected) {
        movie.selected = false;
        movie.numSent++;
      }
    });
    this.updateListView(data);
  }

  componentDidMount() {
    this._loadMovies().done();
  }

  _toggleSwitch(checked, name) {
    let data = this.state.data;
    data.forEach((m) => {
      if (m.name === name) {
        m.selected = checked;
      }
    });
    this.updateListView(data);
  }

  _onSelect(movie) {
    if (Date.now() > movie.endTime) {
      ToastAndroid.show('Vote time ended', ToastAndroid.SHORT);
    } else {
      this.props.next({movie});
    }
  }

  updateListView(newRows) {
    let matches = newRows.filter(({name}) => {
      return name.search(this.state.searchText) >= 0
    });
    this.setState({
      data: newRows,
      dataSource: this.state.dataSource.cloneWithRows(matches),
    });
  }

  filter(text) {
    this.setState({searchText: text},
                  () => {
                    this.updateListView(this.state.data);
                  });
  }

  render() {
    return (
      <View>
        <View style={styles.oneColumn}>
          <Text>Movie list</Text>
          <Button onPress={this._sendData.bind(this)}>
            Upload votes
          </Button>
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

  renderVoteInfo({numVotes, numSent, endTime}) {
    let status = Date.now() < endTime? 'In progress': 'Ended';
    return (
      <View style={styles.oneColumn}>
        <Text>num votes {numVotes}</Text>
        <Text>num sent {numSent}</Text>
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
