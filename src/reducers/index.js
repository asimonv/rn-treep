import { combineReducers } from 'redux';
import AsyncStorage from '@react-native-community/async-storage';
import { persistReducer } from 'redux-persist';

import auth from './authReducer';
import course from './courseReducer';
import teacher from './teacherReducer';
import user from './userReducer';

const authPersistConfig = {
  key: 'auth',
  storage: AsyncStorage,
  whitelist: ['user'],
};

export default combineReducers({
  auth: persistReducer(authPersistConfig, auth),
  course,
  teacher,
  user,
});
