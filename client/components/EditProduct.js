import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
<<<<<<< HEAD
import {
  getCurrentProduct,
  editCurrentProduct,
  getProductList
} from '../store';
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';

class EditProduct extends React.Component {
  constructor() {
    super();
    this.handleSumbit = this.handleSumbit.bind(this);
  }
  componentDidMount() {
    this.props.triggerProductList();
  }

  handleSumbit = event => {
    event.preventDefault();
    let formobj = {
      name: event.target.name.value,
      color: event.target.color.value,
      category: event.target.category.value,
      quantity: event.target.quantity.value,
      price: event.target.price.value,
      description: event.target.description.value,
      image: event.target.image.value
    };
    this.props.edit(this.props.selected.id, formobj);
    
  };

  render() {
    let selected = this.props.selected
      ? this.props.selected
      : this.props.currentProduct(this.props.match.params.id);
    return this.props.selected ? (
      <div>
        <h1>Edit Product:</h1>
        <Form onSubmit={this.handleSumbit}>
=======
import history from '../history';
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';

class EditProduct extends React.Component {
  constructor(props) {
    super();
    this.state = {};
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit() {
    event.preventDefault();
  }
  render() {
    return this.props.selected ? (
      <div>
        <h1>Edit Product:</h1>
        <Form>
>>>>>>> master
          <FormGroup className="addproduct-form">
            <Label for="product-name">Name</Label>
            <Input
              required
              type="text"
              name="name"
<<<<<<< HEAD
              defaultValue={selected.name}
              placeholder={selected.name}
=======
              defaultValue={this.props.selected.name}
              placeholder={this.props.selected.name}
>>>>>>> master
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
<<<<<<< HEAD
              defaultValue={selected.color}
              placeholder={selected.color}
=======
              defaultValue={this.props.selected.color}
              placeholder={this.props.selected.color}
>>>>>>> master
            />
            <FormText color="muted">Required*</FormText>
          </FormGroup>
          <FormGroup className="addproduct-form">
            <Label for="Category">Category</Label>
            <Input
              required
              type="select"
              name="category"
<<<<<<< HEAD
              defaultValue={selected.category}
              placeholder={selected.category}>
=======
              defaultValue={this.props.selected.category}
              placeholder={this.props.selected.category}>
>>>>>>> master
              <option>Living Room</option>
              <option>Bathroom</option>
              <option>Bedroom</option>
            </Input>
            <FormText color="muted">Required*</FormText>
          </FormGroup>
          <FormGroup className="addproduct-form">
            <Label for="quantity">Quantity</Label>
            <Input
              required
              name="quantity"
              type="number"
<<<<<<< HEAD
              defaultValue={selected.quantity}
              placeholder={selected.quantity}
=======
              defaultValue={this.props.selected.quantity}
              placeholder={this.props.selected.quantity}
>>>>>>> master
            />
            <FormText color="muted">Required*</FormText>
          </FormGroup>
          <FormGroup className="addproduct-form">
            <Label for="price">Price</Label>
            <Input
              required
              name="price"
<<<<<<< HEAD
              defaultValue={selected.price}
              placeholder={selected.price}
=======
              defaultValue={this.props.selected.price}
              placeholder={this.props.selected.price}
>>>>>>> master
              type="number"
            />
            <FormText color="muted">Required*</FormText>
          </FormGroup>
          <FormGroup className="addproduct-form">
            <Label for="Description">Product Description</Label>
            <Input
              required
              type="textarea"
              name="description"
<<<<<<< HEAD
              defaultValue={selected.description}
              placeholder={selected.description}
=======
              defaultValue={this.props.selected.description}
              placeholder={this.props.selected.description}
>>>>>>> master
            />
            <FormText color="muted">Required*</FormText>
          </FormGroup>
          <FormGroup className="addproduct-form">
            <Label for="image">Image URL</Label>
            <Input
              required
              type="url"
              name="image"
<<<<<<< HEAD
              defaultValue={selected.image}
              placeholder={selected.image}
            />
          </FormGroup>
          <Button type="submit">Submit</Button>
        </Form>
      </div>
    ) : (
      <div> Loading Product info... </div>
=======
              defaultValue={this.props.selected.image}
              placeholder={this.props.selected.image}
            />
          </FormGroup>
          <Button onSubmit={this.handleSubmit} type="button">
            Submit
          </Button>
        </Form>
      </div>
    ) : (
      <div> {history.goBack()}</div>
>>>>>>> master
    );
  }
}

const mapState = state => {
  return {
    selected: state.selectedProduct[0]
  };
};
<<<<<<< HEAD

const mapDispatch = dispatch => {
  return {
    currentProduct: id => dispatch(getCurrentProduct(id)),
    edit: (id, obj) => dispatch(editCurrentProduct(id, obj)),
    triggerProductList: () => dispatch(getProductList())
  };
};
export default withRouter(
  connect(
    mapState,
    mapDispatch
  )(EditProduct)
);
=======
export default withRouter(connect(mapState)(EditProduct));
>>>>>>> master
