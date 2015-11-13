'use strict';

import React from 'react-native';
import Button from 'react-native-button';

import MovieStore from '../stores/MovieStore';
import MovieActions from '../actions/MovieActions';
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
    this._onChange = this._onChange.bind(this);
    this.state  = {
      searchText: '',
      movies : '',
      dataSource: new  ListView.DataSource({
        rowHasChanged: (row1, row2) => true
      }),
    };
  }

  componentDidMount() {
    MovieStore.addChangeListener(this._onChange);
    MovieActions.loadData();
  }

  componentWillUnmount() {
    MovieStore.removeChangeListener(this._onChange);
  }

  _onChange() {
    this.updateListView(MovieStore.getState());
  }

  _sendData() {
    MovieActions.sendVotes();
    ToastAndroid.show('Votes sent.', ToastAndroid.SHORT);
  }

  _toggleSwitch(checked, name) {
    MovieActions.toggleSelection(checked, name);
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
      return name.search(this.state.searchText) >= 0;
    });
    this.setState({
      movies: newRows,
      dataSource: this.state.dataSource.cloneWithRows(matches),
    });
  }

  filter(text) {
    this.setState({searchText: text},
                  () => {
                    this.updateListView(this.state.movies);
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
