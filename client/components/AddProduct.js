import React from 'react';
import {
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  FormText,
  Jumbotron,
  Container
} from 'reactstrap';
import { connect } from 'react-redux';
import '../styles/addProductForm.css';
import { addProductToStore } from '../store';
import notify from './notify';

class AddProduct extends React.Component {
  constructor() {
    super();
    this.state = {
      name: '',
      color: '',
      category: '',
      quantity: '',
      description: '',
      price: '',
      image: ''
    };
    this.handleForm = this.handleForm.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleForm(event) {
    let value = event.target.value;
    this.setState({ [event.target.name]: value });
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.newProduct(this.state);
  }
  render() {
    let adminOrNah = this.props.userStatus.isAdmin;
    return adminOrNah ? (
      <div>
        <h1>Add Product:</h1>

        <Form onChange={this.handleForm}>
          <FormGroup className="addproduct-form">
            <Label for="product-name">Name</Label>
            <Input
              required
              type="text"
              name="name"
              placeholder="Name of Product"
            />
            <FormText color="muted">Required*</FormText>
          </FormGroup>
          <FormGroup className="addproduct-form">
            <Label for="product-color">Color</Label>
            <Input
              required
              type="text"
              name="color"
              placeholder="Color of Product"
            />
            <FormText color="muted">Required*</FormText>
          </FormGroup>
          <FormGroup className="addproduct-form">
            <Label for="Category">Category</Label>
            <Input
              defaultValue="Living Room"
              required
              type="select"
              name="category">
              <option>Living Room</option>
              <option>Bathroom</option>
              <option>Bedroom</option>
              <option>Kitchen</option>
              <option>Office</option>
            </Input>
            <FormText color="muted">Required*</FormText>
          </FormGroup>
          <FormGroup className="addproduct-form">
            <Label for="quantity">Quantity</Label>
            <Input required name="quantity" type="number" />
            <FormText color="muted">Required*</FormText>
          </FormGroup>
          <FormGroup className="addproduct-form">
            <Label for="price">Price</Label>
            <Input required name="price" type="number" />
            <FormText color="muted">Required*</FormText>
          </FormGroup>
          <FormGroup className="addproduct-form">
            <Label for="Description">Product Description</Label>
            <Input required type="textarea" name="description" />
            <FormText color="muted">Required*</FormText>
          </FormGroup>
          <FormGroup className="addproduct-form">
            <Label for="image">Image URL</Label>
            <Input required type="url" name="image" />
          </FormGroup>
          <Button type="button" onClick={this.handleSubmit}>
            Submit
          </Button>
        </Form>
      </div>
    ) : (
      <div>
        <Jumbotron fluid>
          <Container fluid>
            <h1 className="display-3">Forbidden!</h1>
            <p className="lead">You must an Admin to view this page.</p>
          </Container>
        </Jumbotron>
      </div>
    );
  }
}

const mapState = state => {
  return {
    userStatus: state.user
  };
};
const mapDispatch = dispatch => {
  return {
    newProduct: newProduct => dispatch(addProductToStore(newProduct))
  };
};
export default connect(
  mapState,
  mapDispatch
)(AddProduct);
