import React from 'react';
import { ActivityIndicator, Modal, StyleSheet, Text, View } from 'react-native';
import PropTypes from 'prop-types';
import { BORDER_RADIUS } from '../styles/common.style';
import Layout from '../styles/Layout';

const Loader = props => {
  const { loading, title } = props;

  return (
    <Modal
      transparent
      animationType="fade"
      visible={loading}
      onRequestClose={() => {
        console.log('close modal');
      }}
    >
      <View style={styles.modalBackground}>
        <View style={styles.activityIndicatorWrapper}>
          <ActivityIndicator animating={loading} />
          {title && <Text style={styles.title}>{title}</Text>}
        </View>
      </View>
    </Modal>
  );
};

Loader.defaultProps = {
  loading: false,
  title: null,
};

Loader.propTypes = {
  loading: PropTypes.bool,
  title: PropTypes.string,
};

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'space-around',
    backgroundColor: '#00000040',
  },
  activityIndicatorWrapper: {
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    borderRadius: BORDER_RADIUS * 3,
    paddingHorizontal: Layout.container.margin * 2,
    paddingVertical: Layout.container.margin * 1.5,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  title: {
    fontWeight: '600',
    marginLeft: 10,
    fontSize: 16,
  },
});

export default Loader;
