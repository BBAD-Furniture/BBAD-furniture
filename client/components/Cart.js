import React from 'react';
import { connect } from 'react-redux';
import {
  removeFromCartList,
  deleteTheItem,
  changedOrder,
  quantityOfItem
} from '../store';
import { Link } from 'react-router-dom';
import '../styles/cart.css';
import { Button, Input } from 'reactstrap';

/**
 * COMPONENT
 */
const Cart = props => {
  const { user, signedInItems, products, handleCheckout } = props;
  let total = 0;
  let cartItems = props.products;
  let cartProducts = JSON.parse(localStorage.getItem('products'));

  let itemCount = JSON.parse(localStorage.getItem('quantity')) || [];

  cartItems = cartProducts
    ? cartItems.filter(item => cartProducts.includes(item.id))
    : [];

  let grandTotal = 0;
  let quan = 0;

  return (
    <div className="shopping-cart">
      <h1>Shopping Cart</h1>
      <div className="column-labels">
        <p>Image</p>
        <p>Product</p>
        <p>Price</p>
        <p>Quantity</p>
        <p>Remove</p>
        <p>Total</p>
      </div>

      {!Object.keys(user).length ? (
        <div>
          <div>
            {cartItems &&
              cartItems.map((item, idx) => {
                quan = +itemCount[idx] || 0;
                grandTotal += item.price * quan;

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
                    <div>${item.price.toFixed(2)}</div>
                    <div className="quantity">
                      <Input
                        type="number"
                        min="1"
                        max="10"
                        value={quan}
                        placeholder="1"
                        onChange={e => props.handleChange(idx, e)}
                      />
                    </div>
                    <div>
                      <Button
                        type="button"
                        color="danger"
                        className="remove-product"
                        onClick={() => props.removeCartItem(item, idx)}>
                        Remove
                      </Button>
                    </div>
                    <div>${(item.price * quan).toFixed(2)}</div>
                  </div>
                );
              })}
          </div>
          <div className="totals">
            GrandTotal: ${grandTotal.toFixed(2)}
            <Link to="/checkout">
              <Button color="success" type="button" className="checkout">
                Checkout
              </Button>
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
                    <Button
                      type="button"
                      onClick={() => props.handleDelete(user.id, allProds.id)}>
                      Remove
                    </Button>
                  </div>
                  <div>{allProds.price}</div>
                </div>
              );
            })}
          <div className="totals">
            Total: {total.toFixed(2)}
            <Link to="/checkout">
              <Button
                type="button"
                onClick={() => handleCheckout(user.id)}>
                Checkout
              </Button>
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
      dispatch(quantityOfItem(index, evt));
    },
    removeCartItem(item, index) {
      dispatch(removeFromCartList(item, index));
    },
    handleDelete(userId, productId) {
      dispatch(deleteTheItem(userId, productId));
    },
    handleCheckout(userId) {
      dispatch(changedOrder(userId, { status: true }));
    }
  };
};

export default connect(
  mapState,
  mapDispatch
)(Cart);
