import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
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
          <FormGroup className="addproduct-form">
            <Label for="product-name">Name</Label>
            <Input
              required
              type="text"
              name="name"
              defaultValue={selected.name}
              placeholder={selected.name}
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
              defaultValue={selected.color}
              placeholder={selected.color}
            />
            <FormText color="muted">Required*</FormText>
          </FormGroup>
          <FormGroup className="addproduct-form">
            <Label for="Category">Category</Label>
            <Input
              required
              type="select"
              name="category"
              defaultValue={selected.category}
              placeholder={selected.category}>
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
              defaultValue={selected.quantity}
              placeholder={selected.quantity}
            />
            <FormText color="muted">Required*</FormText>
          </FormGroup>
          <FormGroup className="addproduct-form">
            <Label for="price">Price</Label>
            <Input
              required
              name="price"
              defaultValue={selected.price}
              placeholder={selected.price}
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
              defaultValue={selected.description}
              placeholder={selected.description}
            />
            <FormText color="muted">Required*</FormText>
          </FormGroup>
          <FormGroup className="addproduct-form">
            <Label for="image">Image URL</Label>
            <Input
              required
              type="url"
              name="image"
              defaultValue={selected.image}
              placeholder={selected.image}
            />
          </FormGroup>
          <Button type="submit">Submit</Button>
        </Form>
      </div>
    ) : (
      <div> Loading Product info... </div>
    );
  }
}

const mapState = state => {
  return {
    selected: state.selectedProduct[0]
  };
};

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
