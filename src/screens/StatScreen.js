import React, { Component } from "react";
import {
  FlatList,
  StyleSheet,
  View,
  Text,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { SafeAreaView } from "react-navigation";
import { BlurView } from "@react-native-community/blur";
import statsService from "../services/stats";
import { colors } from "../styles/common.style";
import { teacherSet } from "../actions/teacherActions";
import { courseSet } from "../actions/courseActions";

import StatView from "../components/StatView";

class StatScreen extends Component {
  static navigationOptions = {
    title: "Stat",
  };

  constructor(props) {
    super(props);
    this.state = {
      fetchingRankedStats: true,
      rankedStats: [],
    };
    this._onPress = this._onPress.bind(this);
  }

  async componentDidMount() {
    const { navigation } = this.props;
    const stat = navigation.getParam("stat");
    const { url } = stat;
    const rankedStats = await statsService.getStat(url);
    this.setState(prev => ({
      fetchingRankedStats: !prev.fetchingRankedStats,
      rankedStats,
    }));
  }

  _renderItem = ({ item, index }) => {
    return <StatView item={item} index={index} onPress={this._onPress} />;
  };

  _keyExtractor = item => `${item.id}`;

  _renderSeparator = () => (
    <View
      style={{
        height: 1,
        width: "100%",
        backgroundColor: colors.lightgray,
      }}
    />
  );

  _onPress(item) {
    const {
      navigation: { navigate, getParam },
      dispatch,
    } = this.props;
    const { id } = getParam("stat");

    switch (id) {
      case "top-teachers":
        dispatch(teacherSet(item));
        navigate("Teacher");
        break;
      default:
        dispatch(courseSet(item));
        navigate("Course");
        break;
    }
  }

  render() {
    const { navigation } = this.props;
    const stat = navigation.getParam("stat");
    const { title, subtitle, id, description } = stat;
    const { fetchingRankedStats, rankedStats } = this.state;
    return (
      <SafeAreaView style={styles.container}>
        <ScrollView>
          <View style={{ flex: 1 }}>
            <View style={{ flex: 1 }}>
              <View
                style={{
                  zIndex: 1001,
                }}
              >
                <BlurView
                  blurType="light"
                  blurAmount={50}
                  style={{
                    position: "absolute",
                    left: 0,
                    right: 0,
                    bottom: 0,
                    top: 0,
                  }}
                />
                <Text
                  style={{
                    paddingHorizontal: 20,
                    paddingTop: 20,
                    fontWeight: "700",
                    fontSize: 14,
                    zIndex: 1,
                    color: "gray",
                    textTransform: "uppercase",
                  }}
                >
                  {title}
                </Text>
                <Text
                  style={{
                    paddingHorizontal: 20,
                    paddingBottom: 20,
                    fontWeight: "700",
                    fontSize: 22,
                  }}
                >
                  {subtitle}
                </Text>
              </View>
            </View>
            <View
              style={{
                flex: 1,
                backgroundColor: "white",
              }}
            >
              {!fetchingRankedStats && (
                <Text style={styles.description}>{description}</Text>
              )}
              {fetchingRankedStats ? (
                <ActivityIndicator size="large" />
              ) : (
                <FlatList
                  style={styles.container}
                  data={rankedStats}
                  renderItem={this._renderItem}
                  keyExtractor={this._keyExtractor}
                  ItemSeparatorComponent={this._renderSeparator}
                />
              )}
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }
}

StatScreen.propTypes = {
  url: PropTypes.string,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: { flex: 1 },
  description: {
    fontSize: 18,
    color: "gray",
    paddingHorizontal: 20,
  },
});

export default connect()(StatScreen);
