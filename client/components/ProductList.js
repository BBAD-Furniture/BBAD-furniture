import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Sidebar } from '../components';

import '../styles/productList.css';
import Filtered from './Filtered';

/**
 * COMPONENT
 */
export const ProductList = props => {
	const { products } = props;
	console.log(products, "PRODUCTS");
	return (
		<div className="flexWrap">
			<div className="sidebar">
				<Sidebar />
			</div>
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
		</div>
	);
};

/**
 * CONTAINER
 */
// const mapState = state => {
// 	return {
// 		products: state.products
// 	};
// };

// export default connect(mapState)(ProductList);

const mapProducts = state => {
	return {
		products: state.products
	};
};

export const Products = connect(mapProducts)(ProductList);
