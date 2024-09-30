import {TOGGLE_WISHLIST} from '../actions';

const wishlistReducer = (state = [], action) => {
  switch (action.type) {
    case TOGGLE_WISHLIST:
      const existingItem = state.find(item => item.id === action.payload.id);

      if (existingItem) {
        return state.filter(item => item.id !== action.payload.id);
      } else {
        return [...state, {...action.payload}];
      }

    default:
      return state;
  }
};

export default wishlistReducer;
