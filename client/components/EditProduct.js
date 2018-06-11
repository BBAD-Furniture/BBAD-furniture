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
          <input name="name" type="campus-name" />

          <label>Description</label>
          <input name="location" type="campus-location" />

          <label>Price</label>
          <input name="image" type="campus-image" />

          <label>Category</label>
          <input name="description" type="campus-description" />
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

export default withRouter(connect(mapState)(EditProduct));
