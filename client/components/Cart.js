import React from 'react';
import { connect } from 'react-redux';

/**
 * COMPONENT
 */
const Cart = props => {
	let cartItems = props.products.filter(item =>
		JSON.parse(localStorage.getItem('product').includes(item.id))
	);
	return (
		<div>
			{cartItems.map(item => {
				return (
					<div key={item.id}>
						<img src={item.image} />
						<h3>{item.name}</h3>
						<p>
							<strong>Description: </strong>
							{item.description}
						</p>{' '}
						<p>
							<strong>Price:</strong> ${item.price}
						</p>
						<p>
							<strong>Color:</strong> {item.color}
						</p>
					</div>
				);
			})}
		</div>
	);
};

/**
 * CONTAINER
 */
const mapState = state => {
	return {
		products: state.products
	};
};

export default connect(mapState)(Cart);
