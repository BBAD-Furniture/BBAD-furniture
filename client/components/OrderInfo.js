import React from 'react';
import { connect } from 'react-redux';
import { getUserOrders, getUserOrdersDetails } from '../store';
import { Link } from 'react-router-dom';
import '../styles/cart.css';
import user from '../store/user';

class OrderInfo extends React.Component {
  // constructor(props) {
  //   super(props);
  // }

  componentDidMount() {
    const userId = this.props.user.id;
    this.props.getUserOrders(userId);
    this.props.getOrderDetails(userId);
  }

  render() {
    return <div>ORDER INFO PAGE</div>;
  }
}

const mapState = state => {
  return {
    orders: state.orders,
    user: state.user,
    orderDetails: state.orderDetails
  };
};

const mapDispatch = dispatch => {
  return {
    getUserOrders: userId => {
      dispatch(getUserOrders(userId));
    },
    getOrderDetails: userId => {
      dispatch(getUserOrdersDetails(userId));
    }
  };
};

export default connect(mapState, mapDispatch)(OrderInfo);
