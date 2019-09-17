import { Dimensions } from 'react-native';

const { width } = Dimensions.get('window');
const { height } = Dimensions.get('window');

export default {
  window: {
    width,
    height,
  },
  container: {
    margin: 10,
    borderRadius: 5,
  },
  isSmallDevice: width < 375,
};
