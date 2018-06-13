import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import '../styles/addReview.css';

export class AddReview extends React.Component {
  constructor() {
    super();
    this.state = {
      review: '',
      rating: '',
      userId: '',
      productId: ''
    };
    this.handleForm = this.handleForm.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleForm(event) {
    let value = event.target.value;
    this.setState({
      [event.target.name]: value,
      userId: this.props.currUser.id,
      productId: this.props.selectedProduct.id
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.addAReview(this.state);
    event.target.review.value = '';
    event.target.rating.value = '';
  }

  render() {
    const { currUser } = this.props;

    return (
      <div className="addReview-main">
        {currUser && currUser.id ? (
          <div>
            <h3 className="addReview-name">
              {currUser.firstName}, leave your review below
            </h3>
            <Form
              className="addReview-form"
              onChange={this.handleForm}
              onSubmit={this.handleSubmit}>
              <div className="addReview-flex">
                <FormGroup className="addReview-item-rating">
                  <Label for="select-rating">Rating</Label>
                  <Input type="select" name="rating" defaultValue="5">
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                    <option>4</option>
                    <option>5</option>
                  </Input>
                  <FormText color="muted">Required*</FormText>
                </FormGroup>
                <FormGroup className="addReview-item">
                  <Label for="review-text">Review</Label>
                  <Input
                    required
                    type="textarea"
                    name="review"
                    placeholder="Enter your review"
                  />
                  <FormText color="muted">Required*</FormText>
                </FormGroup>
              </div>

              <Button className="addReview-button" type="submit">
                Submit
              </Button>
            </Form>
          </div>
        ) : (
          <div>
            <h2>
              Please <Link to="/login"> login </Link> or
              <Link to="/signup"> signup</Link> to leave a review
            </h2>
          </div>
        )}
      </div>
    );
  }
}

const mapState = state => {
  return {
    currUser: state.user,
    prodReviews: state.reviews,
    selectedProduct: state.selectedProduct[0]
  };
};

export default connect(
  mapState,
  null
)(AddReview);
