import React from 'react';
import {
  FlatList,
  RefreshControl,
  StyleSheet,
  Text,
  View,
  TouchableWithoutFeedback,
} from 'react-native';
import { SafeAreaView } from 'react-navigation';
import { connect } from 'react-redux';
import { BlurView } from '@react-native-community/blur';
import { Transition } from 'react-navigation-fluid-transitions';
import FastImage from 'react-native-fast-image';
import { getUserVotes } from '../actions/userActions';
import statsService from '../services/stats';
import Layout from '../styles/Layout';

import AsyncImage from '../components/AsyncImage';
import Message from '../components/Message';

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

  async _fetchStats() {
    const stats = await statsService.getStats();
    this.setState(prev => ({ stats, fetchingStats: !prev.fetchingStats }));
  }

  _onPressStat(stat) {
    const {
      navigation: { navigate },
    } = this.props;
    navigate('StatScreen', { stat });
  }

  _renderItem({ item }) {
    const { title, subtitle, image, id, statType } = item;
    return statType == 0 ? (
      <TouchableWithoutFeedback onPress={() => this._onPressStat(item)}>
        <View
          style={{
            margin: 20,
            height: 450,
          }}
        >
          <Transition shared={`circle-${id}`}>
            <View
              style={{
                flex: 1,
                borderRadius: 30,
              }}
            >
              <View
                style={{
                  position: 'absolute',
                  left: 0,
                  right: 0,
                  bottom: 0,
                  zIndex: 1001,
                  borderTopLeftRadius: 30,
                  borderTopRightRadius: 30,
                }}
              >
                <BlurView
                  blurType="light"
                  blurAmount={50}
                  style={{
                    position: 'absolute',
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
                    fontWeight: '700',
                    fontSize: 14,
                    zIndex: 1,
                    color: 'gray',
                    textTransform: 'uppercase',
                  }}
                >
                  {title}
                </Text>
                <Text
                  style={{
                    paddingHorizontal: 20,
                    paddingBottom: 20,
                    fontWeight: '700',
                    fontSize: 22,
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
    ) : (
      <Message title={title} style={{ margin: 20 }} />
    );
  }

  _keyExtractor = (item, index) => `${index}`;

  _onRefresh = async () => {
    this.setState(prev => ({ fetchingStats: !prev.fetchingStats }));
    await this._fetchStats();
  };

  async componentDidMount() {
    const { dispatch } = this.props;
    this.props.dispatch(getUserVotes());
    await this._fetchStats();
  }

  render() {
    const { stats, fetchingStats } = this.state;
    return (
      <SafeAreaView style={styles.container}>
        {!stats ? (
          <Text style={{ marginHorizontal: Layout.container.margin }}>Loading...</Text>
        ) : (
          <FlatList
            data={stats}
            renderItem={this._renderItem}
            keyExtractor={this._keyExtractor}
            refreshControl={
              <RefreshControl refreshing={fetchingStats} onRefresh={this._onRefresh} />
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
