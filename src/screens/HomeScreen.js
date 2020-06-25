import React from "react";
import {
  FlatList,
  RefreshControl,
  StyleSheet,
  Text,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-navigation";
import { connect } from "react-redux";
import { getUserVotes } from "../actions/userActions";
import statsService from "../services/stats";
import Layout from "../styles/Layout";

import Message from "../components/Message";
import BigStatCard from "../components/BigStatCard";

class HomeScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };

  constructor(props) {
    super(props);
    this.state = {
      fetchingStats: true,
      stats: [],
    };
    this._fetchStats = this._fetchStats.bind(this);
    this._onPressStat = this._onPressStat.bind(this);
    this._renderItem = this._renderItem.bind(this);
    this._onRefresh = this._onRefresh.bind(this);
  }

  async componentDidMount() {
    const { dispatch } = this.props;
    this.props.dispatch(getUserVotes());
    await this._fetchStats();
  }

  _keyExtractor = (item, index) => `${index}`;

  _onRefresh = async () => {
    this.setState(prev => ({ fetchingStats: !prev.fetchingStats }));
    const stats = await this._fetchStats();
    console.log(stats);
  };

  _onPressStat(stat) {
    const {
      navigation: { navigate },
    } = this.props;
    navigate("StatScreen", { stat });
  }

  async _fetchStats() {
    const stats = await statsService.getStats();
    this.setState(prev => ({ stats, fetchingStats: !prev.fetchingStats }));
  }

  _renderItem({ item }) {
    const { title, subtitle, image, statType } = item;
    return statType == 0 ? (
      <BigStatCard item={item} onPress={this._onPressStat} />
    ) : (
      <Message title={title} style={{ margin: 20 }} />
    );
  }

  render() {
    const { stats, fetchingStats } = this.state;
    return (
      <SafeAreaView style={styles.container}>
        {!stats ? (
          <ActivityIndicator size="large" />
        ) : (
          <FlatList
            data={stats}
            renderItem={this._renderItem}
            keyExtractor={this._keyExtractor}
            refreshControl={
              <RefreshControl
                refreshing={fetchingStats}
                onRefresh={this._onRefresh}
              />
            }
          />
        )}
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: { flex: 1 },
});

const mapStateToProps = state => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(HomeScreen);
