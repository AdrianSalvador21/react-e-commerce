import { UserActionTypes } from './user.types';

const INITIAL_STATE = {
  currentUser: null
};

const userReducer = (state = INITIAL_STATE, action) => {
  // type is a string
  switch (action.type) {
    case UserActionTypes.SET_CURRENT_USER:
      // return a new state
      return {
        ...state,
        currentUser: action.payload
      };
    default:
      // always we neeed a default state
      return state;
  }
};

export default userReducer;
