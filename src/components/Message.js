import React from 'react';
import styled from 'styled-components/native';
import { Text } from 'react-native';
import PropTypes from 'prop-types';
import Layout from '../styles/Layout';
import { colors, BORDER_RADIUS } from '../styles/common.style';

const MessageContainer = styled.View`
  background-color: ${props => {
    if (props.primary) {
      return colors.buttons.blue;
    }
    if (props.danger) {
      return colors.buttons.red;
    }
    if (props.light) {
      return colors.buttons.light;
    }
    return colors.white;
  }};
  padding: ${Layout.container.margin * 1.5}px ${Layout.container.margin * 2}px;
  margin: ${props => (props.style ? props.style.margin : undefined) || Layout.container.margin}px;
  border-radius: ${BORDER_RADIUS * 3};
  box-shadow: 0px 1px 3px rgba(0, 0, 0, 0.1);
`;

const Message = ({ title, style }) => {
  return (
    <MessageContainer style={style}>
      <Text style={{ fontWeight: '600', color: colors.gray, fontSize: 16 }}>{title}</Text>
    </MessageContainer>
  );
};

Message.propTypes = {
  title: PropTypes.string,
};

export default Message;
