'use strict';

import React from 'react-native';
const {
  Text,
  View,
  Image,
  TouchableHighlight,
  StyleSheet,
} = React;

const options = [
  {image: '', text: 'Awesome'},
  {image: '', text: 'Very good'},
  {image: '', text: 'Good'},
  {image: '', text: 'Meh'},
  {image: '', text: 'Terrible'},
];

class VoteView extends React.Component{
  _onSelect(option) {
    this.props.next({
      movie: this.props.movie,
      vote: option,
    });
  }

  renderOptions() {
    return (
      options.map(({text}, i) => {
        return (
          <TouchableHighlight onPress={this._onSelect.bind(this, text)} key={i}>
            <Text>{text}</Text>
          </TouchableHighlight>
        );
      })
    );
  }

  render() {
   let {name, date, startTime} = this.props.movie;
    return (
      <View>
        {this.renderOptions()}
        <Text>{name}</Text>
        <Text>{`${date} - ${startTime}`}</Text>
      </View>
    );
  }
};

export default VoteView;
