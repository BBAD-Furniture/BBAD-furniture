import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { logout, getItems } from '../store';

import '../styles/navbar.css';

const Navbar = ({ handleClick, isLoggedIn, clickHandler, user }) => (
  <div className="nav-parent">
    <Link to="/" className="nav-logo">
      <h1>BBAD Furniture Co.</h1>
    </Link>
    <nav className="nav-links">
      {isLoggedIn ? (
        <div>
          {/* The navbar will show these links after you log in */}
          <Link to="/home">Home</Link>
          <a href="#" onClick={handleClick}>
            Logout
          </a>
          <Link to="/products">View All Products</Link>
          <a href="/cart" onClick={clickHandler(user.id)}>
            View Cart
          </a>
        </div>
      ) : (
        <div>
          {/* The navbar will show these links before you log in */}
          <Link to="/login">Login</Link>
          <Link to="/signup">Sign Up</Link>
          <Link to="/products">View All Products</Link>
          <Link to="/cart">View Cart</Link>
        </div>
      )}
    </nav>
    <hr />
  </div>
);

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    isLoggedIn: !!state.user.id,
    user: state.user
  };
};

const mapDispatch = dispatch => {
  return {
    handleClick() {
      localStorage.setItem('products', JSON.stringify([]));
      dispatch(logout());
    },
    clickHandler(id) {
      dispatch(getItems(id));
    }
  };
};

export default connect(mapState, mapDispatch)(Navbar);

/**
 * PROP TYPES
 */
Navbar.propTypes = {
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
};
