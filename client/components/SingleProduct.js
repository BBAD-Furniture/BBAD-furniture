import React from 'react';
import { connect } from 'react-redux';

const SingleProduct = props => {
	let id = Number(props.match.params.id);
	let item = props.products.find(singleProduct => singleProduct.id === id);

	return item ? (
		<div className="product-item" key={item.id}>
			<img src={item.image} />
			<h3>{item.name}</h3>
			<p>
				<strong>Description: </strong>
				{item.description}
			</p>
			<p>
				<button onClick={() => props.addItemToCart(item)}>Add to Cart</button>
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
	) : (
		<div />
	);
};

const mapState = state => {
	return {
		products: state.products
	};
};

const mapDispatch = dispatch => {
	return {
		addItemToCart: item => {
			localStorage.getItem('product') === null
				? localStorage.setItem('product', JSON.stringify([item.id]))
				: SaveToCart(item.id);
		}
	};
};

function SaveToCart(data) {
	let products = [];
	products = JSON.parse(localStorage.getItem('product'));
	products.push(data);
	localStorage.setItem('product', JSON.stringify(products));
}

export default connect(mapState, mapDispatch)(SingleProduct);
