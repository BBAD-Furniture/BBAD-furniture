import React from 'react';
import { connect } from 'react-redux';
import { Sidebar, SingleProduct } from './index';
import { getCurrentProduct } from '../store';
import '../styles/productList.css';
/**
 * COMPONENT
 */
export const ProductList = props => {
  const { products } = props;
  console.log(props.products.reviews, 'RPRPRPRPRPR');
  // let rating = Math.floor(
  //   products.reviews.reduce((acc, elem) => acc + parseInt(elem.rating), 0) /
  //     elem.reviews.length
  // );

  return (
    <div>
      <div className="flexWrap">
        <div className="sidebar">
          <Sidebar />
        </div>
        <div className="product-main">
          {products &&
            products.map(product => {
              let rating = product.reviews
                ? Math.round(
                    Number(
                      product.reviews.reduce((acc, currProduct) => {
                        return acc + currProduct.rating;
                      }, 0) / product.reviews.length
                    ) * 100
                  ) / 100
                : 'No reviews ';

              return (
                <SingleProduct
                  key={product.id}
                  propsFromParent={product}
                  rating={rating}
                />
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
