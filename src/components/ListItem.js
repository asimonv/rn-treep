import React from 'react';
import PropTypes from 'prop-types';

import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { useSpring, animated } from 'react-spring';
import Icon from 'react-native-vector-icons/FontAwesome';
import { colors, BORDER_RADIUS } from '../styles/common.style';

const size = 30;
const AnimatedView = animated(View);

export default function ListItem(props) {
  const {
    item: { title, disabled, icon, description, animate, color },
    showChevron,
    showOptions,
    onPress,
    onPressOptions,
    item,
  } = props;

  const fading = useSpring({
    config: { duration: 1500 },
    to: [{ backgroundColor: '#e4f1fe' }, { backgroundColor: 'white' }],
    from: { backgroundColor: 'white' },
  });

  const handleOnPress = x => {
    if (onPress) {
      onPress(x);
    }
  };

  const handleOnPressOptions = x => {
    if (onPressOptions) {
      onPressOptions(x);
    }
  };

  return (
    <TouchableOpacity style={styles.button} disabled={disabled} onPress={() => handleOnPress(item)}>
      <AnimatedView
        style={[
          { flex: 1, flexDirection: 'row', alignItems: 'center', padding: 10 },
          animate ? { ...fading } : {},
        ]}
      >
        {icon && (
          <View style={[styles.iconWrapper, { backgroundColor: color || 'white' }]}>
            <Icon style={styles.icon} size={size - 10} name={icon} />
          </View>
        )}
        <View style={{ flex: 1, flexDirection: 'column' }}>
          <Text style={styles.title}>{title}</Text>
          {description && <Text style={styles.subtitle}>{description}</Text>}
        </View>
        {showChevron && (
          <Icon style={styles.chevron} name="angle-right" size={24} color={colors.lightgray} />
        )}
        {showOptions && (
          <Icon
            onPress={() => handleOnPressOptions(item)}
            style={styles.chevron}
            name="ellipsis-h"
            size={24}
            color={colors.lightgray}
          />
        )}
      </AnimatedView>
    </TouchableOpacity>
  );
}

ListItem.defaultProps = {
  onPress: undefined,
  onPressOptions: undefined,
  showChevron: undefined,
  showOptions: false,
};

ListItem.propTypes = {
  onPress: PropTypes.func,
  showChevron: PropTypes.bool,
  showOptions: PropTypes.bool,
  onPressOptions: PropTypes.func,
};

const styles = StyleSheet.create({
  button: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  subtitle: {
    fontSize: 14,
    marginTop: 8,
    color: colors.gray,
  },
  title: {
    fontSize: 16,
    color: colors.black,
  },
  chevron: {
    marginLeft: 10,
  },
  icon: {
    color: 'white',
    flex: 1,
    margin: 5,
  },
  iconWrapper: {
    marginRight: 10,
    width: size,
    height: size,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: BORDER_RADIUS,
  },
  innerIcon: {
    padding: 5,
  },
});
