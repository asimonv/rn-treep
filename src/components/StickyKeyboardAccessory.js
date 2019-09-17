import React, { Component } from 'react';
import { TextInput, View } from 'react-native';
import PropTypes from 'prop-types';
import { BORDER_RADIUS } from '../styles/common.style';
import Button from './Button';
import Layout from '../styles/Layout';

class StickyKeyboardAccessory extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: '',
    };
    this._onPressSend = this._onPressSend.bind(this);
  }

  _onPressSend = () => {
    const { text } = this.state;
    this.props.onPressSend(text);
    this.setState({ text: '' });
  };

  render() {
    return (
      <View
        style={{
          backgroundColor: 'white',
          display: 'flex',
          alignItems: 'center',
          flexDirection: 'row',
          margin: Layout.container.margin / 2,
          padding: Layout.container.margin / 2,
        }}
      >
        <TextInput
          style={{
            flex: 1,
            fontSize: 16,
          }}
          value={this.state.text}
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
  onPressSend: PropTypes.func.isRequired,
};

export default StickyKeyboardAccessory;
