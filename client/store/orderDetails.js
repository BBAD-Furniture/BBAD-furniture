import axios from 'axios';

const GET_ORDERS_DETAILS = 'GET_ORDERS_DETAILS';

const getOrdersDetails = ordersDetails => ({
  type: GET_ORDERS_DETAILS,
  ordersDetails
});

export const getUserOrdersDetails = userId => dispatch =>
  axios
    .get(`/api/users/${userId}/allOrdersInfo`)
    .then(res => dispatch(getOrdersDetails(res.data)))
    .catch(err => console.log(err));

export default function(state = [], action) {
  switch (action.type) {
    case GET_ORDERS_DETAILS:
      return action.ordersDetails;
    default:
      return state;
  }
}
