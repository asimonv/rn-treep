import React from "react";
import { StyleSheet, Text } from "react-native";
import styled from "styled-components/native";

import Layout from "../constants/Layout";
import { colors } from "../styles/common.style";

const ButtonContainer = styled.TouchableOpacity`
  background-color: ${props => {
    if (props.primary) {
      return colors.buttons.blue;
    } else if (props.danger) {
      return colors.buttons.red;
    }
    return colors.buttons.blue;
  }};
`;

export default function Button(props) {
  return (
    <ButtonContainer {...props} style={[styles.container, props.style]}>
      <Text style={styles.text}>{props.title}</Text>
    </ButtonContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    flex: 1,
    borderRadius: Layout.container.borderRadius
  },
  text: {
    color: "white",
    textAlign: "center",
    fontWeight: "600",
    textTransform: "capitalize"
  }
});
