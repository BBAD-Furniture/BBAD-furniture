import React from 'react';
import { connect } from 'react-redux';
import { addNewReview } from '../store';
import { withRouter, Link } from 'react-router-dom';
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import '../styles/singleProduct.css';

export const AddReview = props => {
  const { currUser } = props;

  return (
    <div>
      {currUser.id ? (
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
            <Button type="button">Submit</Button>
          </Form>
        </div>
      ) : (
        <div>
          <h2>
            Please <Link to="/login">login</Link> or{' '}
            <Link to="/signup">signup</Link> to leave a review
          </h2>
        </div>
      )}
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

export default withRouter(connect(mapState, mapDispatch)(AddReview));
