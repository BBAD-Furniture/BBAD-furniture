import axios from 'axios';

/**
 * ACTION TYPES
 */
const GET_PRODUCTS = 'GET_PRODUCTS';
const GET_SINGLE_PRODUCT = 'GET_SINGLE_PRODUCT';
/**
 * ACTION CREATORS
 */
const getProducts = products => ({ type: GET_PRODUCTS, products });
const getProduct = product => ({ type: GET_SINGLE_PRODUCT, product });

/**
 * THUNK CREATORS
 */
export const getProductList = () => dispatch =>
  axios
    .get('/api/products')
    .then(res => dispatch(getProducts(res.data)))
    .catch(err => console.log(err));

export const getSingleProduct = id => dispatch =>
  axios
    .get(`/api/products/${id}`)
    .then(res => dispatch(getProduct(res.data)))
    .catch(err => console.log(err));
/**
 * REDUCER
 */

//FIX THIS!
let initialState = {
  products: [],
  singleProduct: {}
};
export default function(state = initialState, action) {
  switch (action.type) {
    case GET_PRODUCTS:
      return {
        ...state,
        products: [...state.products, action.products]
      };
    case GET_SINGLE_PRODUCT:
      return { ...state, singleProduct: action.product };
    default:
      return state;
  }
}
