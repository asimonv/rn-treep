import React from "react";
import { StyleSheet, TextInput, View } from "react-native";
import { colors } from "../styles/common.style";

export default class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = { text: "Search...", style: styles.container };

    this._onFocus = this._onFocus.bind(this);
    this._onBlur = this._onBlur.bind(this);
  }

  _onFocus() {
    this.setState({ style: styles.focused });
  }

  _onBlur() {
    this.setState({ style: styles.container });
  }

  render() {
    return (
      <View style={[this.props.style, this.state.style]}>
        <View style={styles.content}>
          <TextInput
            style={styles.searchBar}
            onChangeText={text => this.props.onChangeText(text)}
            clearButtonMode="always"
            placeholderTextColor="gray"
            placeholder={this.state.text}
            onFocus={() => this._onFocus()}
            onBlur={() => this._onBlur()}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    borderColor: "lightgray",
    borderWidth: 2,
    padding: 10,
    borderRadius: 30,
    backgroundColor: colors.lightgray,
  },
  icon: {
    fontSize: 18,
  },
  content: {
    flexDirection: "row",
    alignItems: "center",
    height: 30,
    marginLeft: 5,
  },
  searchBar: {
    flex: 1,
    marginLeft: 5,
    fontSize: 18,
    backgroundColor: "transparent",
  },
  focused: {
    padding: 10,
    justifyContent: "center",
    borderColor: colors.tintColor,
    borderWidth: 2,
    borderRadius: 30,
  },
});
