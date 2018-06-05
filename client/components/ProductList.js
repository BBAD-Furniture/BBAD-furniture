import React from 'react';
import { connect } from 'react-redux';
import SingleProduct from './SingleProduct';
import { getProductList } from '../store/productList';

/**
 * COMPONENT
 */
export const ProductList = props => {
  const products = props.products;
  console.log(props, 'THIS SHOULD COME FROM PROPS');
  return (
    <div>
      {products &&
        products.map(item => {
          console.log(item);
          return <SingleProduct key={item.id} item={item} />;
        })}
    </div>
  );
};

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    products: state.products
  };
};

const mapDispatch = dispatch => {
  return {
    getProductList: () => dispatch(getProductList())
  };
};

export default connect(
  mapState,
  mapDispatch
)(ProductList);
