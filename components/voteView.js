'use strict';

import React from 'react-native';
const {
  Text,
  View,
  Image,
  TouchableHighlight,
  StyleSheet,
  Modal,
} = React;

const options = [
  {image: '', text: 'excelente'},
  {image: '', text: 'muy buena'},
  {image: '', text: 'buena'},
  {image: '', text: 'regular'},
  {image: '', text: 'mala'},
];

class VoteView extends React.Component{
    _onSelect(option) {
      console.log('option', option);
      this.props.navigator.push({
        index: this.props.nextIndex,
        passProps: {
          movie: this.props.movie,
          vote: option,
        }
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
