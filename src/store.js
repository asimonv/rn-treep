import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger';
import { persistStore, persistReducer } from 'redux-persist';
import AsyncStorage from '@react-native-community/async-storage';
import reducers from './reducers';

const middleware = applyMiddleware(thunk, createLogger());

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['auth'],
  blacklist: ['auth'],
  debug: true,
};

const persistedReducer = persistReducer(persistConfig, reducers);
const store = createStore(persistedReducer, middleware);
const persistor = persistStore(store);

//  persistor.purge();

export default { store, persistor };
