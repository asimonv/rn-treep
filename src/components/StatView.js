import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const StatView = ({ item, onPress, index }) => {
  return (
    <TouchableOpacity style={styles.container} onPress={() => onPress(item)}>
      <View style={styles.layout}>
        <Text style={styles.index}>{index + 1}</Text>
        <Text style={{ ...styles.title, marginLeft: 10 }}>{item.name}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  title: {
    fontSize: 18,
  },
  index: {
    fontSize: 35,
  },
  layout: {
    display: 'flex',
    flexDirection: 'row',
    flex: 1,
    alignItems: 'center',
  },
});

export default StatView;
