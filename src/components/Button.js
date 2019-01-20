import React from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';

import Layout from '../constants/Layout';
import Colors from '../constants/Colors';

export default function Button(props){
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={props.onPress}
    >
      <Text style={styles.text}>{props.title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: Colors.buttons.blue,
    borderRadius: Layout.container.borderRadius,
    width: Layout.window.width / 2,
  },
  text: {
    color: 'white',
    textAlign: 'center',
    fontWeight: '600',
    textTransform: 'capitalize',
  },
});
