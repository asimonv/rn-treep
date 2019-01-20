import React, { Component }  from 'react';
import {
  StyleSheet,
  Text,
  View,
} from 'react-native';

import Modal from 'react-native-modalbox';
import RadioGroup from 'react-native-radio-buttons-group';

import Button from './Button';
import HeaderCard from './HeaderCard';
import Layout from '../constants/Layout';

export default class HeaderView extends Component {

  constructor(props) {
    super(props);

    this.state = {
      data: undefined,
    };

    this.onPress = this.onPress.bind(this);
  }

  onPress = data => this.setState({ data });

  openModal = () => this.refs.modal.open();
  closeModal = () => this.refs.modal.close();

  render() {
    return (
      <Modal style={styles.modal} position={'bottom'} swipeArea={20} ref={'modal'}>
        <View>
          <HeaderCard {...this.props} />
          {this.props.stat &&
            <Text
              style={styles.infoText}
            >What do you think about the <Text style={{fontWeight: 'bold'}}>{this.props.stat.title}</Text> of {this.props.title}?</Text>
          }
        </View>
        <RadioGroup
          flexDirection="row"
          radioButtons={this.props.data}
          onPress={this.onPress}
        />
        <Button onPress={this.props.onButtonPressed} title={'submit'}/>
      </Modal>
    );
  }
}

const styles = StyleSheet.create({
  modal: {
    justifyContent: 'space-evenly',
    alignItems: 'center',
    height: 300,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  infoText: {
    marginTop: 5,
    color: 'gray',
    textAlign: 'center',
    maxWidth: Layout.window.width / 1.5,
  },
});
