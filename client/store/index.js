import { createStore, combineReducers, applyMiddleware } from 'redux';
import createLogger from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import user from './user';
import products, { getProductList } from './productList';
import selectedProduct from './currentProduct';
import filter from './filter';
import cartList from './cart';
import allUsers from './allUsers';
import signedInCart from './signedInCart';
import order from './order';
import orderDetails from './orderDetails';

const reducer = combineReducers({
  user,
  products,
  selectedProduct,
  cartList,
  allUsers,
  signedInCart,
  filter,
  order,
  orderDetails
});

const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({ collapsed: true }))
);
const store = createStore(reducer, middleware);

store.dispatch(getProductList());

export default store;
export * from './user';
export * from './productList';
export * from './currentProduct';
export * from './cart';
export * from './allUsers';
export * from './signedInCart';
export * from './filter';
export * from './order';
export * from './orderDetails';
