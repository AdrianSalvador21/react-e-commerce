import { combineReducers } from 'redux';

import userReducer from './user/user.reducer';

// combine all states in our app
export default combineReducers({
  user: userReducer
});
