import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { colors } from '../styles/common.style';

export default class TabBarIcon extends React.Component {
  render() {
    return (
      <Ionicons
        name={this.props.name}
        size={26}
        style={{ marginBottom: -3 }}
        color={this.props.focused ? colors.tabIconSelected : colors.tabIconDefault}
      />
    );
  }
}
