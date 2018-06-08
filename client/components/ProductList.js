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
                <div
                  onClick={() => props.getCurrentProduct(product.id)}
                  key={product.id}>
                  <div className="product-item" key={product.id}>
                    <img src={product.image} />
                    <h3>{product.name}</h3>
                    <p>
                      <strong>Description: </strong>
                      {product.description}
                    </p>
                    <p>button goes here</p>
                    <p>
                      <strong>Category:</strong> {product.category}
                    </p>
                    <p>
                      <strong>Color:</strong> {product.color}
                    </p>
                  </div>
                </div>
              );
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
const mapDispatch = (dispatch, ownProps) => {
  return {
    getCurrentProduct: id => dispatch(getCurrentProduct(id, ownProps.history))
    // handleSubmit() {
    //   evt.preventDefault();

    //   const { productId } = ownProps;

    //   dispatch(postMessage({ name, content, channelId }));
    //   dispatch(writeMessage(''));
    // }
  };
};
export const Products = connect(
  mapProducts,
  mapDispatch
)(ProductList);
