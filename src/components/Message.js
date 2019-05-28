import React from "react";
import styled from "styled-components/native";
import { Text } from "react-native";
import PropTypes from "prop-types";
import Layout from "../styles/Layout";
import { colors, BORDER_RADIUS } from "../styles/common.style";

const MessageContainer = styled.View`
  background-color: ${props => {
    if (props.primary) {
      return colors.buttons.blue;
    } else if (props.danger) {
      return colors.buttons.red;
    } else if (props.light) {
      return colors.buttons.light;
    }
    return colors.white;
  }};
  border: 1px solid
    ${props => {
      return "lightgray";
    }};
  padding: ${Layout.container.margin}px;
  margin: ${Layout.container.margin}px;
  border-radius: ${BORDER_RADIUS};
`;

const Message = ({ title }) => {
  return (
    <MessageContainer>
      <Text>{title}</Text>
    </MessageContainer>
  );
};

Message.propTypes = {
  title: PropTypes.string
};

export default Message;
