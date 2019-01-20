import React from 'react';
import {
  Platform,
  StyleSheet,
  TextInput,
  View,
} from 'react-native';

export default class SearchBar extends React.Component {

  constructor(props) {
    super(props);
    this.state = { text: 'Search...' };
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.content}>
          <TextInput
            style={styles.searchBar}
            onChangeText={(text) => this.props.onChangeText(text)}
            placeholder={this.state.text}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: 40,
    justifyContent: 'center',
    borderColor: 'lightgray',
    borderWidth: 1,
    borderRadius: 5,
  },
  icon: {
    fontSize: 18,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 30,
    marginLeft: 5,
    backgroundColor: 'white',
  },
  searchBar: {
    flex: 1,
    marginLeft: 5,
    fontSize: 18,
  },
});
