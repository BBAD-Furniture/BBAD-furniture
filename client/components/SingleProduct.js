import React from 'react';
import { connect } from 'react-redux';
import {
  getCurrentProduct,
  addToCartList,
  removeCurrentProduct
} from '../store';
import { withRouter, Link } from 'react-router-dom';
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import '../styles/singleProduct.css';

const SingleProduct = props => {
  const { currUser, addProduct } = props;
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
            {Object.keys(currUser).length ? (
              <Button onClick={() => addProduct(currUser.id, activeProduct.id)}>
                ADD TO CART
              </Button>
            ) : (
              <Button onClick={() => props.addProductToCart(activeProduct)}>
                Add To Cart
              </Button>
            )}
            {props.currUser.isAdmin ? (
              <div>
                <Link
                  to={{
                    pathname: '/editproduct',
                    state: { product: props.selectedProduct }
                  }}>
                  <Button outline color="warning">
                    Edit Product
                  </Button>
                </Link>
                <Button
                  outline
                  color="danger"
                  onClick={() => props.deleteProduct(activeProduct.id)}>
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
              {activeProduct.category}
            </span>
          </p>
          <p className="singleproduct-categories">
            <strong>Color:</strong>
            <span className="singleproduct-singleCategory">
              {activeProduct.color}
            </span>
          </p>
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
        {props.currUser ? (
          <div>
            <h3>Leave a review below</h3>
            <Form>
              <FormGroup className="writereview-form">
                <Label for="select-rating">Rating</Label>
                <Input type="select" name="rating">
                  <option>1</option>
                  <option>2</option>
                  <option>3</option>
                  <option>4</option>
                  <option>5</option>
                </Input>
                <FormText color="muted">Required*</FormText>
              </FormGroup>
              <FormGroup className="writereview-form">
                <Label for="review-text">Review</Label>
                <Input
                  required
                  type="textarea"
                  name="review"
                  placeholder="Enter your review"
                />
                <FormText color="muted">Required*</FormText>
              </FormGroup>
              <Button>Submit</Button>
            </Form>
          </div>
        ) : (
          <div>
            <h2>Please login or signup to leave a review</h2>
          </div>
        )}
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
    deleteProduct: id => dispatch(removeCurrentProduct(id))
  };
};

export default withRouter(connect(mapState, mapDispatch)(SingleProduct));
