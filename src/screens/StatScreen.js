import React, { Component } from "react";
import {
  FlatList,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View
} from "react-native";
import PropTypes from "prop-types";
import AnimatedEllipsis from "react-native-animated-ellipsis";
import { Transition } from "react-navigation-fluid-transitions";
import { SafeAreaView } from "react-navigation";

import Card from "../components/Card";
import Layout from "../styles/Layout";
import statsService from "../services/stats";

class StatScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fetchingStat: true,
      stats: []
    };
  }

  async componentDidMount() {
    StatusBar.setHidden(true);
    const { navigation } = this.props;
    const stat = navigation.getParam("stat");
    if (stat) {
      const { url } = stat;
      const stats = await statsService.getStat(url);
      this.setState(prev => ({ stats, fetchingStat: !prev.fetchingStat }));
    }
  }

  componentWillUnmount() {
    StatusBar.setHidden(false);
  }

  render() {
    const { fetchingStat, stats } = this.state;
    const { navigation } = this.props;
    const stat = navigation.getParam("stat");
    return (
      <SafeAreaView style={styles.container} forceInset={{ top: "never" }}>
        <ScrollView
          style={styles.container}
          alwaysBounceVertical={false}
          bounces={false}
        >
          <Card
            flat
            headerStyle={{ paddingTop: 50 }}
            item={stat}
            stats={stats}
            fetching={fetchingStat}
          />
        </ScrollView>
      </SafeAreaView>
    );
  }
}

StatScreen.propTypes = {
  url: PropTypes.string
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white"
  }
});

export default StatScreen;
