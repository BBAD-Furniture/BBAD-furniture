import axios from 'axios';
import history from '../history';

/**
 * ACTION TYPES
 */
const GET_PRODUCTS = 'GET_PRODUCTS';
const ADD_PRODUCT = 'ADD_PRODUCT';
const EDIT_PRODUCT = 'EDIT_PRODUCT';

/**
 * ACTION CREATORS
 */
const getProducts = products => ({ type: GET_PRODUCTS, products });
const addProduct = product => ({ type: ADD_PRODUCT, product });
const editProduct = product => ({ type: EDIT_PRODUCT, product });

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
    .then(res => {
      dispatch(addProduct(res.data));
    })
    .catch(err => console.log(err));

export const editCurrentProduct = (productId, obj) => dispatch => {
  axios
    .put(`/api/products/${productId}`, obj)
    .then(res => res.data)
    .then(product => {
      dispatch(editProduct(product));
    })
    .then(() => history.push('/products'))
    .catch(err => console.log(err));
};

/**
 * REDUCER
 */

export default function(state = [], action) {
  switch (action.type) {
    case GET_PRODUCTS:
      return [...action.products];
    case ADD_PRODUCT:
      return [...state.concat(action.product)];
    case EDIT_PRODUCT:
      return [...state];
    default:
      return state;
  }
}
