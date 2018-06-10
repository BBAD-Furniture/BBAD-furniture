import React from 'react';
import { connect } from 'react-redux';
import { removeFromCartList, getItems } from '../store';
// import SingleProduct from './SingleProduct';
import { Link } from 'react-router-dom';
import '../styles/cart.css';

/**
 * COMPONENT
 */
const Cart = props => {
  const { user, signedInItems, products } = props;
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
    <div>
      {!Object.keys(user).length ? (
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
          {signedInItems.length &&
            signedInItems.map(oneItem => {
              const allProds = products.find(it => it.id === oneItem.productId);
              return (
                <div key={oneItem}>
                  <h2>{allProds.name}</h2>
                  <h2>{oneItem.quantity}</h2>
                </div>
              );
            })}
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
    removeCartItem: item => dispatch(removeFromCartList(item))
    // getItems: id => {
    //   dispatch(getItems(id));
    // }
  };
};

export default connect(mapState, mapDispatch)(Cart);
