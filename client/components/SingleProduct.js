import React from 'react';
import { Link } from 'react-router-dom';

export const SingleProduct = props => {
  return (
    <Link to={`/products/${props.id}`}>
      <div className="product-item">
        <h3>{props.item.name}</h3>
        <p>
          {props.item.description}
          ${props.item.price}
        </p>
      </div>
    </Link>
  );
};
