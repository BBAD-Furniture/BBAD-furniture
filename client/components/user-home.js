import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

/**
 * COMPONENT
 */
export const UserHome = props => {
  const { firstName, lastName, email, profilePic, reviews } = props.user;
  console.log('****', reviews);
  return (
    <div>
      <h3>Welcome, {firstName || email}</h3>
      <img src={profilePic} width="500" height="300" />
      <div>{email}</div>
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

// const mapDispatch = dispatch => {};

export default connect(mapState)(UserHome);

/**
 * PROP TYPES
 */
UserHome.propTypes = {
  email: PropTypes.string
};
