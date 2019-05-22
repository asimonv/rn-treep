import React from "react";
import PropTypes from "prop-types";

import { StyleSheet, Text, View, TouchableOpacity } from "react-native";

import Icon from "react-native-vector-icons/FontAwesome";
import { colors, BORDER_RADIUS } from "../styles/common.style";

const size = 30;

export default function ListItem(props) {
  const { item } = props;
  return (
    <TouchableOpacity
      style={styles.button}
      disabled={item.disabled}
      onPress={e => props.onPress(e, props)}
    >
      <View style={{ flex: 1, flexDirection: "row", alignItems: "center" }}>
        {item.icon && (
          <View
            style={[
              styles.iconWrapper,
              { backgroundColor: item.color || "white" }
            ]}
          >
            <Icon style={styles.icon} size={size - 10} name={item.icon} />
          </View>
        )}
        <View style={{ flex: 1, flexDirection: "column" }}>
          <Text style={styles.title}>{item.key}</Text>
          {item.description && (
            <Text style={styles.subtitle}>{item.description}</Text>
          )}
        </View>
        {props.showChevron && (
          <Icon
            style={styles.chevron}
            name="angle-right"
            size={24}
            color={colors.lightgray}
          />
        )}
      </View>
    </TouchableOpacity>
  );
}

ListItem.defaultProps = {
  onPress: undefined,
  showChevron: undefined
};

ListItem.propTypes = {
  onPress: PropTypes.func,
  showChevron: PropTypes.bool
};

const styles = StyleSheet.create({
  button: {
    padding: 10,
    flex: 1,
    flexDirection: "row",
    alignItems: "flex-start"
  },
  subtitle: {
    fontSize: 14,
    color: colors.gray
  },
  title: {
    fontSize: 16,
    color: colors.black
  },
  chevron: {
    marginLeft: 10
  },
  icon: {
    color: "white",
    flex: 1,
    margin: 5
  },
  iconWrapper: {
    marginRight: 10,
    width: size,
    height: size,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: BORDER_RADIUS
  },
  innerIcon: {
    padding: 5
  }
});
