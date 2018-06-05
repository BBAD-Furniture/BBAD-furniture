import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

/**
 * COMPONENT
 */
export const ProductList = props => {
    console.log(props);
    const products = props;
    return (
        <div>
            <h1>Loading products:</h1>
            {products.map(item => {
                return (
                    <div key={item.id} className="product-item">
                        <h3>{item.name}</h3>
                        <p>
                            {item.description}
                            ${item.price}
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

export default connect(mapState)(ProductList);
