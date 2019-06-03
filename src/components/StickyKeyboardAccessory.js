import React, { Component } from "react";
import { TextInput, View } from "react-native";
import PropTypes from "prop-types";

import Button from "./Button";
import Layout from "../styles/Layout";

class StickyKeyboardAccessory extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: ""
    };
    this._onPressSend = this._onPressSend.bind(this);
  }

  _onPressSend = () => {
    this.setState({ text: "" }, () => {
      this.props.onPressSend(this.state.text);
    });
  };

  render() {
    return (
      <View
        style={{
          backgroundColor: "white",
          display: "flex",
          alignItems: "center",
          flexDirection: "row",
          borderWidth: 1,
          borderColor: "lightgray",
          borderRadius: 5,
          padding: Layout.container.margin / 2
        }}
      >
        <TextInput
          style={{
            flex: 1
          }}
          multiline
          placeholder="Add a comment..."
          returnKeyType="done"
          onChangeText={text => this.setState({ text })}
        />
        <Button
          light
          title="Send"
          disabled={!this.state.text.trim()}
          style={{ maxWidth: 100, marginLeft: 10 }}
          onPress={this._onPressSend}
        />
      </View>
    );
  }
}

StickyKeyboardAccessory.propTypes = {
  onPressSend: PropTypes.func.isRequired
};

export default StickyKeyboardAccessory;
