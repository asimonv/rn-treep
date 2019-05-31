import React, { Component } from "react";
import {
  TouchableWithoutFeedback,
  StatusBar,
  StyleSheet,
  View,
  Text,
  ScrollView
} from "react-native";
import { Transition } from "react-navigation-fluid-transitions";
import PropTypes from "prop-types";
import styled from "styled-components";
import { SafeAreaView } from "react-navigation";
import statsService from "../services/stats";
import Layout from "../styles/Layout";
import { BlurView } from "@react-native-community/blur";

import { BORDER_RADIUS } from "../styles/common.style";
import Card from "../components/Card";
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

class StatScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fetchingStat: true,
      stats: []
    };
  }

  async componentDidMount() {
    StatusBar.setHidden(true, "slide");
    const { navigation } = this.props;
    const stat = navigation.getParam("stat");
    if (stat) {
      const { url } = stat;
      const stats = await statsService.getStat(url);
      this.setState(prev => ({ stats, fetchingStat: !prev.fetchingStat }));
    }
  }

  componentWillUnmount() {
    StatusBar.setHidden(false, "slide");
  }

  render() {
    const { fetchingStat, stats } = this.state;
    const { navigation } = this.props;
    const stat = navigation.getParam("stat");
    const { image, title, subtitle } = stat;
    return (
      <SafeAreaView style={styles.container} forceInset={{ top: "never" }}>
        <ScrollView bounces={false}>
          <TouchableWithoutFeedback onPress={() => navigation.goBack()}>
            <View style={{ flex: 1 }}>
              <Transition shared="circle">
                <View style={{ flex: 1, minHeight: 450 }}>
                  {image && <AsyncImage style={styles.image} url={image} />}
                  <View
                    style={{
                      position: "absolute",
                      left: 0,
                      right: 0,
                      bottom: 0,
                      zIndex: 1001
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
                </View>
              </Transition>
              <Transition appear="vertical" delay>
                <View
                  style={{
                    flex: 1,
                    backgroundColor: "white",
                    padding: 20
                  }}
                >
                  <Text>
                    {
                      "Text vertical center alignment summary Case 1: There is only one Text under View Ios: Use flex with alignItems/justifyContent to be more centered, Adr: height = lineHeight, includeFontPadding: false more centered Case 2: There are two Texts in a line view and the two Text fonts are different, and the Text with a smaller font size does not need to use the height. The larger one is aligned using the above method. The smaller one can only be used with font-size, but not with the line-height and height attributes. In this case, both texts can be centered. Case 3: There are two Texts in a line view and the two Text fonts are different, and the Text with a smaller font size must use the height. The one with the larger font size is aligned using the above method, and the smaller font size uses height with padding and includeFontPadding to achieve alignment. The larger one is aligned using the above method. The smaller one can only be used with font-size, but not with the line-height and height attributes. In this case, both texts can be centered. Case 3: There are two Texts in a line view and the two Text fonts are different, and the Text with a smaller font size must use the height. The one with the larger font size is aligned using the above method, and the smaller font size uses height with padding and includeFontPadding to achieve alignment. The larger one is aligned using the above method. The smaller one can only be used with font-size, but not with the line-height and height attributes. In this case, both texts can be centered. Case 3: There are two Texts in a line view and the two Text fonts are different, and the Text with a smaller font size must use the height. The one with the larger font size is aligned using the above method, and the smaller font size uses height with padding and includeFontPadding to achieve alignment. The larger one is aligned using the above method. The smaller one can only be used with font-size, but not with the line-height and height attributes. In this case, both texts can be centered. Case 3: There are two Texts in a line view and the two Text fonts are different, and the Text with a smaller font size must use the height. The one with the larger font size is aligned using the above method, and the smaller font size uses height with padding and includeFontPadding to achieve alignment."
                    }
                  </Text>
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
  url: PropTypes.string
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  image: { flex: 1 }
});

export default StatScreen;
