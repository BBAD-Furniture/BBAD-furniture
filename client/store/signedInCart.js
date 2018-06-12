import axios from 'axios';

const ADD_ITEM_TO_CART = 'ADD_ITEM_TO_CART';
const USER_ORDER = 'USER_ORDER';
const DELETE_ITEM = 'DELETE_ITEM';
const CHANGE_ORDER = 'CHANGE_ORDER';

const addItemToCart = item => ({
  type: ADD_ITEM_TO_CART,
  item
});

const userOrder = items => ({
  type: USER_ORDER,
  items
});

const deleteItem = id => ({
  type: DELETE_ITEM,
  id
});

const changeOrder = item => ({
  type: CHANGE_ORDER,
  item
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

//delete user
export const deleteTheItem = (userId, itemId) => dispatch => {
  console.log('USERID:', userId, 'PRODUCTID:', itemId);
  axios
    .post(`/api/users/${userId}/item/delete`, { itemId })
    .then(res => {
      dispatch(deleteItem(res.data));
    })
    .catch(err => console.log(err));
};
export const changedOrder = (userId, orderInfo) => dispatch =>
  axios
    .put(`api/users/${userId}/order`, orderInfo)
    .then(res => dispatch(changeOrder(res.data)))
    .catch(err => console.log(err));

export default (state = {}, action) => {
  switch (action.type) {
    case ADD_ITEM_TO_CART:
      return action.item;
    case USER_ORDER:
      return action.items;
    case DELETE_ITEM:
      return state.filter(item => item.productId !== action.id);
    case CHANGE_ORDER:
      return state;
    default:
      return state;
  }
};
