import React from 'react';
import { connect } from 'react-redux';
import {
  getCurrentProduct
  // addToCartList,
  // removeCurrentProduct
} from '../store';
import { withRouter, Link } from 'react-router-dom';
// import { Button } from 'reactstrap';
import '../styles/singleProduct.css';

export const EditProduct = props => {
  console.log('PROPS', props);

  return (
    <div>
      <h1>Edit Product:</h1>

      <form>
        <div>
          <label>Name</label>
          <input name="name" type="product-name" />

          <label>Description</label>
          <input name="description" type="product-description" />

          <label>Price</label>
          <input name="price" type="product-price" />

          <label>Category</label>
          <input name="category" type="product-category" />
        </div>
        <button>Edit Product</button>
      </form>
    </div>
  );
};

const mapState = state => {
  return {
    selectedProduct: state.selectedProduct[0]
  };
};

// export default withRouter(connect(mapState)(EditProduct));
