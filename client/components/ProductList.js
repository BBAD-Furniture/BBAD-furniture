import React from 'react';
import { connect } from 'react-redux';
import { getSingleProduct } from '../store';
import { Link, Route } from 'react-router-dom';
import SingleProduct from './SingleProduct';

/**
 * COMPONENT
 */
export const ProductList = props => {
  console.log(props);
  let products = props.products[0];

  return (
    <div>
      <div>

        {products &&
          products.map(item => {
            return (
              <Link to={`/products/${item.id}`} key={item.id}>
                <SingleProduct item={item} key={item.id} />
              </Link>
            );
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
    products: state.products.products
  };
};

const mapDispatch = dispatch => {
  return {
    getSingleProduct
  };
};

export default connect(
  mapState,
  mapDispatch
)(ProductList);
