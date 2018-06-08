import axios from 'axios';

/**
 * ACTION TYPES
 */
const ADD_TO_CART = 'ADD_TO_CART';

/**
 * ACTION CREATORS
 */
const addToCart = item => ({ type: ADD_TO_CART, item });

/**
 * THUNK CREATORS
 */
export const addToCartList = item => dispatch =>
  axios
    .get(`/api/products/${item.id}`)
    .then(res => dispatch(addToCart(res.data)))
    .catch(err => console.log(err));

/**
 * REDUCER
 */

export default function(state = [], action) {
  switch (action.type) {
    case ADD_TO_CART:
      return [...state, action.item];

    default:
      return state;
  }
}
