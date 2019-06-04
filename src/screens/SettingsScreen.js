import React from "react";
import { Alert, FlatList, Linking, StyleSheet, View } from "react-native";
import AsyncStorage from "@react-native-community/async-storage";
import { connect } from "react-redux";
import ListItem from "../components/ListItem";
import settingsOptions from "../data/settingsOptions";
import { logoutUser } from "../actions/authActions";
import { colors } from "../styles/common.style";

class SettingsScreen extends React.Component {
  static navigationOptions = {
    title: "Settings"
  };

  _keyExtractor = item => item.key;

  _renderItem = ({ item }) => <ListItem onPress={this._onPress} item={item} />;

  _renderSeparator = () => (
    <View
      style={{
        height: 1,
        width: "100%",
        backgroundColor: colors.lightgray
      }}
    />
  );

  _logout = async () => {
    try {
      const {
        navigation: { navigate }
      } = this.props;
      await AsyncStorage.removeItem("user");
      this.props.dispatch(logoutUser());
      navigate("Auth");
    } catch (e) {
      console.log(e);
    }
  };

  _showAlert = () => {
    Alert.alert(
      "Log out",
      "Are you sure you want to log out? 😮",
      [
        {
          text: "Yes",
          onPress: async () => await this._logout()
        },
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "destructive"
        }
      ],
      { cancelable: false }
    );
  };

  _onPress = (e, item) => {
    const { item: selectedItem } = item;
    switch (selectedItem.id) {
      case 0: //  votes
        break;
      case 1: //  logout
        this._showAlert();
        break;
      case 2: //  about
        Linking.openURL("https://asimonv.github.io/rn-treep/");
        break;
      default:
        break;
    }
  };

  render() {
    /* Go ahead and delete ExpoConfigView and replace it with your
     * content, we just wanted to give you a quick view of your config */
    return (
      <FlatList
        style={styles.container}
        data={settingsOptions}
        keyExtractor={this._keyExtractor}
        renderItem={this._renderItem}
        ItemSeparatorComponent={this._renderSeparator}
      />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});

export default connect()(SettingsScreen);
