import React from 'react';
import { connect } from 'react-redux';
import { getCurrentProduct, addToCartList } from '../store';
import { withRouter } from 'react-router-dom';
import { Button } from 'reactstrap';
import '../styles/singleProduct.css';

const SingleProduct = props => {
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

  let trueRating = isNaN(rating) ? '' : rating;
  let reviews = activeProduct.reviews ? activeProduct.reviews.length : '';

  return (
    <div>
      <div className="singleproduct-parent">
        <div className="singleproduct-left">
          <img src={activeProduct.image} />
        </div>
        <div className="singleproduct-right">
          <div className="singleproduct-info">
            <h2>
              {activeProduct.name}
              <span className="singleproduct-rating">{trueRating}</span>
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
            <Button onClick={() => props.addProductToCart({ activeProduct })}>
              Add To Cart
            </Button>
          </div>
        </div>
      </div>
      <div className="singleproduct-reviews">
        <h1 className="singleproduct-reviewTitle"> Reviews </h1>
        {activeProduct.reviews &&
          activeProduct.reviews.map(review => {
            let user = props.users.find(elem => elem.id === review.userId);

            let trueUser = user || {};

            return (
              <div className="singleproduct-review" key={review.id}>
                <h4>
                  <span>
                    <img className="review-img" src={trueUser.profilePic} />
                  </span>
                  {trueUser.firstName} {trueUser.lastName}
                </h4>
                <p> Rating {review.rating} </p>
                <p> {review.review} </p>
              </div>
            );
          })}
      </div>
    </div>
  );
};

const mapState = state => {
  return {
    selectedProduct: state.selectedProduct[0],
    users: state.allUsers
  };
};

const mapDispatch = dispatch => {
  return {
    fetchProduct: id => dispatch(getCurrentProduct(id)),
    addProductToCart: item => dispatch(addToCartList(item))
  };
};

export default withRouter(
  connect(
    mapState,
    mapDispatch
  )(SingleProduct)
);
