import React from 'react';
import { connect } from 'react-redux';
import { Sidebar, SingleProduct } from './index';
import '../styles/productList.css';
import { Route } from 'react-router-dom';

/**
 * COMPONENT
 */
export const ProductList = props => {
  const { products } = props;
  console.log(products);
  return (
    <div>
      <div className="flexWrap">
        <div className="sidebar">
          <Sidebar />
        </div>
        <div className="product-main">
          {products &&
            products.map(product => {
              return <SingleProduct key={product.id} product={product} />;
            })}
        </div>
      </div>
    </div>
  );
};

const mapProducts = state => {
  return {
    products: state.products
  };
};

export const Products = connect(mapProducts)(ProductList);
