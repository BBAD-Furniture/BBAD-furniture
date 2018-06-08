import React from 'react';
import { connect } from 'react-redux';
import { removeFromCartList } from '../store';
// import SingleProduct from './SingleProduct';
import { Link } from 'react-router-dom';
import {
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  CardSubtitle,
  Button
} from 'reactstrap';
// import '../styles/productList.css';

/**
 * COMPONENT
 */
const Cart = props => {
  console.log(props.count, 'this is in props');
  let cartItems = props.products;
  let cartProducts = JSON.parse(localStorage.getItem('products'));
  cartItems = cartProducts
    ? cartItems.filter(item => cartProducts.includes(item.id))
    : [];

  // console.log(document.getElementById('qty'));
  return (
    <div className="product-main">
      {cartItems &&
        cartItems.map(item => {
          return (
            <div key={item.id}>
              <Card className="product-item">
                <Link to={`/products/${item.id}`}>
                  <CardImg
                    top
                    width="100%"
                    src={item.image}
                    alt="Card image cap"
                  />
                </Link>
                <CardBody>
                  <CardTitle>
                    <strong>{item.name}</strong>
                  </CardTitle>
                  <CardSubtitle>
                    This is a description, we need a virtual to shorten
                    descriptions.
                  </CardSubtitle>
                  <div className="product-description">
                    <CardText>
                      <strong>Qty: </strong>
                      <select id="qty" onChange={e => props.handleChange(e)}>
                        <option />
                        <option>1</option>
                        <option>2</option>
                      </select>
                    </CardText>

                    <CardText>
                      <strong>
                        Price:
                        {item.price}
                      </strong>
                    </CardText>
                  </div>
                </CardBody>
                <button onClick={props.removeCartItem}>Remove Item</button>
              </Card>
            </div>
          );
        })}
      <Link to="/checkout">
        <button>Checkout</button>
      </Link>
    </div>
  );
};

const mapState = state => {
  return {
    products: state.products,
    count: 1
  };
};

const mapDispatch = dispatch => {
  return {
    handleChange(evt) {
      // console.log(evt.target.value, props);
      // state.setState({ quantity: 2 });
      // this.setState({ quantity: evt.target.value });
    },
    removeCartItem: item => dispatch(removeFromCartList(item))
  };
};

export default connect(
  mapState,
  mapDispatch
)(Cart);
