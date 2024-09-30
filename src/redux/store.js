import {createStore, combineReducers} from 'redux';
import cartReducer from './reducers/cartReducer';
import wishlistReducer from './reducers/wishlistReducer';
import allProductReducer from './reducers/allProductReducer';

const rootReducer = combineReducers({
  cart: cartReducer,
  wishlist: wishlistReducer,
  allProducts: allProductReducer,
});

const store = createStore(rootReducer);

export default store;
