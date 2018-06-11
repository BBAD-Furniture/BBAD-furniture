import React from 'react';
import { connect } from 'react-redux';
import { removeFromCartList, deleteTheItem, changedOrder } from '../store';
// import SingleProduct from './SingleProduct';
import { Link } from 'react-router-dom';
import '../styles/cart.css';

/**
 * COMPONENT
 */
const Cart = props => {
  const { user, signedInItems, products, handleCheckout } = props;
  let total = 0;
  // props.getItems(user.id);
  let cartItems = props.products;
  let cartProducts = JSON.parse(localStorage.getItem('products'));

  localStorage.setItem('quantity', JSON.stringify(cartProducts.map(i => 1)));
  let itemCount = localStorage.getItem('quantity');
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

      {!Object.keys(user).length ? (
        <div>
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
                      value="1"
                      min="1"
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
                  <div>{item.price}</div>
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
      ) : (
        <div>
          {signedInItems &&
            signedInItems.length &&
            signedInItems.map(oneItem => {
              const allProds = products.find(it => it.id === oneItem.productId);
              total += allProds.price * oneItem.quantity;
              return (
                <div className="product" key={allProds.id}>
                  <Link to={`/products/${allProds.id}`}>
                    <div className="product-image">
                      <img src={allProds.image} />
                    </div>
                  </Link>
                  <div>
                    <div className="product-name">{allProds.name}</div>
                    <p>{allProds.description.slice(0, 25)}</p>
                  </div>
                  <div>{allProds.price}</div>
                  <div className="quantity">
                    <div>{oneItem.quantity}</div>
                  </div>
                  <div>
                    <button
                      className="remove-product"
                      onClick={() => props.handleDelete(user.id, allProds.id)}>
                      Remove
                    </button>
                  </div>
                  <div>{allProds.price}</div>
                </div>
              );
            })}
          <div className="totals">
            Total: {total}
            <Link to="/checkout">
              <button
                className="checkout"
                onClick={() => handleCheckout(user.id)}>
                Checkout
              </button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

const mapState = state => {
  return {
    products: state.products,
    cartList: state.cartList,
    user: state.user,
    signedInItems: state.signedInCart
  };
};

const mapDispatch = dispatch => {
  return {
    handleChange(index, evt) {
      let qty = JSON.parse(localStorage.getItem('quantity'));
      qty[index] = evt.target.value;
      localStorage.setItem('quantity', JSON.stringify(qty));
      console.log(localStorage.getItem('quantity'));
    },
    removeCartItem: item => dispatch(removeFromCartList(item)),
    handleDelete(userId, productId) {
      console.log(productId);
      dispatch(deleteTheItem(userId, productId));
    },
    handleCheckout(userId) {
      dispatch(changedOrder(userId, { status: true }));
    }
  };
};

export default connect(mapState, mapDispatch)(Cart);
