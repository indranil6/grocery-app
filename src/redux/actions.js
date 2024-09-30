export const ADD_TO_CART = 'ADD_TO_CART';
export const REMOVE_FROM_CART = 'REMOVE_FROM_CART';
export const INCREMENT_QUANTITY = 'INCREMENT_QUANTITY';
export const DECREMENT_QUANTITY = 'DECREMENT_QUANTITY';
export const TOGGLE_WISHLIST = 'TOGGLE_WISHLIST';

export const addToCart = product => {
  return {
    type: ADD_TO_CART,
    payload: product,
  };
};

export const removeFromCart = id => {
  return {
    type: REMOVE_FROM_CART,
    payload: id,
  };
};

export const incrementQuantity = id => {
  return {
    type: INCREMENT_QUANTITY,
    payload: id,
  };
};

export const decrementQuantity = id => {
  return {
    type: DECREMENT_QUANTITY,
    payload: id,
  };
};
export const toggleWishlistSelection = payload => {
  return {
    type: TOGGLE_WISHLIST,
    payload: payload,
  };
};
