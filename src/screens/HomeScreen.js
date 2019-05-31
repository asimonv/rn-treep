import React from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  View,
  TouchableWithoutFeedback
} from "react-native";
import { SafeAreaView } from "react-navigation";
import styled from "styled-components";
import { connect } from "react-redux";
import AnimatedEllipsis from "react-native-animated-ellipsis";
import { BlurView } from "@react-native-community/blur";
import { getUserVotes } from "../actions/userActions";
import statsService from "../services/stats";
import Layout from "../styles/Layout";
import { BORDER_RADIUS } from "../styles/common.style";
import Card from "../components/Card";
import { Transition } from "react-navigation-fluid-transitions";
import FastImage from "react-native-fast-image";

import AsyncImage from "../components/AsyncImage";

const BorderedView = styled.View`
  border-radius: ${props => {
    if (props.flat) {
      return 0;
    }
    return BORDER_RADIUS * 3;
  }};
  overflow: hidden;
`;

const ShadowView = styled.View`
  box-shadow: ${props => {
    if (props.flat) {
      return "none";
    }
    return "0px 1px 3px rgba(0,0,0,0.2)";
  }};
`;

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
    const { title, subtitle, image, id } = item;
    return (
      <TouchableWithoutFeedback onPress={() => this._onPressStat(item)}>
        <View
          style={{
            margin: 20,
            height: 450
          }}
        >
          <Transition shared={`circle-${id}`}>
            <View
              style={{
                flex: 1,
                borderRadius: 30
              }}
            >
              <View
                style={{
                  position: "absolute",
                  left: 0,
                  right: 0,
                  bottom: 0,
                  zIndex: 1001,
                  borderTopLeftRadius: 30,
                  borderTopRightRadius: 30
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
                    top: 0
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
                    textTransform: "uppercase"
                  }}
                >
                  {title}
                </Text>
                <Text
                  style={{
                    paddingHorizontal: 20,
                    paddingBottom: 20,
                    fontWeight: "700",
                    fontSize: 22
                  }}
                >
                  {subtitle}
                </Text>
              </View>
              {image && (
                <AsyncImage
                  style={styles.image}
                  url={image}
                  resizeMode={FastImage.resizeMode.cover}
                />
              )}
            </View>
          </Transition>
        </View>
      </TouchableWithoutFeedback>
    );
  }

  _keyExtractor = (item, index) => `${index}`;

  async componentDidMount() {
    const { dispatch } = this.props;
    this.props.dispatch(getUserVotes());
    await this._fetchStats();
  }

  render() {
    const { stats } = this.state;
    return (
      <SafeAreaView style={styles.container}>
        {!stats ? (
          <Text>Loading...</Text>
        ) : (
          <FlatList
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
    flex: 1
  },
  image: { flex: 1 }
});

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps)(HomeScreen);
