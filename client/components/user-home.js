import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  updateUser,
  getUserOrders,
  getAllUsers,
  getCurrentProduct
} from '../store';
import { Link } from 'react-router-dom';
import { Table, Button } from 'reactstrap';
import starGenerator from './starGenerator';

import '../styles/userpage.css';
/**
 * COMPONENT
 */
class UserHome extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmitFirst = this.handleSubmitFirst.bind(this);
    this.getProductFromReview = this.getProductFromReview.bind(this);
  }

  componentDidMount() {
    this.props.getUserOrders(this.props.user.id);
  }

  handleSubmitFirst(evt) {
    const password = evt.target.password.value;
    evt.target.password.value = '';
    this.props.handleSubmit(this.props.user.id, password);
  }

  getProductFromReview(review, column) {
    return this.props.products.filter(
      product => product.id === review.productId
    )[0][column];
  }

  render() {
    const {
      fullName,
      email,
      profilePic,
      reviews,
      isAdmin,
      resetPassword
    } = this.props.user;
    const { order, products } = this.props;
    return (
      <div className="wrapper">
        {resetPassword ? (
          <div>
            <div>RESET YOUR PASSWORD</div>
            <form onSubmit={this.handleSubmitFirst} name={name}>
              <div>
                <label htmlFor="password">
                  <small>Password</small>
                </label>
                <input name="password" type="password" />
              </div>
              <Button type="submit">Reset Password</Button>
            </form>
          </div>
        ) : (
          <div className="userpage-main">
            <div className="userpage-flex">
              <div className="userpage-info">
                <h3 className="userpage-welcome">
                  Welcome,{' '}
                  <span className="userpage-name">{fullName || email}</span>
                </h3>

                <div>
                  <img
                    className="userpage-img"
                    src={profilePic}
                    width="500"
                    height="300"
                  />
                  {isAdmin ? (
                    <div className="userpage-admin">
                      <h6 className="userpage-admin-title">
                        Administrator Account
                      </h6>
                      <Button
                        className="userpage-viewAllUsers"
                        outline
                        color="info"
                        type="Button"
                        onClick={this.props.handleClick}>
                        View All Users
                      </Button>
                      <Button outline color="success">
                        <Link className="userpage-addprodut" to="/addproduct">
                          Add Products
                        </Link>
                      </Button>
                    </div>
                  ) : null}
                  <h3 className="userpage-email">{email}</h3>
                </div>
              </div>
              <div className="userpage-table-main">
                <h3>Order History</h3>
                <div className="userpage-orders">
                  <Table className="userpage-table" hover>
                    <thead>
                      <tr>
                        <th>Order Number</th>
                        <th>Date </th>
                        <th>Time </th>
                        <th>Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {(order || []).map(ord => {
                        return (
                          <tr key={ord.id}>
                            <td>
                              <Link to={`/${ord.id}/orderInfo`}>#{ord.id}</Link>
                            </td>
                            <td>{ord.updatedAt.slice(0, 10)}</td>
                            <td>{ord.createdAt.slice(11, 16)}</td>
                            {ord.status === true ? (
                              <td>Processing</td>
                            ) : (
                              <td>In Progress</td>
                            )}
                          </tr>
                        );
                      })}
                    </tbody>
                  </Table>
                </div>
              </div>
            </div>

            <div className="userpage-reviews">
              <h3 className="userpage-reviewTitle">My Reviews</h3>

              {reviews &&
                reviews.map(review => (
                  <div className="userpage-review" key={review.id}>
                    <h3 className="userpage-review-name">
                      {this.getProductFromReview(review, 'name')}
                      <span>{starGenerator(review.rating)}</span>
                    </h3>
                    <Link
                      onClick={this.props.changeCurrProd(review.productId)}
                      to={`products/${review.productId}`}>
                      <img
                        className="userpage-review-img"
                        src={this.getProductFromReview(review, 'image')}
                      />
                    </Link>
                    <span className="userpage-review-single">
                      {review.review}
                    </span>
                  </div>
                ))}
            </div>
          </div>
        )}
      </div>
    );
  }
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    user: state.user,
    users: state.allUsers,
    order: state.order,
    products: state.products
  };
};

const mapDispatch = (dispatch, ownProps) => {
  return {
    handleClick() {
      dispatch(getAllUsers());
      ownProps.history.push('/users');
    },
    handleSubmit(id, password) {
      dispatch(updateUser(id, { password: password, resetPassword: false }));
    },
    getUserOrders: userId => {
      dispatch(getUserOrders(userId));
    },
    changeCurrProd: id => dispatch(getCurrentProduct(id))
  };
};

export default connect(
  mapState,
  mapDispatch
)(UserHome);

/**
 * PROP TYPES
 */
UserHome.propTypes = {
  email: PropTypes.string
};
