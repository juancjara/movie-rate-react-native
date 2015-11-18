'use strict';

import React from 'react-native';
import Button from 'react-native-button';
import {Map, List} from 'immutable';

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
      movies : List(),
      dataSource: new  ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2
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
    let matches = newRows.filter((movie) => {
      let name = movie.get('name');
      return name.search(this.state.searchText) >= 0;
    });
    this.setState({
      movies: newRows,
      dataSource: this.state.dataSource.cloneWithRows(matches.toJS()),
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
      <View style={styles.container}>
        <View style={styles.oneColumn}>
          <Text>Movie list</Text>
          <Button onPress={this._sendData.bind(this)}>
            Upload votes
          </Button>
        </View>
        <MovieSearch filter={this.filter.bind(this)} />
        <ListView
          style={styles.list}
          renderSeparator={() => <View style={styles.separator}/>}
          dataSource={this.state.dataSource}
          renderRow={this.renderMovie.bind(this)} />
      </View>
    );
  }

  renderRow({label, content}, idx) {
    return (
      <View style={styles.row} key={idx}>
        <Text>{`${label}: ${content}`}</Text>
      </View>
    );
  }

  renderMovieDetail({name, date, startTime, theater, place}) {
    var data = [{
      label: 'Name', content: name,
    }, {
      label: 'Date', content: date,
    }, {
      label: 'Start time', content: startTime,
    }, {
      label: 'Theater', content: theater,
    }, {
      label: 'Location', content: place,
    }];

    return (
      <View style={styles.oneColumn}>
        {data.map(this.renderRow)}
      </View>
    );
  }

  renderVoteInfo({numVotes, numSent, endTime}) {
    let inProgress = Date.now() < endTime;
    let status = inProgress? 'In progress': 'Ended';
    let bgColor = {
      textAlign: 'center',
      color: 'white',
      paddingLeft: 5,
      paddingRight: 5,
      backgroundColor: inProgress? 'green': 'red',
    };
    var data = [{
      label: '# votes', content: numVotes,
    }, {
      label: '# sent', content: numSent,
    }];
    return (
      <View style={styles.oneColumn}>
        {data.map(this.renderRow)}
        <Text style={bgColor}>{status}</Text>
      </View>
    );
  }

  renderMovie(movie) {
    return (
      <View style={styles.row}>
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



let styles = {
  bg: {
    backgroundColor: 'red',
  },
  column: {
    flexDirection: 'column',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  movieContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  oneColumn: {
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    flexDirection: 'column',
    marginLeft: 10,
  },
  separator: {

    backgroundColor: 'black',
  },
  container: {
    flex: 1,
    flexDirection: 'column',
  },
};

export default MovieList;
