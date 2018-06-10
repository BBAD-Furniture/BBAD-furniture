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
class Cart extends React.Component {
  constructor() {
    super();
    this.state = {
      addedCartItems: [],
      selectedItem: {},
      count: 1
    };
  }

  // shouldComponentUpdate() {
  //   this.setState({
  //     addedCartItems: this.props.cartList
  //   });
  // }

  // handleChange = (item, evt) => {
  //   const count = evt.target.value;
  //   const selectedItem = item;
  //   this.setState({ selectedItem, count });
  // };

  render() {
    let cartItems = this.props.products;
    let cartProducts = JSON.parse(localStorage.getItem('products'));

    localStorage.setItem('quantity', JSON.stringify(cartProducts.map(i => 1)));
    let itemCount = localStorage.getItem('quantity');
    console.log(itemCount);

    cartItems = cartProducts
      ? cartItems.filter(item => cartProducts.includes(item.id))
      : [];

    return (
      <div className="product-main">
        {cartItems &&
          cartItems.map((item, idx) => {
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
                        <select
                          id="qty"
                          onChange={e => this.props.handleChange(idx, e)}>
                          <option />
                          <option>1</option>
                          <option>2</option>
                          <option>3</option>
                          <option>4</option>
                          <option>5</option>
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
                  <button onClick={() => this.props.removeCartItem(item)}>
                    Remove Item
                  </button>
                </Card>
              </div>
            );
          })}
        <Link to="/checkout">
          <button>Checkout</button>
        </Link>
      </div>
    );
  }
}

const mapState = state => {
  return {
    products: state.products,
    cartList: state.cartList
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
  };
};

export default connect(
  mapState,
  mapDispatch
)(Cart);
