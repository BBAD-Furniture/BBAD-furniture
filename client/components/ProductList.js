import React from 'react';
import { connect } from 'react-redux';
import { Sidebar, SingleProduct } from './index';
import { Link } from 'react-router-dom';
import { getCurrentProduct } from '../store';
import '../styles/productList.css';
/**
 * COMPONENT
 */
export const ProductList = props => {
  const { products } = props;
  return (
    <div>
      <div className="flexWrap">
        <div className="sidebar">
          <Sidebar />
        </div>
        <div className="product-main">
          {products &&
            products.map(product => {
              return (
                <SingleProduct key={product.id} propsFromParent={product} />
              );
            })}
        </div>
      </div>
    </div>
  );
};

const mapProducts = state => {
  return {
    products: state.products,
    selectedProduct: state.selectedProduct
  };
};
const mapDispatch = dispatch => {
  return {
    getCurrentProduct: id => dispatch(getCurrentProduct(id))
  };
};
export const Products = connect(
  mapProducts,
  mapDispatch
)(ProductList);
