import React from 'react';
import { StyleSheet, View } from 'react-native';

import { CachedImage } from 'react-native-cached-image';

export default function CircularImage(props) {
  const size = props.headerType == 'vertical' ? 60 : 30;
  const styles = StyleSheet.create({
    image: {
      width: size,
      height: size,
    },
    imageContainer: {
      overflow: 'hidden',
      width: size,
      height: size,
      borderRadius: size / 2,
      marginRight: 5,
      borderWidth: 2,
      borderColor: 'lightgray',
    },
  });

  return (
    <View style={styles.imageContainer}>
      <CachedImage style={styles.image} source={{ uri: props.imageURL }} useQueryParamsInCacheKey />
    </View>
  );
}
