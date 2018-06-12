import axios from 'axios';
const GET_ORDERS = 'GET_ORDERS';

const getOrders = orders => ({
  type: GET_ORDERS,
  orders
});

export const getUserOrders = userId => dispatch =>
  axios
    .get(`/api/users/${userId}/allOrders`)
    .then(res => dispatch(getOrders(res.data)))
    .catch(err => console.log(err));

export default function(state = [], action) {
  switch (action.type) {
    case GET_ORDERS:
      return action.orders;
    default:
      return state;
  }
}
