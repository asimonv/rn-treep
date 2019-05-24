import React from "react";
import { StyleSheet, View } from "react-native";

import StatCard from "./StatCard";
import { cardType } from "../constants/enums";

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
            x => x.voteType === value.meta.repr && parent.id === x.teacherId
          );
          const stat = { title: key, ...value, voted };
          return (
            <StatCard
              cardType={
                key == "popularity" ? cardType.DEFAULT : cardType.PRIMARY
              }
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
    marginTop: 5
  }
});
