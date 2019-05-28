import React from "react";
import { SafeAreaView, FlatList, StyleSheet, Text, View } from "react-native";
import { connect } from "react-redux";
import AnimatedEllipsis from "react-native-animated-ellipsis";
import { getUserVotes } from "../actions/userActions";
import statsService from "../services/stats";
import Layout from "../styles/Layout";
import Card from "../components/Card";

class HomeScreen extends React.Component {
  static navigationOptions = {
    header: null
  };

  constructor(props) {
    super(props);
    this.state = {
      fetchingStats: true,
      stats: []
    };
    this._fetchStats = this._fetchStats.bind(this);
    this._onPressStat = this._onPressStat.bind(this);
    this._renderItem = this._renderItem.bind(this);
  }

  async _fetchStats() {
    const stats = await statsService.getStats();
    this.setState(prev => ({ stats, fetchingStats: !prev.fetchingStats }));
  }

  _onPressStat(stat) {
    const {
      navigation: { navigate }
    } = this.props;
    navigate("StatScreen", { stat });
  }

  _renderItem({ item }) {
    return (
      <View style={{ margin: Layout.container.margin * 2.5 }}>
        <Card onPress={this._onPressStat} item={item} />
      </View>
    );
  }

  _keyExtractor = item => item.id;

  async componentDidMount() {
    const { dispatch } = this.props;
    this.props.dispatch(getUserVotes());
    await this._fetchStats();
  }

  render() {
    const { stats } = this.state;
    return (
      <SafeAreaView style={styles.container}>
        {this.state.fetchingStats ? (
          <Text style={{ marginHorizontal: Layout.container.margin }}>
            Loading <AnimatedEllipsis />
          </Text>
        ) : (
          <FlatList
            style={styles.container}
            data={stats}
            renderItem={this._renderItem}
            keyExtractor={this._keyExtractor}
          />
        )}
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f7f7f7",
    display: "flex",
    flexDirection: "column"
  }
});

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps)(HomeScreen);
