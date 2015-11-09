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
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,
    };
  }

  _onSelect() {
    this.setState({modalVisible: true});
  }

  renderOptions() {
    return (
      options.map(({text}) => {
        return (
          <TouchableHighlight onPress={this._onSelect.bind(this, text)}>
            <Text>{text}</Text>
          </TouchableHighlight>
        );
      })
    );
  }

  render() {
    var modalBackgroundStyle = {
      backgroundColor: this.state.transparent ? 'rgba(0, 0, 0, 0.5)' : '#f5fcff',
    };

    var innerContainerTransparentStyle = {backgroundColor: '#fff', padding: 20};
    let {name, date, startTime} = this.props.movie;
    return (
      <View>
        <Modal style={styles.test} visible={this.state.modalVisible}>
          <View style={[styles.container, modalBackgroundStyle]}>
            <View style={[styles.innerContainer, innerContainerTransparentStyle]}>
              <Text>asdf</Text>
            </View>
          </View>
        </Modal>
        {this.renderOptions()}
        <Text>{name}</Text>
        <Text>{`${date} - ${startTime}`}</Text>
      </View>
    );
  }
};

var styles = StyleSheet.create({
  test: {
    width: 100,
    height: 100,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  innerContainer: {
    borderRadius: 10,
  },
});

export default VoteView;
