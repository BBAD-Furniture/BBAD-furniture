import React from 'react';
import { Link } from 'react-router-dom';

const SingleProduct = props => {
  console.log(props);
  return (
    <Link to={`/products/${props.id}`}>
      <div className="product-item">
        <h3>{props.item.name}</h3>
        <p>{props.item.description}</p>
        <p>${props.item.price}</p>
        <img src={props.item.image} />
      </div>
    </Link>
  );
};

export default SingleProduct;
