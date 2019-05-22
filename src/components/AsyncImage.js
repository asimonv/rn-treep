import React from "react";
import { View, StyleSheet, Animated, ActivityIndicator } from "react-native";

const styles = StyleSheet.create({
  imageOverlay: {
    flex: 1,
    width: undefined,
    height: undefined
  },
  container: {
    justifyContent: "center",
    backgroundColor: "lightgray"
  },
  icon: {
    ...StyleSheet.absoluteFillObject,
    alignSelf: "flex-end",
    marginTop: -5,
    zIndex: 1001,
    position: "absolute"
  },
  spinnerStyle: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: "center",
    justifyContent: "center"
  }
});

class AsyncImage extends React.Component {
  imageAnimated = new Animated.Value(0);

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
    const { style, url } = this.props;
    return (
      <View
        style={StyleSheet.flatten([
          style,
          styles.container,
          image,
          imageContainer
        ])}
      >
        <View style={styles.spinnerStyle}>
          <ActivityIndicator
            hidesWhenStopped
            ref={spinner => (this.spinner = spinner)}
            size="small"
            color="gray"
          />
        </View>
        <Animated.Image
          source={{ uri: url, cache: "force-cache" }}
          style={[styles.imageOverlay, { opacity: this.imageAnimated }, style]}
          onLoad={this.onImageLoad}
        />
      </View>
    );
  }
}

export default AsyncImage;
