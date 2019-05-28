import React from "react";
import { View, StyleSheet } from "react-native";
import FastImage from "react-native-fast-image";

const styles = StyleSheet.create({
  imageOverlay: {
    flex: 1,
    width: "100%",
    height: "100%",
    position: "absolute"
  },
  container: {
    justifyContent: "center",
    backgroundColor: "lightgray"
  },
  spinnerStyle: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: "center",
    justifyContent: "center",
    zIndex: -1000
  }
});

class AsyncImage extends React.Component {
  constructor(props) {
    super(props);
    this.onImageLoad = this.onImageLoad.bind(this);
  }

  onImageLoad = () => {
    Animated.timing(this.imageAnimated, {
      toValue: 1
    }).start();
    this.spinner.animating = false;
  };

  render() {
    const size = this.props.headerType == "vertical" ? 60 : 30;
    const image = {
      width: size,
      height: size
    };
    const imageContainer = {
      overflow: "hidden",
      width: size,
      height: size,
      borderRadius: size / 2,
      marginRight: 5,
      borderWidth: 2,
      borderColor: "lightgray"
    };
    const { style, url, headerType, resizeMode } = this.props;
    const containerStyle = headerType
      ? StyleSheet.flatten([style, styles.container, image, imageContainer])
      : { ...style };
    return (
      <View style={containerStyle}>
        <FastImage
          style={[styles.imageOverlay, style]}
          source={{
            uri: url,
            priority: FastImage.priority.normal
          }}
          resizeMode={FastImage.resizeMode.cover}
        />
      </View>
    );
  }
}

export default AsyncImage;
