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

  let itemCost = 0;
  return (
    <div className="checkout">
      <div className="billing info">
        <h1>1. BILLING ADDRESS</h1>
        <form>
          <label>
            First Name:
            <input
              type="text"
              name="firstName"
              placeholder="firstName"
              required
            />
          </label>
          <label>
            Last Name:
            <input
              type="text"
              name="lastName"
              placeholder="lastName"
              required
            />
          </label>
          <label>
            Email:
            <input type="email" name="email" placeholder="email" required />
          </label>
          <label>
            Telephone:
            <input
              type="text"
              name="telephone"
              placeholder="telephone"
              required
            />
          </label>
          <label>
            Address:
            <input type="text" name="address" placeholder="address" required />
          </label>
          <label>
            City:
            <input type="text" name="city" placeholder="city" required />
          </label>
          Country:
          <select>
            <option />
            <option>United States</option>
          </select>
        </form>
      </div>
      <div className="shipping info">
        <h1>2. SHIPPING METHOD</h1>
        <form>
          <input type="radio" name="regular" value="regular" />Regular (1-5
          days)
          <input type="radio" name="express" value="express" />Express (2-3
          days)
        </form>
        <h1>3. PAYMENT METHOD</h1>
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

      <div>
        <h1>4. REVIEW ORDER</h1>
        {cartItems &&
          cartItems.map(item => {
            itemCost += item.price;
          })}
        <h2>total: ${itemCost.toFixed(2)}</h2>
      </div>
      <div>
        <button style={{ float: 'right' }}>Place Order</button>
      </div>
    </div>
  );
};

const mapState = state => {
  return {
    products: state.products
  };
};
export default connect(mapState)(Checkout);
