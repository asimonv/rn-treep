import React from 'react';
import { StyleSheet, View } from 'react-native';

import StatCard from './StatCard';
import { cardType } from '../constants/enums';
import Layout from '../styles/Layout';

export default class StatsView extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { stats, votes, parent, style } = this.props;
    return (
      <View style={[style]}>
        {Object.entries(stats).map(([key, value]) => {
          const voted = votes.find(
            x => x.voteType === value.meta.repr && parent.id === x.info.foreign_key
          );
          const stat = { title: value.voteType, ...value, voted };
          return (
            <StatCard
              cardType={key == 0 ? cardType.DEFAULT : cardType.PRIMARY}
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
}

const styles = StyleSheet.create({
  statCard: {
    marginTop: Layout.container.margin * 1.5,
  },
});
