import axios from 'axios';

const GET_CURRENT_PRODUCT = 'GET_CURRENT_PRODUCT';

const getProduct = product => ({ type: GET_CURRENT_PRODUCT, product });

export const getCurrentProduct = productId => dispatch =>
  axios
    .get(`/api/products/${productId}`)
    .then(res => res.data)
    .then(product => {
      dispatch(getProduct(product));
    })
    .catch(err => console.log(err));

export default function(state = {}, action) {
  switch (action.type) {
    case GET_CURRENT_PRODUCT:
      return action.product;
    default:
      return state;
  }
}