import React, { Component } from "react";
import { StyleSheet, Text, View } from "react-native";

import Modal from "react-native-modalbox";
import RadioGroup from "react-native-radio-buttons-group";

import Button from "./Button";
import HeaderCard from "./HeaderCard";
import Layout from "../constants/Layout";

export default class HeaderView extends Component {
  constructor(props) {
    super(props);

    this.state = {
      stat: undefined
    };

    this.onPress = this.onPress.bind(this);
  }

  onPress = data => {
    this.setState({ data });
  };

  openModal = () => this.refs.modal.open();
  closeModal = () => this.refs.modal.close();

  render() {
    const { interactedBefore, stat, data, title, onButtonPressed } = this.props;
    return (
      <Modal
        style={styles.modal}
        position={"bottom"}
        swipeArea={20}
        ref={"modal"}
      >
        <View>
          <HeaderCard {...this.props} />
          {stat && (
            <Text style={styles.infoText}>
              What do you think about the{" "}
              <Text style={{ fontWeight: "bold" }}>{stat.title}</Text> of{" "}
              {title}?
            </Text>
          )}
        </View>
        <RadioGroup
          flexDirection="row"
          radioButtons={data}
          onPress={this.onPress}
        />
        <View style={styles.buttonsContainer}>
          {interactedBefore && (
            <Button
              danger
              style={{ marginHorizontal: 5 }}
              title={"Remove Vote"}
              onPress={() =>
                onButtonPressed({
                  voteType: parseInt(stat.meta.repr, 10),
                  action: "remove"
                })
              }
            />
          )}
          <Button
            primary
            style={{ marginHorizontal: 5 }}
            onPress={() =>
              onButtonPressed({
                voteType: parseInt(stat.meta.repr, 10),
                value: parseInt(
                  this.state.data.filter(d => d.selected)[0].value,
                  10
                ),
                action: "vote"
              })
            }
            title={"Vote"}
          />
        </View>
      </Modal>
    );
  }
}

const styles = StyleSheet.create({
  modal: {
    justifyContent: "space-evenly",
    alignItems: "center",
    height: 300,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20
  },
  infoText: {
    marginTop: 5,
    color: "gray",
    textAlign: "center",
    maxWidth: Layout.window.width / 1.5
  },
  buttonsContainer: {
    display: "flex",
    marginHorizontal: 10,
    flexDirection: "row",
    justifyContent: "space-between"
  }
});
