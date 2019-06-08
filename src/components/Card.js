import React, { Component } from "react";
import {
  Animated,
  FlatList,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View
} from "react-native";
import { Transition } from "react-navigation-fluid-transitions";
import { BlurView } from "@react-native-community/blur";
import AnimatedEllipsis from "react-native-animated-ellipsis";
import PropTypes from "prop-types";
import styled from "styled-components";
import { BORDER_RADIUS, colors } from "../styles/common.style";
import Layout from "../styles/Layout";
import AsyncImage from "./AsyncImage";
import ShadowView from "./ShadowView";
import StatView from "./StatView";

const BorderedView = styled.View`
  flex: 1;
  border-radius: ${props => {
    if (props.flat) {
      return 0;
    }
    return BORDER_RADIUS * 3;
  }};
  overflow: hidden;
`;

class Card extends Component {
  constructor(props) {
    super(props);
    this._handlePressIn = this._handlePressIn.bind(this);
    this._handlePressOut = this._handlePressOut.bind(this);
    this.animatedValue = new Animated.Value(1);
  }

  _handlePressIn() {
    Animated.spring(this.animatedValue, {
      toValue: 0.98
    }).start();
  }

  _handlePressOut() {
    Animated.spring(this.animatedValue, {
      toValue: 1,
      friction: 7,
      tension: 40
    }).start();
  }

  _onPress(item) {
    console.log(item);
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
        backgroundColor: colors.lightgray
      }}
    />
  );

  render() {
    const {
      item,
      style,
      onPress,
      flat,
      headerStyle,
      stats,
      fetching
    } = this.props;
    const { title, subtitle, image } = item;
    return (
      <TouchableWithoutFeedback onPress={() => onPress(item)} disabled={!!flat}>
        <ShadowView>
          <Transition shared="circle">
            <BorderedView flat={flat}>
              <BorderedView flat={flat}>
                <View
                  style={{
                    ...styles.header,
                    minHeight: 450,
                    flex: 1
                  }}
                >
                  <View
                    style={{
                      padding: Layout.container.margin * 2,
                      ...headerStyle
                    }}
                  >
                    {title && <Text style={styles.title}>{title}</Text>}
                    {subtitle && (
                      <Text style={styles.subtitle}>{subtitle}</Text>
                    )}
                    <BlurView
                      blurType="light"
                      blurAmount={50}
                      style={styles.blurView}
                    />
                  </View>
                  {image && <AsyncImage style={styles.image} url={image} />}
                </View>
                {fetching ? (
                  <Text style={{ marginHorizontal: Layout.container.margin }}>
                    Loading <AnimatedEllipsis />
                  </Text>
                ) : stats ? (
                  <View style={{ backgroundColor: "white" }}>
                    <Text style={styles.description}>{item.description}</Text>
                    <FlatList
                      style={styles.container}
                      data={stats}
                      renderItem={this._renderItem}
                      keyExtractor={this._keyExtractor}
                      ItemSeparatorComponent={this._renderSeparator}
                    />
                  </View>
                ) : null}
              </BorderedView>
            </BorderedView>
          </Transition>
        </ShadowView>
      </TouchableWithoutFeedback>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  header: {
    zIndex: 1
  },
  blurView: {
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    zIndex: 0,
    position: "absolute"
  },
  title: {
    fontWeight: "700",
    fontSize: 14,
    zIndex: 1,
    color: "gray",
    textTransform: "uppercase"
  },
  subtitle: {
    fontWeight: "700",
    fontSize: 22,
    zIndex: 1
  },
  image: {
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    zIndex: -1,
    backgroundColor: "lightgray"
  },
  description: {
    fontSize: 18,
    color: "gray",
    padding: 20
  }
});

Card.propTypes = {
  title: PropTypes.string,
  subtitle: PropTypes.string,
  url: PropTypes.string,
  image: PropTypes.string,
  onPress: PropTypes.func
};

export default Card;
