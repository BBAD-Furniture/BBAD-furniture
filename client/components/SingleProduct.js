import React from 'react';
import { connect } from 'react-redux';
import {
  getCurrentProduct,
  addToCartList,
  removeCurrentProduct,
  addItem,
  addNewReview
} from '../store';
import { withRouter, Link } from 'react-router-dom';
import { Button } from 'reactstrap';
import '../styles/singleProduct.css';
import { AddReview } from './AddReview';
import generateStars from './starGenerator';
import notify from './notify';

const SingleProduct = props => {
  const { currUser } = props;
  let activeProduct = props.selectedProduct
    ? props.selectedProduct
    : props.fetchProduct(props.match.params.id);
  let rating = activeProduct.reviews
    ? Math.round(
        Number(
          activeProduct.reviews.reduce((acc, currProduct) => {
            return acc + currProduct.rating;
          }, 0) / activeProduct.reviews.length
        ) * 100
      ) / 100
    : 'No reviews ';

  let reviews = activeProduct.reviews ? activeProduct.reviews.length : '';

  return (
    <div>
      <div className="singleproduct-parent">
        <div className="singleproduct-left">
          <img id="singleproduct-img" src={activeProduct.image} />
        </div>
        <div className="singleproduct-right">
          <div className="singleproduct-info">
            <h2>
              {activeProduct.name}
              <span className="singleproduct-rating">
                {generateStars(rating)}
              </span>
              <span className="singleproduct-numReviews">
                {reviews} Review(s)
              </span>
            </h2>
            <h3 className="singleproduct-price">${activeProduct.price}</h3>
            <p className="singleproduct-description">
              {activeProduct.description}
            </p>
          </div>
          <hr />
          <div className="singleproduct-buttonContainer">
            {Object.keys(currUser).length ? (
              <div>
                <Button
                  className="singleproduct-addToCart"
                  onClick={() => {
                    notify('Added To Cart');
                    props.addProduct(currUser.id, activeProduct.id);
                  }}>
                  Add To Cart
                </Button>
              </div>
            ) : (
              <div>
                <Button
                  onClick={() => {
                    notify('Added To Cart');
                    props.addProductToCart(activeProduct);
                  }}>
                  Add To Cart
                </Button>
              </div>
            )}
            {Object.keys(props.currUser).length ? (
              <div>
                <Link to={`/editproduct/${activeProduct.id}`}>
                  <Button outline color="warning">
                    Edit Product
                  </Button>
                </Link>
                <Button
                  outline
                  color="danger"
                  onClick={() => {
                    props.deleteProduct(activeProduct.id);
                  }}>
                  Delete Product
                </Button>
              </div>
            ) : (
              ''
            )}
          </div>
          <p className="singleproduct-categories">
            <strong>Category:</strong>
            <span className="singleproduct-singleCategory">
              {' '}
              {activeProduct.category}
            </span>
          </p>
          <p className="singleproduct-categories">
            <strong>Color:</strong>
            <span className="singleproduct-singleCategory">
              {' '}
              {activeProduct.color}
            </span>
          </p>
        </div>
      </div>
      <div className="singleproduct-reviews">
        <h1 className="singleproduct-reviewTitle"> Reviews </h1>
        {activeProduct.reviews &&
          activeProduct.reviews.map(review => {
            return (
              <div className="singleproduct-review" key={review.id}>
                <h4>
                  <span>
                    <img className="review-img" src={review.profilePic} />
                  </span>
                  {review.name}
                </h4>
                {generateStars(review.rating)}
                <p> {review.review} </p>
              </div>
            );
          })}
        <AddReview {...props} />
      </div>
    </div>
  );
};

const mapState = state => {
  return {
    selectedProduct: state.selectedProduct[0],
    users: state.allUsers,
    currUser: state.user
  };
};

const mapDispatch = dispatch => {
  return {
    fetchProduct: id => dispatch(getCurrentProduct(id)),
    addProductToCart: item => dispatch(addToCartList(item)),
    addProduct: (userId, productId) => dispatch(addItem(userId, { productId })),
    deleteProduct: id => dispatch(removeCurrentProduct(id)),
    addAReview: review => dispatch(addNewReview(review))
  };
};

export default withRouter(
  connect(
    mapState,
    mapDispatch
  )(SingleProduct)
);
