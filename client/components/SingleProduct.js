import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

const SingleProduct = props => {
  let { selectedProduct } = props;
  return (
    <div className="product-item" key={selectedProduct.id}>
      <img src={selectedProduct.image} />
      <h3>{selectedProduct.name}</h3>
      <p>
        <strong>Description: </strong>
        {selectedProduct.description}
      </p>
      <p>button goes here</p>
      <p>
        <strong>Category:</strong> {selectedProduct.category}
      </p>
      <p>
        <strong>Color:</strong> {selectedProduct.color}
      </p>
    </div>
  );
};

const mapState = (state, ownProps) => {
  //filter through parm
  const id = ownProps.match.params.id;
  const currProduct = state.products.find(prod => prod.id === id);
  return {
    selectedProduct: state.selectedProduct || currProduct
  };
};

const mapDispatch = () => {
  return {};
};

export default connect(
  mapState,
  mapDispatch
)(SingleProduct);
