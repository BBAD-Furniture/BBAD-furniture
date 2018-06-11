import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
const EditProduct = props => {
  let selected = props.selected ? (
    props.selected
  ) : (
    <Redirect to="/addproduct" />
  );

  return (
    <div>
      <h1>Edit Product:</h1>
      <Form>
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
        <Button type="button">Submit</Button>
      </Form>
    </div>
  );
};

const mapState = state => {
  //
  return {
    selected: state.selectedProduct[0]
  };
};
export default connect(mapState)(EditProduct);
