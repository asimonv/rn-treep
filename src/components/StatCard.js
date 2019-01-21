import React from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import _ from 'lodash';

import LinearGradient from 'react-native-linear-gradient';
import { cardType } from '../constants/enums';

export default function StatCard(props) {
  var colors;
  switch (props.cardType) {
    case cardType.PRIMARY:
      colors = ['#37A6FA', '#0058E6'];
      break;
    default:
      colors = ['#03C9A9', '#01AF95'];
  }
  console.log(props.stat);
  return (
    <TouchableOpacity onPress={() => props.onPress(props.stat)}>
      <LinearGradient colors={colors} style={[props.style, styles.container]}>
        <Text style={styles.statTitle}>{_.capitalize(props.stat.title)}</Text>
        <Text style={styles.statValue}>{props.stat.value}</Text>
        {props.stat.voted && <Text>voted</Text>}
      </LinearGradient>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'blue',
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    maxHeight: 80,
    alignItems: 'center',
    borderRadius: 5,
  },
  statTitle: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold'
  },
  statValue: {
    color: 'white',
    fontSize: 40,
  }
});
