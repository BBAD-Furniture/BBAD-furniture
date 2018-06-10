import React from 'react';
import { connect } from 'react-redux';
import { removeFromCartList, quantityOfItem } from '../store';
import { Link } from 'react-router-dom';
import '../styles/cart.css';

/**
 * COMPONENT
 */
const Cart = props => {
  let cartItems = props.products;
  let cartProducts = JSON.parse(localStorage.getItem('products'));

  // localStorage.setItem('quantity', JSON.stringify(cartProducts.map(i => 1)));
  let itemCount = JSON.parse(localStorage.getItem('quantity'));
  console.log(itemCount);

  cartItems = cartProducts
    ? cartItems.filter(item => cartProducts.includes(item.id))
    : [];

  return (
    <div className="shopping-cart">
      <h1>Shopping Cart</h1>
      <div className="column-labels">
        <label>Image</label>
        <label>Product</label>
        <label>Price</label>
        <label>Quantity</label>
        <label>Remove</label>
        <label>Total</label>
      </div>

      {cartItems &&
        cartItems.map((item, idx) => {
          return (
            <div className="product" key={item.id}>
              <Link to={`/products/${item.id}`}>
                <div className="product-image">
                  <img src={item.image} />
                </div>
              </Link>
              <div>
                <div className="product-name">{item.name}</div>
                <p>{item.description.slice(0, 25)}</p>
              </div>
              <div>{item.price}</div>
              <div className="quantity">
                <input
                  type="number"
                  min="1"
                  max="10"
                  value={itemCount[idx]}
                  onChange={e => props.handleChange(idx, e)}
                />
              </div>
              <div>
                <button
                  className="remove-product"
                  onClick={() => props.removeCartItem(item)}>
                  Remove
                </button>
              </div>
              <div>{item.price * itemCount[idx]}</div>
            </div>
          );
        })}

      <div className="totals">
        GrandTotal: {100.0}
        <Link to="/checkout">
          <button className="checkout">Checkout</button>
        </Link>
      </div>
    </div>
  );
};

const mapState = state => {
  return {
    products: state.products,
    cartList: state.cartList
  };
};

const mapDispatch = dispatch => {
  return {
    handleChange: (index, evt) => dispatch(quantityOfItem(index, evt)),
    removeCartItem: item => dispatch(removeFromCartList(item))
  };
};

export default connect(
  mapState,
  mapDispatch
)(Cart);
