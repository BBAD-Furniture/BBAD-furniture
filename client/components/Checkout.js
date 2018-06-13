import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import notify from './notify';

import '../styles/checkout.css';

const Checkout = props => {
  //check if user exists: store products into db per user
  const { user } = props;
  let cartItems = props.products;
  let cartProducts = JSON.parse(localStorage.getItem('products'));
  cartItems = cartProducts
    ? cartItems.filter(item => cartProducts.includes(item.id))
    : [];
  let itemCost = 0;

  return Object.keys(user).length ? (
    //set the Order status to TRUE

    <div>Your Order has been completed.</div>
  ) : (
    <div>
      <div className="checkout">
        <div className="check-billing">
          <h1>1. Billing Address</h1>
          <form>
            <label>
              First Name:
              <input
                onChange={props.handleCheckoutField}
                type="text"
                name="firstName"
                placeholder="firstName"
                required
              />
            </label>
            <label>
              Last Name:
              <input
                onChange={props.handleCheckoutField}
                type="text"
                name="lastName"
                placeholder="lastName"
                required
              />
            </label>
            <label>
              Email:
              <input
                onChange={props.handleCheckoutField}
                type="email"
                name="email"
                placeholder="email"
                required
              />
            </label>
            <label>
              Telephone:
              <input
                onChange={props.handleCheckoutField}
                type="text"
                name="telephone"
                placeholder="telephone"
                required
              />
            </label>
            <label>
              Address:
              <input
                onChange={props.handleCheckoutField}
                type="text"
                name="address"
                placeholder="address"
                required
              />
            </label>
            <label>
              City:
              <input
                onChange={props.handleCheckoutField}
                type="text"
                name="city"
                placeholder="city"
                required
              />
            </label>
            Country:
            <select>
              <option />
              <option>United States</option>
            </select>
          </form>
        </div>
        <div className="check-shipping">
          <h1>2. Shipping Method</h1>
          <form>
            <input type="radio" name="regular" value="regular" />Regular (1-5
            days)
            <input type="radio" name="express" value="express" />Express (2-3
            days)
          </form>
        </div>
        <div className="check-payment">
          <h1>3. Payment Method</h1>
          <form>
            <label>
              Card Type:
              <input type="text" name="card" required />
            </label>
            <label>
              Card Number:
              <input type="text" name="card-num" required />
            </label>
          </form>
        </div>

        <div className="check-order">
          <h1>4. Review Order</h1>
          {cartItems &&
            cartItems.map((item, idx) => {
              itemCost +=
                item.price * JSON.parse(localStorage.getItem('quantity'))[idx];
            })}
          <h2>total: ${itemCost.toFixed(2)}</h2>
        </div>
      </div>
      <div className="order-checkout">
        {itemCost > 0 ? (
          <Link to="complete-checkout">
            <button
              type="button"
              onClick={() => {
                props.resetStorage();
                props.handleSubmit();
              }}>
              Place Order
            </button>
          </Link>
        ) : (
          <button type="button" onClick={() => notify('Your Cart is Empty')}>
            Place Order
          </button>
        )}
      </div>
    </div>
  );
};

const mapState = state => {
  return {
    products: state.products,
    user: state.user
  };
};

const mapDispatch = dispatch => {
  return {
    resetStorage() {
      localStorage.setItem('products', JSON.stringify([]));
      localStorage.setItem('quantity', JSON.stringify([]));
    },
    handleSubmit() {
      notify('Thank You for Shopping at BBAD');
    },
    handleCheckoutField(evt) {}
  };
};

export default connect(
  mapState,
  mapDispatch
)(Checkout);
