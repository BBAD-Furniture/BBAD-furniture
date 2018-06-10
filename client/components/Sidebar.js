import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { filterProductByColor, filterProductByCategory } from '../store';
import { Button } from 'reactstrap';
import '../styles/sidebar.css';

const Sidebar = props => {
  let products = props.products || [];
  let categories = Array.from(
    new Set(products.map(product => product.category))
  );
  let colors = Array.from(new Set(products.map(product => product.color)));

  function handleCategory(event) {
    let category = event.target.textContent;
    props.filterCategory(category);
  }
  function handleColor(event) {
    let color = event.target.textContent;
    props.filterColor(color);
  }

  function resetFilter() {
    props.filterColor('');
  }

  return (
    <div className="sidebar-container">
      <h2 className="sidebar-title"> Filter By</h2>
      <div className="filter-section">
        <h3>Categories</h3>
        <Button
          className="sidebar-reset"
          onClick={resetFilter.bind(this)}
          outline
          color="success">
          Clear Filters
        </Button>{' '}
        {categories.map(category => (
          <p
            onClick={handleCategory.bind(this)}
            className="filter-item"
            key={category}>
            {category}
          </p>
        ))}
      </div>
      <div className="filter-section">
        <h3>Colors</h3>
        {colors.map(color => (
          <p
            onClick={handleColor.bind(this)}
            className="filter-item"
            key={color}>
            {color}
          </p>
        ))}
      </div>
    </div>
  );
};

const mapState = state => {
  return {
    products: state.products,
    filter: state.filter
  };
};
const mapDispatch = dispatch => {
  return {
    filterColor: filter => dispatch(filterProductByColor(filter)),
    filterCategory: filter => dispatch(filterProductByCategory(filter))
  };
};

export default connect(
  mapState,
  mapDispatch
)(Sidebar);
