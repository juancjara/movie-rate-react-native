'use strict';

import React from 'react-native';

const {
  Text,
  View,
  Image,
  TouchableHighlight,
  StyleSheet,
} = React;

  // <Image source={require('../images/meh.png')} ></Image>
  // <Image source={require('../images/awesome.png')} ></Image>
  // <Image source={require('../images/good.png')} ></Image>
const options = [
  {image: 'awesome.png', text: 'Awesome'},
  {image: 'verygood.png', text: 'Very good'},
  {image: 'good.png', text: 'Good'},
  {image: 'meh.png', text: 'Meh'},
  {image: 'terrible.png', text: 'Terrible'},
]; 

class VoteView extends React.Component{
  _onSelect(option) {
    this.props.next({
      movie: this.props.movie,
      vote: option,
    });
  }
  // 
  renderOptions() {
    //cant use map because images need to be known statically
    return (
      <View style={styles.row}>
        <TouchableHighlight onPress={this._onSelect.bind(this, options[0].text)}>
        <View>
            <Image source={require('../images/awesome.png')} ></Image>
            <Text>{options[0].text}</Text>
          </View>
        </TouchableHighlight>
        <TouchableHighlight onPress={this._onSelect.bind(this, options[1].text)}>
          <View>
            <Image source={require('../images/verygood.png')} ></Image>
            <Text>{options[1].text}</Text>
          </View>
        </TouchableHighlight>
        <TouchableHighlight onPress={this._onSelect.bind(this, options[2].text)}>
          <View>
            <Image source={require('../images/good.png')} ></Image>
            <Text>{options[2].text}</Text>
          </View>
        </TouchableHighlight>
        <TouchableHighlight onPress={this._onSelect.bind(this, options[3].text)}>
          <View>
            <Image source={require('../images/meh.png')} ></Image>
            <Text>{options[3].text}</Text>
          </View>
        </TouchableHighlight>
        <TouchableHighlight onPress={this._onSelect.bind(this, options[4].text)}>
          <View>
            <Image source={require('../images/terrible.png')} ></Image>
            <Text>{options[4].text}</Text>
          </View>
        </TouchableHighlight>
      </View>
    );
  }

  render() {
   let {name, date, startTime} = this.props.movie;
    return (
      <View style={styles.container}>
        {this.renderOptions()}
        <Text>Movie: {name}</Text>
        <Text>DateTime: {date} - {startTime}</Text>
      </View>
    );
  }
};

let styles = {
  container: {
    flex: 1,
    alignSelf: 'center',
  },
  row: {
    flexDirection: 'row',
    alignSelf: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
};

export default VoteView;
