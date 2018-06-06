import React from 'react';
import { connect } from 'react-redux';

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
      <ul>{colors.map(color => <li key={color}> {color} </li>)}</ul>
      <p> Category </p>
      <ul>
        {categories.map(category => <li key={category}> {category} </li>)}
      </ul>
    </div>
  );
};

const mapState = state => {
  return {
    products: state.products
  };
};

export default connect(mapState)(Sidebar);
