import React from 'react';
import { connect } from 'react-redux';
import SingleProduct from './SingleProduct';

// import '../styles/productList.css';

/**
 * COMPONENT
 */
const Cart = props => {
  let cartItems = props.products;
  let cartProducts = JSON.parse(localStorage.getItem('products'));
  cartItems = cartItems.filter(item => cartProducts.includes(item.id));
  return (
    <div className="product-main">
      {cartItems &&
        cartItems.map(item => {
          return <SingleProduct key={item.id} propsFromParent={item} />;
        })}
    </div>
  );
};

const mapState = state => {
  return {
    products: state.products
  };
};

export default connect(mapState)(Cart);
