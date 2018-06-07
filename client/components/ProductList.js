import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Sidebar } from '../components';

import '../styles/productList.css';

/**
 * COMPONENT
 */
export const ProductList = props => {
  const { products } = props;
  return (
    <div className="flexWrap">
      <div className="sidebar">
        <Sidebar />
      </div>
      <div className="product-main">
        {products &&
          products.map(item => {
            return <h1> REFACTOR </h1>;
          })}
      </div>
    </div>
  );
};

// <div className="product-item" key={item.id}>
// <Link to={`/products/${item.id}`}>
//   <img src={item.image} />
// </Link>
// <h3>{item.name}</h3>
// <p>
//   <strong>Price:</strong> ${item.price}
// </p>
// <h3>
//   <strong>Categories:</strong>
// </h3>
// <ul>
//   {item.category.map((category, idx) => {
// 	return <li key={idx}>{category}</li>;
//   })}
// </ul>
// <p>
//   <strong>Color:</strong> {item.color}
// </p>
// </div>
const mapProducts = state => {
  return {
    products: state.products
  };
};

export const Products = connect(mapProducts)(ProductList);
