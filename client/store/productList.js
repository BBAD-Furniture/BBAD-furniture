import axios from 'axios';

/**
 * ACTION TYPES
 */
const GET_PRODUCTS = 'GET_PRODUCTS';
const ADD_PRODUCT = 'ADD_PRODUCT';
/**
 * ACTION CREATORS
 */
const getProducts = products => ({ type: GET_PRODUCTS, products });
const addProduct = product => ({ type: ADD_PRODUCT, product });

/**
 * THUNK CREATORS
 */
export const getProductList = () => dispatch =>
  axios
    .get('/api/products')
    .then(res => dispatch(getProducts(res.data)))
    .catch(err => console.log(err));

export const addProductToStore = product => dispatch =>
  axios
    .post('/api/products', product)
    .then(res => dispatch(addProduct(res.data)))
    .catch(err => console.log(err));

/**
 * REDUCER
 */

export default function(state = [], action) {
  switch (action.type) {
    case GET_PRODUCTS:
      return [...action.products];
    case ADD_PRODUCT:
      return [...state.concat(action.product)];

    default:
      return state;
  }
}
