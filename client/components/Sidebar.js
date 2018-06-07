import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { getFilter } from '../store';

import '../styles/sidebar.css';

const Sidebar = props => {
  let products = props.products;
  let colors = [...new Set(products.map(product => product.color))];
  let categories = Array.from(
    new Set([].concat(...products.map(product => product.category)))
  );
  return (
    <div className="sidebar">
      <h2> Filter by</h2>
      <h3> Color </h3>
      <ul>
        {colors.map(color => (
          <li onClick={() => props.filterFunc({ color: color })} key={color}>
            <Link to="/filtered">{color}</Link>
          </li>
        ))}
      </ul>
      <p> Category </p>
      <ul>
        {categories.map(category => (
          <li
            onClick={() => props.filterFunc({ category: category })}
            key={category}>
            <Link to="/filtered">{category}</Link>
          </li>
        ))}
      </ul>
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
