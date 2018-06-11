import React from 'react';
import { connect } from 'react-redux';
import {
  getCurrentProduct,
  addToCartList,
  addItem,
  removeCurrentProduct
} from '../store';
import { withRouter, Link } from 'react-router-dom';
import { Button } from 'reactstrap';
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
              <Button onClick={() => props.addProductToCart({ activeProduct })}>
                Add To Cart
              </Button>
            )}
            {props.currUser.isAdmin ? (
              <div>
                <Link to={`/products/${activeProduct.id}/edit`}>
                  <Button outline color="warning">
                    Edit Product
                  </Button>
                </Link>
                <Button
                  outline
                  color="danger"
                  onClick={() => props.handleClick('delete', activeProduct.id)}>
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
    users: state.allUsers,
    currUser: state.user
  };
};

const mapDispatch = dispatch => {
  return {
    fetchProduct: id => dispatch(getCurrentProduct(id)),
    addProductToCart: item => dispatch(addToCartList(item)),
    addProduct: (userId, item) => {
      dispatch(addItem(userId, { productId: item }));
    },
    handleClick(type, id) {
      switch (type) {
        case 'delete':
          dispatch(removeCurrentProduct(id));
          break;
        default:
          break;
      }
    }
  };
};

export default withRouter(connect(mapState, mapDispatch)(SingleProduct));
