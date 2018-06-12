import React from 'react';
import { connect } from 'react-redux';
import { Sidebar } from './index';
import { getCurrentProduct, addToCartList, addItem } from '../store';
import '../styles/productList.css';
import { Link } from 'react-router-dom';
import generateStars from './starGenerator';
const isSmallScreen = window.innerWidth <= 1200;

import {
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  CardSubtitle,
  Button
} from 'reactstrap';
/**
 *
 * COMPONENT
 */
export const ProductList = props => {
  const { currUser, addProduct } = props;
  let filtered = props.filtered || props.products;
  let products = filtered.length ? props.filtered : props.products;
  return (
    <div>
      <div className="flexWrap">
        <div className="sidebar">
          <Sidebar />
        </div>
        <div className="product-main">
          {products &&
            products.map(product => {
              let rating =
                Math.round(
                  Number(
                    product.reviews.reduce((acc, currProduct) => {
                      return acc + currProduct.rating;
                    }, 0) / product.reviews.length
                  ) * 100
                ) / 100;

              return (
                <div key={product.id}>
                  <Card className="product-item">
                    <CardImg
                      top
                      width="100%"
                      src={product.image}
                      alt="Card image cap"
                    />
                    <CardBody>
                      <CardTitle>
                        <strong>{product.name}</strong>
                      </CardTitle>
                      <CardSubtitle>$ {product.price}</CardSubtitle>
                      <div className="product-description">
                        <div>{generateStars(rating)}</div>

                        <Link to={`/products/${product.id}`}>
                          <Button
                            outline
                            color="secondary"
                            onClick={() => props.getCurrentProduct(product.id)}>
                            Get Details
                          </Button>
                        </Link>

                        {Object.keys(currUser).length ? (
                          <Button
                            outline
                            color="success"
                            onClick={() => addProduct(currUser.id, product.id)}>
                            ADD TO CART
                          </Button>
                        ) : (
                          <Button
                            outline
                            color="success"
                            onClick={() => props.addProductToCart(product)}>
                            Add To Cart
                          </Button>
                        )}
                      </div>
                    </CardBody>
                  </Card>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
};

const mapProducts = state => {
  return {
    products: state.products,
    selectedProduct: state.selectedProduct,
    filtered: state.filter,
    currUser: state.user,
    users: state.allUsers
  };
};
const mapDispatch = dispatch => {
  return {
    getCurrentProduct: id => dispatch(getCurrentProduct(id)),
    addProductToCart: product => dispatch(addToCartList(product)),
    addProduct: (userId, item) => {
      dispatch(addItem(userId, { productId: item }));
    }
  };
};
export const Products = connect(mapProducts, mapDispatch)(ProductList);
