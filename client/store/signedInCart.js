import axios from 'axios';

const ADD_ITEM_TO_CART = 'ADD_ITEM_TO_CART';
const ADD_ITEM_TO_GUEST_CART = 'ADD_ITEM_TO_GUEST_CART';
const USER_ORDER = 'USER_ORDER';
const DELETE_ITEM = 'DELETE_ITEM';
const CHANGE_ORDER = 'CHANGE_ORDER';

const addItemToCart = item => ({
  type: ADD_ITEM_TO_CART,
  item
});

const addItemToGuestCart = item => ({
  type: ADD_ITEM_TO_GUEST_CART,
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

export const addItem = (userId, item) => dispatch => {
  //add item to localStorage
  let prods = [];
  prods = JSON.parse(localStorage.getItem('products'));
  prods !== null
    ? localStorage.setItem(
        'products',
        JSON.stringify(new Set(prods.concat(item.productId)))
      )
    : localStorage.setItem('products', JSON.stringify([item.productId]));
  console.log(JSON.parse(localStorage.getItem('products')), 'prods after add');
  // localStorage.setItem(
  //   'quantity',
  //   JSON.stringify(JSON.parse(localStorage.getItem('products')).map(i => 1)) ||
  //     []
  // );

  if (userId) {axios
      .post(`/api/users/${userId}/order`, item)
      .then(res => {
        //add item to user's order
        dispatch(addItemToCart(res.data));
        // console.log(userId, item, 'user adding to cart: user, prodId');
      })
      .catch(err => console.log(err));}
};

export const getItems = userId => dispatch =>
  axios
    .get(`/api/users/${userId}/order`)
    .then(res => dispatch(userOrder(res.data)))
    .catch(err => console.log(err));

export const deleteTheItem = (userId, itemId) => dispatch => {
  console.log(
    'deleteTheItem: user, itemId, from signedInCart in store',
    userId,
    itemId
  );
  //remove item from localStorage
  let prods = [];
  prods = JSON.parse(localStorage.getItem('products')).filter(
    id => id !== itemId
  );
  console.log(prods, 'prods after delete');
  localStorage.setItem('products', JSON.stringify(prods));
  if (!userId) deleteItem(itemId);
  if (typeof userId === 'number') {axios
      .post(`/api/users/${userId}/item/delete`, { itemId })
      .then(res => {
        //remove item from store
        dispatch(deleteItem(res.data));
      })
      .catch(err => console.log(err));}
};

export const changedOrder = (userId, orderInfo) => dispatch =>
  axios
    .put(`api/users/${userId}/order`, orderInfo)
    .then(res => dispatch(changeOrder(res.data)))
    .catch(err => console.log(err));

export default (state = [], action) => {
  switch (action.type) {
    case ADD_ITEM_TO_CART:
      return action.item;
    case ADD_ITEM_TO_GUEST_CART:
      return action.item;
    case USER_ORDER:
      return action.items;
    case DELETE_ITEM:
      return state.filter(item => item.productId !== action.id);
    case CHANGE_ORDER:
      return state.map(it => {
        // if (it.id === action.item.id) it = action.item;
        // return it;
        ///CHECK THIS OUT  BELOWWWWWW THE RETURN
        return state;
      });
    // return action.item;
    default:
      return state;
  }
};
