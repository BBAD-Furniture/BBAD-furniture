import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { updateUser } from '../store';

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
    <div>
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
        <div>
          {isAdmin ? (
            <div>
              <h3>Welcome, {fullName || email}</h3>
              <h6>Administrator Account</h6>
              <img src={profilePic} width="500" height="300" />
              <div>{email}</div>
              <button type="button" onClick={handleClick}>
                View All Users
              </button>
              <h3>Order History</h3>
              <div>
                {(curUser.orders || []).map(ord => {
                  if (ord.status) {
                    return (
                      <div key={ord.id}>
                        {ord.id} ----- Date: {ord.updatedAt.slice(0, 10)}
                      </div>
                    );
                  }
                })}
              </div>
              <h3>My Reviews</h3>
              {reviews &&
                reviews.map(review => (
                  <div key={review.id}>
                    --->
                    {review.review}
                  </div>
                ))}
            </div>
          ) : (
            <div>
              <h3>Welcome, {fullName || email}</h3>
              <img src={profilePic} width="500" height="300" />
              <div>{email}</div>
              <h3>Order History</h3>
              <div>
                {(curUser.orders || []).map(ord => {
                  if (ord.status) {
                    return (
                      <div key={ord.id}>
                        {ord.id} ----- Date: {ord.updatedAt.slice(0, 10)}
                      </div>
                    );
                  }
                })}
              </div>
              <h3>My Reviews</h3>
            </div>
          )}
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
    users: state.allUsers
  };
};

const mapDispatch = (dispatch, ownProps) => {
  return {
    handleClick() {
      ownProps.history.push('/users');
    },
    handleSubmit(id, password) {
      dispatch(updateUser(id, { password: password, resetPassword: false }));
    }
  };
};

export default connect(mapState, mapDispatch)(UserHome);

/**
 * PROP TYPES
 */
UserHome.propTypes = {
  email: PropTypes.string
};
