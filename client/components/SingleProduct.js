import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

const SingleProduct = props => {
  let { product } = props;
  return (
    <div className="product-item" key={product.id}>
      <Link to={`/products/${product.id}`}>
        <img src={product.image} />
      </Link>
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
  );
};

// const mapState = state => {
//   return {
//     products: state.products
//   };
// };

// const mapDispatch = () => {
//   return {
//     addItemToCart: item => {
//       localStorage.getItem('product') === null
//         ? localStorage.setItem('product', JSON.stringify([item.id]))
//         : SaveToCart(item.id);
//     }
//   };
// };

// <button type="button" onClick={() => props.addItemToCart(item)}>
// Add to Cart
// </button>
// function SaveToCart(data) {
//   let products = [];
//   products = JSON.parse(localStorage.getItem('product'));
//   products.push(data);
//   localStorage.setItem('product', JSON.stringify(products));
// }

// export default connect(
//   mapState
//   // mapDispatch
// )(SingleProduct);

export default SingleProduct;
