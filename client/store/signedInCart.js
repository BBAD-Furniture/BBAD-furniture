import axios from 'axios';

const ADD_ITEM_TO_CART = 'ADD_ITEM_TO_CART';
const USER_ORDER = 'USER_ORDER';

const addItemToCart = item => ({
  type: ADD_ITEM_TO_CART,
  item
});

const userOrder = items => ({
  type: USER_ORDER,
  items
});

export const addItem = (userId, item) => dispatch =>
  axios
    .post(`/api/users/${userId}/order`, item)
    .then(res => dispatch(addItemToCart(res.data)))
    .catch(err => console.log(err));

export const getItems = userId => dispatch =>
  axios
    .get(`/api/users/${userId}/order`)
    .then(res => dispatch(userOrder(res.data)))
    .catch(err => console.log(err));

export default (state = {}, action) => {
  switch (action.type) {
    case ADD_ITEM_TO_CART:
      return action.item;
    case USER_ORDER:
      return action.items;
    default:
      return state;
  }
};
