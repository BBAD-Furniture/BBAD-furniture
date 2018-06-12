import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { updateUser, getUserOrders } from '../store';
import { Link } from 'react-router-dom';
import { Table } from 'reactstrap';

import '../styles/userpage.css';
/**
 * COMPONENT
 */
export const UserHome = props => {
  const {
    fullName,
    email,
    profilePic,
    reviews,
    isAdmin,
    resetPassword,
    id
  } = props.user;
  const { handleClick, handleSubmit, users } = props;
  let curUser = users.find(userEle => userEle.id === props.user.id) || {};

  const handleSubmitFirst = evt => {
    // evt.preventDefault();
    const password = evt.target.password.value;
    evt.target.password.value = '';
    handleSubmit(id, password);
  };

  return (
    <div className="wrapper">
      {resetPassword ? (
        <div>
          <div>RESET YOUR PASSWORD</div>
          <form onSubmit={handleSubmitFirst} name={name}>
            <div>
              <label htmlFor="password">
                <small>Password</small>
              </label>
              <input name="password" type="password" />
            </div>
            <button type="submit">Reset Password</button>
          </form>
        </div>
      ) : (
        <div className="userpage-main">
          <div className="userpage-flex">
            <div className="userpage-info">
              <h3 className="userpage-welcome">Welcome, {fullName || email}</h3>

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
                    <button type="button" onClick={handleClick}>
                      View All Users
                    </button>
                    <Link className="userpage-addprodut" to="/addproduct">
                      Add Products
                    </Link>
                  </div>
                ) : null}
                <h3 className="userpage-email">{email}</h3>
              </div>
            </div>
            <div className="userpage-orders">
              <h3>Order History</h3>
              <Table className="userpage-table" hover>
                <thead>
                  <tr>
                    <th>Order Number</th>
                    <th>Date of Order</th>
                  </tr>
                </thead>
                <tbody>
                  {(curUser.orders || []).map(ord => {
                    if (ord.status) {
                      return (
                        <tr key={ord.id}>
                          <td>
                            <Link to={`/${ord.id}/orderInfo`}>
                              Order Number # {ord.id}
                            </Link>
                          </td>
                          <td>{ord.updatedAt.slice(0, 10)}</td>
                        </tr>
                      );
                    }
                  })}
                </tbody>
              </Table>
            </div>
          </div>

          <div className="userpage-reviews">
            <h3>My Reviews</h3>
            {reviews &&
              reviews.map(review => (
                <div className="userpage-review" key={review.id}>
                  --->
                  {review.review}
                </div>
              ))}
          </div>
        </div>
      )}
    </div>
  );
};

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    user: state.user,
    users: state.allUsers,
    order: state.order
  };
};

const mapDispatch = (dispatch, ownProps) => {
  return {
    handleClick() {
      ownProps.history.push('/users');
    },
    handleSubmit(id, password) {
      dispatch(updateUser(id, { password: password, resetPassword: false }));
    },
    getUserOrders: userId => {
      dispatch(getUserOrders(userId));
    }
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
