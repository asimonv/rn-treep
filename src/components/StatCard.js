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
  const votesMessage = props.stat.votes === '1' ? 'vote' : 'votes';
  return (
    <TouchableOpacity onPress={() => props.onPress(props.stat)}>
      <LinearGradient colors={colors} style={[props.style, styles.container]}>
        <View style={{flex: 1, flexDirection: 'row', justifyContent: 'space-between'}}>
          <View style={{flexDirection: 'column'}}>
            <Text style={styles.statTitle}>{_.capitalize(props.stat.title)}</Text>
            {props.stat.voted !== "0" && <Text style={styles.subtitle}>Voted</Text>}
          </View>
          <View style={{flexDirection: 'column'}}>
            <Text style={styles.statValue}>{props.stat.value}</Text>
            <Text style={{...styles.subtitle, textAlign: 'right'}}>{props.stat.votes} {votesMessage}</Text>
          </View>
        </View>
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
    fontWeight: 'bold',
  },
  statValue: {
    color: 'white',
    fontSize: 40,
    textAlign: 'right',
  },
  subtitle: {
    color: 'white',
    fontWeight: '600',
  },
});
