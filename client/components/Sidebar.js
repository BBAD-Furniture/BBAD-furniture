import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { getFilter } from '../store';

import '../styles/sidebar.css';

const Sidebar = props => {
  let products = props.products || [];
  let categories = Array.from(
    new Set(products.map(product => product.category))
  );
  let colors = Array.from(new Set(products.map(product => product.color)));

  return (
    <div className="sidebar-container">
      <h2 className="sidebar-title"> Filter By</h2>

      <div className="filter-section">
        <h3>Categories</h3>
        {categories.map(category => (
          <p className="filter-item" key={category}>
            {category}
          </p>
        ))}
      </div>
      <div className="filter-section">
        <h3>Colors</h3>
        {colors.map(color => (
          <p className="filter-item" key={color}>
            {color}
          </p>
        ))}
      </div>
    </div>
  );
};

const mapState = state => {
  return {
    products: state.products
  };
};
const mapDispatch = dispatch => {
  return {
    filterFunc: filter => dispatch(getFilter(filter))
  };
};

export default connect(
  mapState,
  mapDispatch
)(Sidebar);
