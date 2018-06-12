import axios from 'axios';
import history from '../history';

const GET_CURRENT_PRODUCT = 'GET_CURRENT_PRODUCT';
const REMOVE_PRODUCT = 'REMOVE_PRODUCT';
const ADD_REVIEW = 'ADD_REVIEW';

const getProduct = product => ({ type: GET_CURRENT_PRODUCT, product });
const removeProduct = () => ({ type: REMOVE_PRODUCT });
const addReview = review => ({ type: ADD_REVIEW, review });

export const getCurrentProduct = productId => dispatch =>
  axios
    .get(`/api/products/${productId}`)
    .then(res => res.data)
    .then(product => {
      dispatch(getProduct(product));
    })
    .catch(err => console.log(err));

export const removeCurrentProduct = productId => dispatch => {
  if (confirm('Are you sure you want to delete this product?')) {
    axios
      .delete(`/api/products/${productId}`)
      .then(res => res.data)
      .then(product => {
        dispatch(removeProduct(product));
        history.push('/products');
      })
      .catch(err => console.log(err));
  }
};

export const addNewReview = productId => dispatch => {
  axios
    .post(`/api/products/${productId}`)
    .then(res => dispatch(addReview(res.data)))
    .catch(err => console.log(err));
};

export default function(state = {}, action) {
  switch (action.type) {
    case GET_CURRENT_PRODUCT:
      return { ...action.product };
    case REMOVE_PRODUCT:
      return {};
    case ADD_REVIEW:
      return { ...state.reviews.concat([action.review]) };
    default:
      return state;
  }
}
