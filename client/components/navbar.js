import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { logout, getItems } from '../store';
import { Input, InputGroupText } from 'reactstrap';

import '../styles/navbar.css';

const Navbar = ({ handleClick, isLoggedIn, clickHandler, user }) => (
  <div className="nav-parent">
    <nav className="nav-links">
      {isLoggedIn ? (
        <div className="nav-links-container">
          <div className="nav-right">
            <Link to="/" className="nav-logo">
              <h1>BBAD Co.</h1>
            </Link>
            {/* The navbar will show these links after you log in */}
            <a href="#" onClick={handleClick}>
              Logout
            </a>
            <Link to="/products">View All Products</Link>
            <a href="/cart" onClick={clickHandler(user.id)}>
              View Cart
              <i className="fas fa-shopping-cart nav-cart" />
            </a>
          </div>
          <div className="nav-search">
            <Input placeholder="Search BBAD" />
          </div>
        </div>
      ) : (
        <div className="nav-links-container">
          {/* The navbar will show these links before you log in */}
          <div className="nav-right">
            <Link to="/" className="nav-logo">
              <h1>BBAD Co.</h1>
            </Link>
            <Link to="/login">Login</Link>
            <Link to="/signup">Sign Up</Link>
            <Link to="/products">View All Products</Link>
            <Link to="/cart">
              <i className="fas fa-shopping-cart nav-cart" />
            </Link>
          </div>
          <div className="nav-search">
            <Input placeholder="Search BBAD" />
          </div>
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
