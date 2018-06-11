import React from 'react';
import { connect } from 'react-redux';
import { Sidebar } from './index';
import { getCurrentProduct, addToCartList } from '../store';
import '../styles/productList.css';
import { Link } from 'react-router-dom';
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
  let products = props.filtered.length ? props.filtered : props.products;
  console.log(props.users);
  return (
    <div>
      <div className="flexWrap">
        <div className="sidebar">
          <Sidebar />
        </div>
        <div className="product-main">
          {products &&
            products.map(product => {
              let rating = product.reviews.length
                ? Math.round(
                    Number(
                      product.reviews.reduce((acc, currProduct) => {
                        return acc + currProduct.rating;
                      }, 0) / product.reviews.length
                    ) * 100
                  ) / 100
                : 'No reviews ';

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
                        <CardText>
                          <strong>{product.category} </strong>
                        </CardText>
                        <CardText>
                          <strong>Rating: {rating}</strong>
                        </CardText>

                        <Link to={`/products/${product.id}`}>
                          <Button
                            outline
                            color="secondary"
                            onClick={() => props.getCurrentProduct(product.id)}>
                            Get Details
                          </Button>
                        </Link>
                        <Button
                          outline
                          color="success"
                          onClick={() => props.addProductToCart(product)}>
                          Add To Cart
                        </Button>
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
    users: state.allUsers
  };
};
const mapDispatch = dispatch => {
  return {
    getCurrentProduct: id => dispatch(getCurrentProduct(id)),
    addProductToCart: product => dispatch(addToCartList(product))
  };
};
export const Products = connect(
  mapProducts,
  mapDispatch
)(ProductList);
