/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
import { ActivityIndicator, Platform, StatusBar, StyleSheet, View } from 'react-native';

import { InAppNotificationProvider } from 'react-native-in-app-notification';
import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from 'react-redux';
import Store from './store';

import AppNavigator from './navigation/AppNavigator';

const App = () => (
  <View style={styles.container}>
    {Platform.OS === 'ios' && <StatusBar barStyle="default" />}
    <Provider store={Store.store}>
      <PersistGate loading={<ActivityIndicator />} persistor={Store.persistor}>
        <InAppNotificationProvider>
          <AppNavigator />
        </InAppNotificationProvider>
      </PersistGate>
    </Provider>
  </View>
);

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  },
});
