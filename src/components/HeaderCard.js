import React from "react";
import { StyleSheet, Text, View } from "react-native";
import ReadMore from "react-native-read-more-text";
import { colors } from "../styles/common.style";
import AsyncImage from "./AsyncImage";

const _renderTruncatedFooter = handlePress => {
  return (
    <Text style={{ color: colors.moreInfo }} onPress={handlePress}>
      more
    </Text>
  );
};

const _renderRevealedFooter = handlePress => {
  return (
    <Text
      style={{ color: colors.moreInfo, marginTop: 5 }}
      onPress={handlePress}
    >
      less
    </Text>
  );
};

export default function HeaderCard(props) {
  const styles = StyleSheet.create({
    container: {
      marginTop: 10,
      marginBottom: 10
    },
    topContainer: {
      flexDirection: props.headerType == "vertical" ? "column" : "row",
      alignItems: "center"
    },
    title: {
      fontWeight: "600",
      fontSize: props.headerType == "vertical" ? 17 : 15
    }
  });

  return (
    <View style={styles.container}>
      <View style={styles.topContainer}>
        {props.url && <AsyncImage {...props} />}
        {props.headerType !== "vertical" && (
          <Text style={styles.title}>{props.title}</Text>
        )}
      </View>
      {props.description && (
        <ReadMore
          numberOfLines={3}
          renderTruncatedFooter={_renderTruncatedFooter}
          renderRevealedFooter={_renderRevealedFooter}
        >
          <Text>{props.description}</Text>
        </ReadMore>
      )}
    </View>
  );
}
