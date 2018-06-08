import React from 'react';
import { connect } from 'react-redux';
import SingleProduct from './SingleProduct';

// import '../styles/productList.css';

/**
 * COMPONENT
 */
const Cart = props => {
  const cartItems = props.cartList;
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
    cartList: state.cartList
  };
};

export default connect(mapState)(Cart);
