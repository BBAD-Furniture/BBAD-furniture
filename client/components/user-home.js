import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

/**
 * COMPONENT
 */
export const UserHome = props => {
  const {
    firstName,
    lastName,
    fullName,
    email,
    profilePic,
    reviews,
    isAdmin
  } = props.user;
  const { handleClick } = props;
  return (
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
          <h3>My Reviews</h3>
        </div>
      ) : (
        <div>
          <h3>Welcome, {fullName || email}</h3>
          <img src={profilePic} width="500" height="300" />
          <div>{email}</div>
          <h3>Order History</h3>
          <h3>My Reviews</h3>
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
    user: state.user
  };
};

const mapDispatch = (dispatch, ownProps) => {
  return {
    handleClick() {
      //GO TO ALL USERS PAGE
      ownProps.history.push('/users');
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
