import React from 'react';
import { Alert, Button, FlatList, Linking, SafeAreaView, StyleSheet, View } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { connect } from 'react-redux';
import ListItem from '../components/ListItem';
import Loader from '../components/Loader';
import settingsOptions from '../data/settingsOptions';
import { logoutUser } from '../actions/authActions';
import { colors } from '../styles/common.style';

class SettingsScreen extends React.Component {
  static navigationOptions = {
    title: 'Settings',
    headerRight: (
      <Button
        onPress={() =>
          Alert.alert('In memoriam of María Paz Aldunate Anfossi & Ricardo Aldana Rameau')
        }
        title="🕊"
      />
    ),
  };

  state = {
    loading: false,
  };

  _keyExtractor = item => item.key;

  _renderItem = ({ item }) => <ListItem onPress={this._onPress} item={item} />;

  _renderSeparator = () => (
    <View
      style={{
        height: 1,
        width: '100%',
        backgroundColor: colors.lightgray,
      }}
    />
  );

  _logout = () => {
    this.setState(prev => ({ loading: !prev.loading }));
    this.props.dispatch(logoutUser());
  };

  _showAlert = () => {
    Alert.alert(
      'Log out',
      'Are you sure you want to log out? 😮',
      [
        {
          text: 'Yes',
          onPress: () => {
            this._logout();
          },
        },
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'destructive',
        },
      ],
      { cancelable: false }
    );
  };

  async componentDidUpdate(prevProps, prevState) {
    const {
      auth: { user },
    } = this.props;
    const {
      auth: { user: prevUser },
    } = prevProps;
    if (prevUser !== user) {
      const {
        navigation: { navigate },
      } = this.props;
      try {
        await AsyncStorage.removeItem('user');
        navigate('Auth');
      } catch (e) {
        console.log(e);
      }
    }
  }

  _onPress = (e, item) => {
    const { item: selectedItem } = item;
    switch (selectedItem.id) {
      case 0: //  votes
        break;
      case 1: //  logout
        this._showAlert();
        break;
      case 2: //  about
        Linking.openURL('https://asimonv.github.io/react-me/');
        break;
      default:
        break;
    }
  };

  render() {
    /* Go ahead and delete ExpoConfigView and replace it with your
     * content, we just wanted to give you a quick view of your config */
    return (
      <SafeAreaView style={styles.container}>
        <Loader loading={this.state.loading} title="Logging you out..." />
        <FlatList
          style={styles.container}
          data={settingsOptions}
          keyExtractor={this._keyExtractor}
          renderItem={this._renderItem}
          ItemSeparatorComponent={this._renderSeparator}
        />
      </SafeAreaView>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default connect(mapStateToProps)(SettingsScreen);
