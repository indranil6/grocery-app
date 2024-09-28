import {
  ADD_TO_CART,
  REMOVE_FROM_CART,
  INCREMENT_QUANTITY,
  DECREMENT_QUANTITY,
} from '../actions';

const initialState = {
  items: [],
};

const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      const existingItem = state.items.find(
        item => item.id === action.payload.id,
      );
      if (existingItem) {
        return {
          ...state,
          items: state.items.map(item =>
            item.id === action.payload.id
              ? {...item, quantity: item.quantity + 1}
              : item,
          ),
        };
      }
      return {
        ...state,
        items: [...state.items, {...action.payload, quantity: 1}],
      };

    case REMOVE_FROM_CART:
      return {
        ...state,
        items: state.items.filter(item => item.id !== action.payload),
      };

    case INCREMENT_QUANTITY:
      return {
        ...state,
        items: state.items.map(item =>
          item.id === action.payload
            ? {...item, quantity: item.quantity + 1}
            : item,
        ),
      };

    case DECREMENT_QUANTITY:
      const isSingleQuantity = state.items.find(
        item => item.id === action.payload && item.quantity === 1,
      );
      if (isSingleQuantity) {
        return {
          ...state,
          items: state.items.filter(item => item.id !== action.payload),
        };
      }
      return {
        ...state,
        items: state.items.map(item =>
          item.id === action.payload && item.quantity > 1
            ? {...item, quantity: item.quantity - 1}
            : item,
        ),
      };

    default:
      return state;
  }
};

export default cartReducer;
