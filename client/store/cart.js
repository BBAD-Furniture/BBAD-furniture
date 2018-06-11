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
const removeFromCart = item => ({ type: REMOVE_FROM_CART, item });
const itemCount = num => ({ type: REMOVE_FROM_CART, num });

/**
 * THUNK CREATORS
 */
export const addToCartList = item => dispatch =>
  axios
    .get(`/api/products/${item.id}`)
    .then(res => {
      //puts all activeProducts into an array
      dispatch(addToCart(res.data));
      //puts all activeProducts into the localStorage as: 'products': '[..items]'
      let prods = [];
      prods = JSON.parse(localStorage.getItem('products'));
      prods !== null
        ? localStorage.setItem(
            'products',
            JSON.stringify(new Set(prods.concat(item.id)))
          )
        : localStorage.setItem('products', JSON.stringify([item.id]));

      localStorage.setItem(
        'quantity',
        JSON.stringify(
          JSON.parse(localStorage.getItem('products')).map(i => 1)
        ) || []
      );
    })
    .catch(err => console.log(err));

export const removeFromCartList = item => dispatch => {
  dispatch(removeFromCart(item));
  let prods = [];
  prods = JSON.parse(localStorage.getItem('products')).filter(
    id => id !== item.id
  );
  localStorage.setItem('products', JSON.stringify(prods));
};

export const quantityOfItem = (index, evt) => dispatch => {
  let qty = JSON.parse(localStorage.getItem('quantity'));
  qty[index] = evt.target.value;
  localStorage.setItem('quantity', JSON.stringify(qty));
  dispatch(itemCount(evt.target.value));
};

/**
 * REDUCER
 */

export default function(state = [], action) {
  switch (action.type) {
    case ADD_TO_CART:
      return [...state, action.item];
    case REMOVE_FROM_CART:
      return [...state].filter(item => item !== action.item);
    case QTY_OF_ITEM:
      return [...state, action.num];
    default:
      return state;
  }
}
