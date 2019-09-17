import React from 'react';
import PropTypes from 'prop-types';

import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { useSpring, animated } from 'react-spring';
import Icon from 'react-native-vector-icons/FontAwesome';
import { colors, BORDER_RADIUS } from '../styles/common.style';

const size = 30;
const AnimatedView = animated(View);

export default function ListItem(props) {
  const { item } = props;
  const { animate } = item;

  const fading = useSpring({
    config: { duration: 1500 },
    to: [{ backgroundColor: '#e4f1fe' }, { backgroundColor: 'white' }],
    from: { backgroundColor: 'white' },
  });

  return (
    <TouchableOpacity
      style={styles.button}
      disabled={item.disabled}
      onPress={e => props.onPress(e, props)}
    >
      <AnimatedView
        style={[
          { flex: 1, flexDirection: 'row', alignItems: 'center', padding: 10 },
          animate ? { ...fading } : {},
        ]}
      >
        {item.icon && (
          <View style={[styles.iconWrapper, { backgroundColor: item.color || 'white' }]}>
            <Icon style={styles.icon} size={size - 10} name={item.icon} />
          </View>
        )}
        <View style={{ flex: 1, flexDirection: 'column' }}>
          <Text style={styles.title}>{item.title}</Text>
          {item.description && <Text style={styles.subtitle}>{item.description}</Text>}
        </View>
        {props.showChevron && (
          <Icon style={styles.chevron} name="angle-right" size={24} color={colors.lightgray} />
        )}
      </AnimatedView>
    </TouchableOpacity>
  );
}

ListItem.defaultProps = {
  onPress: undefined,
  showChevron: undefined,
};

ListItem.propTypes = {
  onPress: PropTypes.func,
  showChevron: PropTypes.bool,
};

const styles = StyleSheet.create({
  button: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  subtitle: {
    fontSize: 14,
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
