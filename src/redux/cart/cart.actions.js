import CartActionTypes from './cart.types';


// payload is optional, if we don't use it in reducer
export const toggleCartHidden = () => ({
  type: CartActionTypes.TOGGLE_CART_HIDDEN
});

// item its the payload that the function need
export const addItem = item => ({
  type: CartActionTypes.ADD_ITEM,
  payload: item
});
