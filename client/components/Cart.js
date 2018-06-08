import React from 'react';
// import { connect } from 'react-redux';

// import '../styles/productList.css';

/**
 * COMPONENT
 */
export default class Cart extends React.Component {
  constructor() {
    super();
    this.state = {
      cartItems: ['apple', 'banana', 'orange']
    };
  }

  handleClick = item => {
    //change state
    this.setState({ cartItems: [...this.state.cartItems, item] });
    // console.log(this.state);
    //change localStorage

    localStorage.setItem(
      JSON.stringify(this.state.cartItems.indexOf(item)),
      item
    );
    let k = localStorage.getItem(
      JSON.stringify(this.state.cartItems.indexOf(item))
    );
    console.log(k, 'items retrieved!!');
  };

  // componentDidMount() {
  //   //change local state and localStorage (x2)
  // }

  render() {
    const cart = this.state.cartItems;
    console.log(cart);
    return (
      <div>
        {cart.map((item, idx) => {
          return (
            <button onClick={() => this.handleClick(item)} key={idx}>
              {item}
            </button>
          );
        })}
        <h1>this is in the cart</h1>
      </div>
    );
  }
}

// export const Products = connect(mapProducts)(Cart);

// const mapDispatch = () => {
//   return {
//     addItemToCart: item => {
//       localStorage.getItem('product') === null
//         ? localStorage.setItem('product', JSON.stringify([item.id]))
//         : SaveToCart(item.id);
//     }
//   };
// };

// function SaveToCart(data) {
//   let products = [];
//   products = JSON.parse(localStorage.getItem('product'));
//   products.push(data);
//   localStorage.setItem('product', JSON.stringify(products));
