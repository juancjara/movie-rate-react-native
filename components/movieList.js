'use strict';

import React from 'react-native';

import MovieSearch from './movieSearch';

const {
  ListView,
  AppRegistry,
  StyleSheet,
  Text,
  TextInput,
  View,
  Image,
  TouchableHighlight,
} = React;


let MOVIES = [
  {name: 'ggwp', date: '123 34 ', startTime: '15:00:00',
   room: 5, place: 'san borja', numVotes: 0, numSend: 0,
   status: 'finalizado',},
  {name: 'ggwp2', date: '123 34 ', startTime: '15:00:00',
   room: 5, place: 'san borja', numVotes: 0, numSend: 0,
   status: 'finalizado',},
  {name: 'test', date: '123 34 ', startTime: '15:00:00',
   room: 5, place: 'san borja', numVotes: 0, numSend: 0,
   status: 'finalizado',},
];


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

  componentDidMount() {
    this.setState({
      dataSource: this.state.dataSource.cloneWithRows(MOVIES),
    });
  }

  _onSelect(movie) {
    this.props.changeView('VoteView', movie);
  }

  filter(text) {
    let matches = MOVIES.filter(({name}) => name.search(text) >= 0);
    this.setState({
      dataSource: this.state.dataSource.cloneWithRows(matches)
    });
  }

  render() {
    return (
      <View>
        <View style={styles.oneColumn}>
          <Text>Movie list</Text>
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

  renderVoteInfo({numVotes, numSend, status}) {
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
          <Text>X</Text>
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
