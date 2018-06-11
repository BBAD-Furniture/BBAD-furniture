import axios from 'axios';

const FILTER_CATEGORY = 'FILTER_CATEGORY';
const FILTER_COLOR = 'FILTER_COLOR';
const FILTER_NAME = 'FILTER_NAME';

export const filterProductByColor = color => dispatch =>
  axios
    .get(`/api/products`)
    .then(res => res.data)
    .then(products => {
      dispatch({
        type: FILTER_COLOR,
        filter: products.filter(product => product.color === color)
      });
    })
    .catch(err => console.log(err));

export const filterProductByCategory = category => dispatch =>
  axios
    .get(`/api/products`)
    .then(res => res.data)
    .then(products => {
      dispatch({
        type: FILTER_CATEGORY,
        filter: products.filter(product => product.category === category)
      });
    })
    .catch(err => console.log(err));

export const filterProductByName = inputValue => dispatch =>
  axios
    .get(`/api/products`)
    .then(res => res.data)
    .then(products => {
      dispatch({
        type: FILTER_NAME,
        filter: products.filter(product =>
          product.name.toLowerCase().match(inputValue.toLowerCase()))
      });
    })
    .catch(err => console.log(err));

export default function(state = [], action) {
  switch (action.type) {
    case FILTER_CATEGORY:
      return [...action.filter];
    case FILTER_COLOR:
      return [...action.filter];
    case FILTER_NAME:
      return [...action.filter];
    default:
      return state;
  }
}
