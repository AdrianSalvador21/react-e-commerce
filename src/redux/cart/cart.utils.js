
export const addItemToCart = (cartItems, cartItemToAdd) => {
  // find function returns the fist item of the array that meets the condition
  const existingCartItem = cartItems.find(
    cartItem => cartItem.id === cartItemToAdd.id
  );

  // if exist the item, will add to the quantity property +1
  if (existingCartItem) {
    return cartItems.map(cartItem =>
      cartItem.id === cartItemToAdd.id
        ? { ...cartItem, quantity: cartItem.quantity + 1 }
        : cartItem
    );
  }

  // if not exist, create a new array
  return [...cartItems, { ...cartItemToAdd, quantity: 1 }];
};
