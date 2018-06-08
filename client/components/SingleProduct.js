import React from 'react';
import { connect } from 'react-redux';
import { getCurrentProduct, addToCartList } from '../store';
import { withRouter, Link } from 'react-router-dom';
import {
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  CardSubtitle,
  Button
} from 'reactstrap';
class SingleProduct extends React.Component {
  componentDidMount() {
    let id = this.props.match.params.id;
    if (id) this.props.fetchProduct(id);
  }
  render() {
    const stateProd = this.props.selectedProduct[0] || {};
    const propsFromParent = this.props.match.params.id
      ? stateProd
      : this.props.propsFromParent;

    return (
      <div>
        <Card className="product-item">
          <CardImg
            top
            width="100%"
            src={propsFromParent.image}
            alt="Card image cap"
          />
          <CardBody>
            <CardTitle>
              <strong>{propsFromParent.name}</strong>
            </CardTitle>
            <CardSubtitle>
              This is a description, we need a virtual to shorten descriptions.
            </CardSubtitle>
            <div className="product-description">
              <CardText>
                <strong>{propsFromParent.category}</strong>
              </CardText>
              <Link to={`/products/${propsFromParent.id}`}>
                <Button>Get Details</Button>
              </Link>
              <Button
                color="primary"
                onClick={() => this.props.handleClick(propsFromParent)}>
                Add To Cart
              </Button>
            </div>
          </CardBody>
        </Card>
      </div>
    );
  }
}

const mapState = state => {
  return {
    selectedProduct: state.selectedProduct
  };
};

const mapDispatch = dispatch => {
  return {
    fetchProduct: id => dispatch(getCurrentProduct(id)),
    handleClick: item => dispatch(addToCartList(item))
  };
};

export default withRouter(
  connect(
    mapState,
    mapDispatch
  )(SingleProduct)
);

{
  /*<div className="product-item" key={propsFromParent.id}>
        <Link to={`/products/${propsFromParent.id}`}>
          <img className="product-img" src={propsFromParent.image} />
        </Link>
        <h3 className="product-name">{propsFromParent.name}</h3>
        <p>{propsFromParent.description}</p>
        <p>button goes here</p>
        <p>
          <strong>Category:</strong> {propsFromParent.category}
        </p>
        <p>
          <strong>Color:</strong> {propsFromParent.color}
        </p>
    </div>*/
}
