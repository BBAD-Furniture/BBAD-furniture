import React from 'react';
import { Link } from 'react-router-dom';

const SingleProduct = props => {
  console.log('HIT SINGLE PRODUCT', props);
  return (
    <Link to={`/products/${props.item.id}`}>
      <div className="product-item">
        <img src={props.item.image} />
        <h3>{props.item.name}</h3>
        <p>  <strong>Description: </strong>{props.item.description}</p>
        <p>
          <strong>Price:</strong> ${props.item.price}
        </p>
        <h3>
          <strong>Categories:</strong>
        </h3>
        <ul>
          {props.item.category.map((category, idx) => {
            return <li key={idx}>{category}</li>;
          })}
        </ul>
        <p>
          <strong>Color:</strong> {props.item.color}
        </p>
      </div>
    </Link>
  );
};

export default SingleProduct;
