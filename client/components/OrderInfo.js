import React from 'react';
import { connect } from 'react-redux';
import {
  getUserOrders,
  getUserOrdersDetails,
  getCurrentProduct
} from '../store';
import { Link } from 'react-router-dom';
import '../styles/cart.css';

class OrderInfo extends React.Component {
  componentDidMount() {
    const userId = this.props.user.id;
    this.props.getUserOrders(userId);
    this.props.getOrderDetails(userId);
  }

  render() {
    let { orderDetails, products, fetchProduct } = this.props;
    orderDetails = orderDetails.reduce((a, c) => {
      return a.concat(c);
    }, []);
    const id = this.props.match.params.orderId;
    let totalPrice = 0;

    return (
      <div>
        <h1>ORDER INFO PAGE</h1>
        <div>
          <div />
          <h2> ORDER # {id}</h2>
          <div className="shopping-cart">
            <div className="column-labels">
              <label>Image</label>
              <label>Product</label>
              <label>Price</label>
              <label>Quantity</label>
              <label>Total</label>
            </div>
            {/* for each order, find the order detail with same id*/}
            {orderDetails.map((dets, indx) => {
              return dets.orderId === +id ? (
                <div key={indx}>
                  {products.map(ele => {
                    totalPrice += dets.price;
                    return ele.id === dets.productId ? (
                      <div className="product" key={ele.id}>
                        <a
                          href={`/products/${ele.id}`}
                          onClick={() => fetchProduct(id)}>
                          <div className="product-image">
                            <img src={ele.image} />
                          </div>
                        </a>
                        <div className="product-name">{ele.name}</div>
                        <div>${dets.price / dets.quantity}</div>
                        <div className="quantity"> {dets.quantity}</div>
                        <div>${dets.price}</div>
                      </div>
                    ) : null;
                  })}
                </div>
              ) : null;
            })}
            <div>Grand Total :{totalPrice}</div>
          </div>
        </div>
      </div>
    );
  }
}

const mapState = state => {
  return {
    user: state.user,
    orderDetails: state.orderDetails,
    products: state.products
  };
};

const mapDispatch = dispatch => {
  return {
    getUserOrders: userId => {
      dispatch(getUserOrders(userId));
    },
    getOrderDetails: userId => {
      dispatch(getUserOrdersDetails(userId));
    },
    fetchProduct: id => dispatch(getCurrentProduct(id))
  };
};

export default connect(mapState, mapDispatch)(OrderInfo);
