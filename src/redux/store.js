import { createStore, applyMiddleware } from 'redux';
import logger from 'redux-logger';
// logger is somethin that is nice for us to use when
// debuggin out redux code

import { persistStore } from 'redux-persist';

import rootReducer from './root-reducer';

const middlewares = [logger];

export const store = createStore(rootReducer, applyMiddleware(...middlewares));
export const persistor = persistStore(store);

export default {store, persistor};
