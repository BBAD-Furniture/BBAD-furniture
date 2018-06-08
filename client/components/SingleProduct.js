import React from 'react';
import { connect } from 'react-redux';
import { getCurrentProduct, addToCartList } from '../store';
import { withRouter, Link } from 'react-router-dom';
class SingleProduct extends React.Component {
  constructor() {
    super();
  }

  componentDidMount() {
    let id = this.props.match.params.id;
    if (id) this.props.fetchProduct(id);
  }
  render() {
    const stateProd = this.props.selectedProduct[0] || {};
    const propsFromParent = this.props.match.params.id
      ? stateProd
      : this.props.propsFromParent;
    // console.log(propsFromParent);
    return (
      <div className="product-item" key={propsFromParent.id}>
        <Link to={`/products/${propsFromParent.id}`}>
          <img src={propsFromParent.image} />
        </Link>
        <h3>{propsFromParent.name}</h3>
        <p>
          <strong>Description: </strong>
          {propsFromParent.description}
        </p>
        <p>button goes here</p>
        <p>
          <strong>Category:</strong> {propsFromParent.category}
        </p>
        <p>
          <strong>Color:</strong> {propsFromParent.color}
        </p>
        <button onClick={() => this.props.handleClick(propsFromParent)}>
          Add To Cart
        </button>
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
