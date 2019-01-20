import React from 'react';
import {
  StyleSheet,
  Text,
} from 'react-native';

export default function HeaderView(props) {
  return (
    <Text style={styles.header}>{props.title}</Text>
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#F9F9F9',
    fontWeight: 'bold',
    fontSize: 15,
    color: 'black',
    paddingTop: 4,
    paddingBottom: 4,
  },
});
