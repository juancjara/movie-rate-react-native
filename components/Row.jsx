import {
  Component,
  View,
  StyleSheet,
} from 'react-native';

class Row extends Component {

  render() {
    return (
      <View style={styles.row}>
        {this.props.children}
      </View>);
  }

}

var styles = {
  row: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
};

export default Row;
