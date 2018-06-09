import React from 'react';
import { connect } from 'react-redux';

import '../styles/checkout.css';

const Checkout = props => {
  //check if user exists: store products into db per user
  console.log(props);
  let cartItems = props.products;
  let cartProducts = JSON.parse(localStorage.getItem('products'));
  cartItems = cartProducts
    ? cartItems.filter(item => cartProducts.includes(item.id))
    : [];
  console.log(props.cartList, 'items in the cart');
  return (
    <div className="check-out">
      {cartItems &&
        cartItems.map(item => {
          return (
            <h1 key={item.id}>
              {item.name} total: {item.price * item.quantity}
            </h1>
          );
        })}
    </div>
  );
};

const mapState = state => {
  return {
    products: state.products
  };
};
export default connect(mapState)(Checkout);
