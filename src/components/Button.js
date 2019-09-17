import React from 'react';
import { StyleSheet } from 'react-native';
import styled from 'styled-components/native';

import Layout from '../styles/Layout';
import { colors } from '../styles/common.style';

const ButtonContainer = styled.TouchableOpacity`
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
      return 'capitalize';
    }
    return 'none';
  }};
  font-size: ${props => {
    if (props.large) {
      return 16;
    }
    if (props.small) {
      return 10;
    }
    return 14;
  }};
`;

export default function Button(props) {
  const { style, title, ...noStyle } = props;
  return (
    <ButtonContainer {...noStyle} style={[styles.container, style]}>
      <StyledText {...noStyle}>{title}</StyledText>
    </ButtonContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    width: '100%',
    borderRadius: Layout.container.borderRadius,
  },
});
