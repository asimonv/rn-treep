import React from "react";
import { StyleSheet } from "react-native";
import styled from "styled-components/native";

import Layout from "../constants/Layout";
import { colors } from "../styles/common.style";

const ButtonContainer = styled.TouchableOpacity`
  background-color: ${props => {
    if (props.primary) {
      return colors.buttons.blue;
    } else if (props.danger) {
      return colors.buttons.red;
    } else if (props.light) {
      return colors.buttons.light;
    }
    return colors.buttons.blue;
  }};
`;

const StyledText = styled.Text`
  color: ${props => {
    if (props.light) {
      return colors.text.light;
    }
    return colors.white;
  }};
  text-align: center;
  font-weight: 600;
  text-transform: ${props => {
    if (props.capitalize) {
      return "capitalize";
    }
    return "none";
  }};
  font-size: ${props => {
    if (props.large) {
      return 16;
    } else if (props.small) {
      return 10;
    }
    return 14;
  }};
`;

export default function Button(props) {
  const { style, title } = props;
  return (
    <ButtonContainer {...props} style={[styles.container, style]}>
      <StyledText {...props}>{title}</StyledText>
    </ButtonContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    flex: 1,
    borderRadius: Layout.container.borderRadius
  }
});
