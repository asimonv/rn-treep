import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import _ from "lodash";

import LinearGradient from "react-native-linear-gradient";
import { cardType } from "../constants/enums";
import { BORDER_RADIUS } from "../styles/common.style";
import Layout from "../styles/Layout";
import ShadowView from "./ShadowView";

export default function StatCard(props) {
  var colors;
  const { stat, onPress, style, cardType: type } = props;
  switch (type) {
    case cardType.PRIMARY:
      colors = ["#37A6FA", "#0058E6"];
      break;
    default:
      colors = ["#03C9A9", "#01AF95"];
  }
  const votesMessage = stat.votes === 1 ? "vote" : "votes";
  return (
    <TouchableOpacity onPress={() => onPress(stat)}>
      <ShadowView>
        <LinearGradient colors={colors} style={[style, styles.container]}>
          <View
            style={{
              flex: 1,
              flexDirection: "row",
              justifyContent: "space-between"
            }}
          >
            <View style={{ flexDirection: "column", justifyContent: "center" }}>
              <Text style={styles.statTitle}>{_.capitalize(stat.title)}</Text>
              {stat.voted && (
                <View
                  style={{
                    flexDirection: "row",
                    alignSelf: "flex-start",
                    ...styles.label,
                    marginTop: 3
                  }}
                >
                  <Text style={styles.subtitle}>{`${stat.voted.value}`}</Text>
                </View>
              )}
            </View>
            <View style={{ flexDirection: "column" }}>
              <Text style={styles.statValue}>{stat.value}</Text>
              <Text style={{ ...styles.subtitle, textAlign: "right" }}>
                {stat.votes} {votesMessage}
              </Text>
            </View>
          </View>
        </LinearGradient>
      </ShadowView>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "blue",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: Layout.container.margin * 2,
    paddingVertical: Layout.container.margin,
    alignItems: "center",
    borderRadius: BORDER_RADIUS
  },
  statTitle: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold"
  },
  statValue: {
    color: "white",
    fontSize: 40,
    textAlign: "right"
  },
  subtitle: {
    color: "white",
    fontWeight: "600"
  },
  label: {
    paddingHorizontal: 5,
    paddingVertical: 2.5,
    backgroundColor: "rgba(52, 52, 52, 0.2)",
    borderRadius: 5
  }
});
