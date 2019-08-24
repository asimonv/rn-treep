import React, { Component } from "react";
import { StyleSheet, Text, View } from "react-native";

import Modal from "react-native-modalbox";
import RadioGroup from "react-native-radio-buttons-group";

import Button from "./Button";
import Layout from "../styles/Layout";

export default class HeaderView extends Component {
  constructor(props) {
    super(props);

    this.state = {
      stat: undefined,
      data: props.data,
      interactedBefore: props.interactedBefore
    };

    this.onPress = this.onPress.bind(this);
  }

  onPress = data => {
    this.setState({ data });
  };

  openModal = () => this.refs.modal.open();
  closeModal = () => this.refs.modal.close();

  componentDidMount() {
    const { interactedBefore, data } = this.state;
    if (interactedBefore) {
      const interactedData = data.map(d => ({
        ...d,
        selected: false,
        disabled: !!interactedBefore
      }));
      // marks user option
      const index = interactedBefore.value - 1;
      interactedData[index].color = "green";
      interactedData[index].selected = true;
      this.setState({ data: interactedData });
    }
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.interactedBefore !== prevState.interactedBefore) {
      const { data } = nextProps;
      let interactedData = [];
      if (nextProps.interactedBefore) {
        interactedData = data.map(d => ({ ...d, selected: false }));
        // disables all options
        interactedData = data.map(d => ({
          ...d,
          disabled: !!nextProps.interactedBefore,
          selected: false
        }));
        // marks user option
        const index = nextProps.interactedBefore.value - 1;
        interactedData[index].color = "green";
        interactedData[index].selected = true;
      } else {
        // gives the mid option by default
        interactedData = data.map(d => ({
          ...d,
          selected: false,
          disabled: false
        }));
        const mid = parseInt(interactedData.length / 2, 10);
        interactedData[mid].selected = true;
        interactedData[mid].value = `${mid + 1}`;
      }
      console.log("interactedData", interactedData);
      return {
        data: interactedData,
        interactedBefore: nextProps.interactedBefore
      };
    }
    return null;
  }

  render() {
    const { interactedBefore, stat, title, onButtonPressed } = this.props;
    const { data } = this.state;

    return (
      <Modal
        style={styles.modal}
        position={"bottom"}
        swipeArea={20}
        ref={"modal"}
      >
        <View>
          {stat && (
            <Text style={styles.infoText}>
              What do you think about the{" "}
              <Text style={{ fontWeight: "bold" }}>{stat.title}</Text> of{" "}
              {title}?
            </Text>
          )}
        </View>
        {data && (
          <RadioGroup
            flexDirection="row"
            radioButtons={data}
            onPress={this.onPress}
          />
        )}
        <View style={styles.buttonsContainer}>
          <Button
            danger={!!interactedBefore}
            primary={!interactedBefore}
            large
            style={{ marginHorizontal: 5 }}
            title={interactedBefore ? "Remove Vote" : "Vote"}
            onPress={() =>
              onButtonPressed(
                interactedBefore
                  ? {
                      voteType: parseInt(stat.meta.repr, 10),
                      action: "remove",
                      value: parseInt(data.filter(d => d.selected)[0].value, 10)
                    }
                  : {
                      voteType: parseInt(stat.meta.repr, 10),
                      value: parseInt(
                        data.filter(d => d.selected)[0].value,
                        10
                      ),
                      action: "vote"
                    }
              )
            }
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
    fontSize: 17,
    maxWidth: Layout.window.width / 1.5
  },
  buttonsContainer: {
    display: "flex",
    marginHorizontal: 10,
    flexDirection: "row",
    justifyContent: "space-between"
  }
});
