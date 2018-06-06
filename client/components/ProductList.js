import React from 'react';
import { connect } from 'react-redux';
import { Link, Route } from 'react-router-dom';
import SingleProduct from './SingleProduct';

/**
 * COMPONENT
 */
export const ProductList = props => {
  let products = props.products;
  return (
    <div>
      <Route exact path="/products/:id" component={SingleProduct} />

      <div>
        {products &&
          products.map(item => {
            return <SingleProduct item={item} key={item.id} />;
          })}
      </div>
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
