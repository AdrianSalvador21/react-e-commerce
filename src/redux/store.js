import { createStore, applyMiddleware } from 'redux';
import logger from 'redux-logger';
// logger is somethin that is nice for us to use when
// debuggin out redux code

import rootReducer from './root-reducer';

const middlewares = [logger];

const store = createStore(rootReducer, applyMiddleware(...middlewares));

export default store;
