import React, { Component } from 'react';
import {
  FlatList,
  TouchableWithoutFeedback,
  StatusBar,
  StyleSheet,
  View,
  Text,
  ScrollView,
} from 'react-native';
import { Transition } from 'react-navigation-fluid-transitions';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { SafeAreaView } from 'react-navigation';
import { BlurView } from '@react-native-community/blur';
import statsService from '../services/stats';
import { colors } from '../styles/common.style';
import Layout from '../styles/Layout';
import { teacherSet } from '../actions/teacherActions';

import StatView from '../components/StatView';
import AsyncImage from '../components/AsyncImage';

class StatScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fetchingRankedStats: true,
      rankedStats: [],
    };
    this._onPress = this._onPress.bind(this);
  }

  async componentDidMount() {
    StatusBar.setHidden(true, 'slide');
    const { navigation } = this.props;
    const stat = navigation.getParam('stat');
    const { url } = stat;
    const rankedStats = await statsService.getStat(url);
    this.setState(prev => ({
      fetchingRankedStats: !prev.fetchingRankedStats,
      rankedStats,
    }));
  }

  componentWillUnmount() {
    StatusBar.setHidden(false, 'slide');
  }

  _onPress(item) {
    this.props.dispatch(teacherSet(item));
    this.props.navigation.navigate('Teacher');
  }

  _renderItem = ({ item, index }) => {
    return <StatView item={item} index={index} onPress={this._onPress} />;
  };

  _keyExtractor = item => `${item.id}`;

  _renderSeparator = () => (
    <View
      style={{
        height: 1,
        width: '100%',
        backgroundColor: colors.lightgray,
      }}
    />
  );

  render() {
    const { navigation } = this.props;
    const stat = navigation.getParam('stat');
    const { image, title, subtitle, id, description } = stat;
    const { fetchingRankedStats, rankedStats } = this.state;
    return (
      <SafeAreaView style={styles.container} forceInset={{ top: 'never' }}>
        <ScrollView bounces={false}>
          <TouchableWithoutFeedback onPress={() => navigation.goBack()}>
            <View style={{ flex: 1 }}>
              <Transition shared={`circle-${id}`}>
                <View style={{ flex: 1, minHeight: 450 }}>
                  {image && <AsyncImage style={styles.image} url={image} />}
                  <View
                    style={{
                      position: 'absolute',
                      left: 0,
                      right: 0,
                      bottom: 0,
                      zIndex: 1001,
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
                </View>
              </Transition>
              <Transition appear="vertical" delay>
                <View
                  style={{
                    flex: 1,
                    backgroundColor: 'white',
                  }}
                >
                  {!fetchingRankedStats && <Text style={styles.description}>{description}</Text>}
                  {fetchingRankedStats ? (
                    <Text
                      style={{
                        marginHorizontal: Layout.container.margin,
                        padding: 20,
                      }}
                    >
                      Loading...
                    </Text>
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
              </Transition>
            </View>
          </TouchableWithoutFeedback>
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
    color: 'gray',
    padding: 20,
  },
});

export default connect()(StatScreen);
