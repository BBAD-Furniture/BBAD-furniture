import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import history from '../history';
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';

class EditProduct extends React.Component {
  constructor() {
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
          <FormGroup className="addproduct-form">
            <Label for="product-name">Name</Label>
            <Input
              required
              type="text"
              name="name"
              defaultValue={this.props.selected.name}
              placeholder={this.props.selected.name}
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
              defaultValue={this.props.selected.color}
              placeholder={this.props.selected.color}
            />
            <FormText color="muted">Required*</FormText>
          </FormGroup>
          <FormGroup className="addproduct-form">
            <Label for="Category">Category</Label>
            <Input
              required
              type="select"
              name="category"
              defaultValue={this.props.selected.category}
              placeholder={this.props.selected.category}>
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
            <Input
              required
              name="quantity"
              type="number"
              defaultValue={this.props.selected.quantity}
              placeholder={this.props.selected.quantity}
            />
            <FormText color="muted">Required*</FormText>
          </FormGroup>
          <FormGroup className="addproduct-form">
            <Label for="price">Price</Label>
            <Input
              required
              name="price"
              defaultValue={this.props.selected.price}
              placeholder={this.props.selected.price}
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
              defaultValue={this.props.selected.description}
              placeholder={this.props.selected.description}
            />
            <FormText color="muted">Required*</FormText>
          </FormGroup>
          <FormGroup className="addproduct-form">
            <Label for="image">Image URL</Label>
            <Input
              required
              type="url"
              name="image"
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
    );
  }
}

const mapState = state => {
  return {
    selected: state.selectedProduct[0]
  };
};
export default withRouter(connect(mapState)(EditProduct));
