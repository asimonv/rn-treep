import React from 'react';
import {
  StyleSheet,
  View,
} from 'react-native';

import StatCard from './StatCard';
import { cardType } from '../constants/enums';

export default class StatsView extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View>
        {Object.entries(this.props.stats).map(([key, value])=>{
          const stat = { title: key, ...value};
          return (
            <StatCard
              cardType={key == 'popularity' ? cardType.DEFAULT : cardType.PRIMARY }
              key={key}
              style={styles.statCard}
              stat={stat}
              onPress={this.props.onPress}
            />
          );
        })}
      </View>
    );
  }
};

const styles = StyleSheet.create({
  statCard: {
    marginTop: 5,
  }
});
