import React from 'react';
import { connect } from 'react-redux';
import SingleProduct from './SingleProduct';
import { getProductList } from '../store/productList';

/**
 * COMPONENT
 */
export const ProductList = props => {
  console.log('PRODUCTS: ', props.products);
  let products = props.products;
  return (
    <div>
      {products.map(item => {
        console.log(item, "FOOOOOO");
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

export default connect(mapState)(ProductList);
