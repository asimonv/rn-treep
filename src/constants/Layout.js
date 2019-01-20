import { Dimensions } from 'react-native';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

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
