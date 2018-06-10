import axios from 'axios';

/**
 * ACTION TYPES
 */
const ADD_TO_CART = 'ADD_TO_CART';
const QTY_OF_ITEM = 'QTY_OF_ITEM';
const REMOVE_FROM_CART = 'REMOVE_FROM_CART';

/**
 * ACTION CREATORS
 */
const addToCart = item => ({ type: ADD_TO_CART, item });
const removeFromCart = item => ({ type: REMOVE_FROM_CART });
const quantityOfItem = num => ({ type: REMOVE_FROM_CART, num });

/**
 * THUNK CREATORS
 */
export const addToCartList = item => dispatch =>
  axios
    .get(`/api/products/${item.id}`)
    .then(res => {
      //places all activeProducts into an array
      dispatch(addToCart(res.data));
      //places all activeProducts into the localStorage as: 'products': '[..items]'
      let prods = [];
      prods = JSON.parse(localStorage.getItem('products'));
      prods !== null
        ? localStorage.setItem(
            'products',
            JSON.stringify(new Set(prods.concat(item.id)))
          )
        : localStorage.setItem('products', JSON.stringify([item.id]));
    })
    .catch(err => console.log(err));

export const removeFromCartList = item => dispatch => {
  console.log(item, 'this is being deleted');
  dispatch(removeFromCart(item));
  let prods = [];
  prods = JSON.parse(localStorage.getItem('products')).filter(
    id => id !== item.id
  );
  localStorage.setItem('products', JSON.stringify(prods));
};

export const assignQuantityToItem = item => dispatch => {};
//update quantity for prouduct in the join table
/**
 * REDUCER
 */

export default function(state = [], action) {
  switch (action.type) {
    case ADD_TO_CART:
      return [...state, action.item];
    case REMOVE_FROM_CART:
      let prods = [...state];
      prods.pop();
      return prods;
    default:
      return state;
  }
}
