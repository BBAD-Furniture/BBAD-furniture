import axios from 'axios';

/**
 * ACTION TYPES
 */
const ADD_TO_CART = 'ADD_TO_CART';
const REMOVE_FROM_CART = 'REMOVE_FROM_CART';

/**
 * ACTION CREATORS
 */
const addToCart = item => ({ type: ADD_TO_CART, item });
const removeFromCart = () => ({ type: REMOVE_FROM_CART });

/**
 * THUNK CREATORS
 */
export const addToCartList = item => dispatch =>
  axios
    .get(`/api/products/${item.id}`)
    .then(res => {
      dispatch(addToCart(res.data));
      let prods = [];
      prods = JSON.parse(localStorage.getItem('products'));
      prods !== null
        ? localStorage.setItem(
            'products',
            JSON.stringify(prods.concat(item.id))
          )
        : localStorage.setItem('products', JSON.stringify([item.id]));
    })
    .catch(err => console.log(err));

export const removeFromCartList = item => dispatch => {
  console.log(item, 'this is being deleted');
  dispatch(removeFromCart());
  let prods = [];
  prods = JSON.parse(localStorage.getItem('products'));
  prods.pop();
  localStorage.setItem('products', JSON.stringify(prods));
};
/**
 * REDUCER
 */

export default function(state = [], action) {
  switch (action.type) {
    case ADD_TO_CART:
      return [...state].concat(action.item);
    case REMOVE_FROM_CART:
      let prods = [...state];
      prods.pop();
      return prods;
    default:
      return state;
  }
}
