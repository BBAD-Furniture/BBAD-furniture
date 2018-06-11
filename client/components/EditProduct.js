import React from 'react';
import { editCurrentProduct } from '../store';
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

const mapDispatch = dispatch => {
  return {
    handleClick(type, id) {
      switch (type) {
        case 'edit':
          dispatch(editCurrentProduct(id));
          break;
        default:
          break;
      }
    }
  };
};
