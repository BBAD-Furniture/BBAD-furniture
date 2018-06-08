import axios from 'axios';

const GET_CURRENT_PRODUCT = 'GET_CURRENT_PRODUCT';

const getProduct = product => ({ type: GET_CURRENT_PRODUCT, product });

export const getCurrentProduct = (productId, history) => dispatch =>
  axios
    .get(`/api/products/${productId}`)
    .then(res => res.data)
    .then(product => {
      console.log('PRODUCT>>>>>>>>', product);
      dispatch(getProduct(product));
      history.push(`products/${product.id}`);
    })
    .catch(err => console.log(err));

//  dispatch(getProduct(res.data)))
// .then(product => {
//   history.push(`products/${product.id}`);
// })
// .catch(err => console.log(err));

export default function(state = {}, action) {
  switch (action.type) {
    case GET_CURRENT_PRODUCT:
      return action.product;
    default:
      return state;
  }
}
