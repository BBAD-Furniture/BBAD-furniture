import React from 'react';
import { connect } from 'react-redux';
import { removeFromCartList, deleteTheItem, changedOrder } from '../store';
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

  // let itemCount = JSON.parse(localStorage.getItem('quantity'));
  console.log(signedInItems);
  let displayItems;
  if (user.id) {
    let cartList = signedInItems.map(items => items.productId);
    displayItems = cartItems
      .filter(item => cartList.includes(item.id))
      .concat(cartItems.filter(item => cartProducts.includes(item.productId)));
  } else {
    if (cartProducts)
      displayItems = cartItems.filter(item => cartProducts.includes(item.id));
  }
  // ? cartItems.filter((items, idx) => ).concat(
  //   cartItems.filter(item => cartProducts.includes(item.productId))

  // // signedInItems.concat(
  // //     cartProducts.filter(item => cartProducts.includes(item.productId))
  // //   )
  // : cartItems.filter(item => cartProducts.includes(item.id));
  // let grandTotal = 0;

  if (user.id) {
    //check LS first for products and place in cart (given with productID)
    //then pull up items preiviously placed in cart from the BE and combine with LS to render items
    console.log('signedInItems: w/User', signedInItems);
  } else {
    //strictly use LS for storing/rendering items to the cart

    console.log('signedInItems: w/out user', signedInItems);
  }

  //addToCart:
  //if user, persist to db and LS

  //removeFromCart
  //if user, delete from db and LS

  //updated cart view
  //only for users (concurrent with items in the LS)

  console.log(displayItems, 'displayItems');
  //===============================
  // let productsToDisplay = !Object.keys(user).length ? cartItems : signedInItems;
  // .concat(...JSON.parse(localStorage.getItem('products')))
  // .map(item => {
  //   if (typeof item === 'number') return item;
  //   return item.productId;
  // });
  // let grandTotal = 0;

  // if (user) {
  //   displayCartItems = product.map(item => {
  //     if (typeof productsToDisplay === 'number') {
  //     } else {
  //       productsToDisplay;
  //     }
  //   });
  // }

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
      <div>
        {displayItems &&
          displayItems.map(oneItem => {
            // const allProds = products.find(it => it.id === oneItem.productId);
            // total += allProds.price * oneItem.quantity;
            return (
              <div className="product" key={oneItem.id}>
                {/* <Link to={`/products/${allProds.id}`}>
                  <div className="product-image">
                    <img src={allProds.image} />
                  </div>
                </Link>
            */}
                <div>
                  <div className="product-name">{oneItem.name}</div>
                  {/* <p>{oneItem.description.slice(0, 25)}</p> */}
                </div>
                {/* <div>{allProds.price}</div>
                <div className="quantity">
                  <div>{oneItem.quantity}</div>
                </div> */}
                <div>
                  <button
                    type="button"
                    className="remove-product"
                    onClick={() => props.handleDelete(user.id, oneItem.id)}>
                    Remove
                  </button>
                </div>
                {/* <div>{allProds.price}</div> */}
              </div>
            );
          })}
        <div className="totals">
          Total: {total}
          <Link to="/checkout">
            <button
              type="button"
              className="checkout"
              onClick={() => handleCheckout(user.id)}>
              Checkout
            </button>
          </Link>
        </div>
      </div>
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
    removeCartItem(item) {
      dispatch(removeFromCartList(item));
    },
    handleDelete(userId, productId) {
      console.log(
        'deleteTheItem: userId, productId, from Cart',
        userId,
        productId
      );
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
