import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
// import { Sidebar } from '../components';

import '../styles/productList.css';

/**
 * COMPONENT
 */
export const ProductList = props => {
<<<<<<< HEAD
  let products = props.products;
  return (
    <div className="product-main">
      {products &&
        products.map(item => {
          return (
            <div className="product-item" key={item.id}>
              <Link to={`/products/${item.id}`}>
                <img src={item.image} />
              </Link>
              <h3>{item.name}</h3>
              <p>
                <strong>Price:</strong> ${item.price}
              </p>
              <h3>
                <strong>Categories:</strong>
              </h3>
              <ul>
                {item.category.map((category, idx) => {
                  return <li key={idx}>{category}</li>;
                })}
              </ul>
              <p>
                <strong>Color:</strong> {item.color}
              </p>
            </div>
          );
        })}
    </div>
  );
=======
	let products = props.products;
	return (
		<div>
			<div>
				{products &&
					products.map(item => {
						return (
							<div className="product-item" key={item.id}>
								<Link to={`/products/${item.id}`}>
									<img src={item.image} />
								</Link>
								<h3>{item.name}</h3>
								<p>
									<strong>Description: </strong>
									{item.description}
								</p>
								<p>
									<strong>Price:</strong> ${item.price}
								</p>
								<h3>
									<strong>Categories:</strong>
								</h3>
								<ul>
									{item.category.map((category, idx) => {
										return <li key={idx}>{category}</li>;
									})}
								</ul>
								<p>
									<strong>Color:</strong> {item.color}
								</p>
							</div>
						);
					})}
			</div>
		</div>
	);
>>>>>>> ae7830581620cc02ad92967f7d15c6b0702534ae
};

/**
 * CONTAINER
 */
const mapState = state => {
	return {
		products: state.products
	};
};

export default connect(mapState)(ProductList);
