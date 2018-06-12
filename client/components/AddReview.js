import React from 'react';
import { connect } from 'react-redux';
// import { addNewReview } from '../store';
import { Link } from 'react-router-dom';
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import '../styles/singleProduct.css';

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
  }

  render() {
    const { currUser } = this.props;

    console.log('STATE', this.state);
    console.log('PROPS', this.props);

    return (
      <div>
        {currUser && currUser.id ? (
          <div>
            <h3>{currUser.firstName}, leave your review below</h3>
            <Form onChange={this.handleForm}>
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
              <Button type="button" onClick={this.handleSubmit}>
                Submit
              </Button>
            </Form>
          </div>
        ) : (
          <div>
            <h2>
              Please <Link to="/login">login</Link> or
              <Link to="/signup">signup</Link> to leave a review
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

// const mapDispatch = dispatch => {
//   return {
//   };
// };

export default connect(mapState, null)(AddReview);
