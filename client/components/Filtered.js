import React from 'react';
import { connect } from 'react-redux';
import { ProductList } from './ProductList';
const Filtered = props => {
  let keys = Object.keys(props.filter);
  keys = keys[0];
  let { color, category } = props.filter;
  let products = props.products || [];

  let filter =
    keys === 'color'
      ? products.filter(product => product.color === color)
      : products.filter(product => product.category.includes(category));

  console.log(filter);
  return <ProductList products={filter} />;
};

const mapState = state => {
  return {
    products: state.products,
    filter: state.filter
  };
};
export default connect(mapState)(Filtered);
