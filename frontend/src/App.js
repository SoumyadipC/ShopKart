import React, { Component } from "react";
// import {
//   HashRouter as Router, 
//   Route
// } from 'react-router-dom';
import Product from './components/Product';
import Basket from "./components/Basket";
import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      cartItems: [],
      products: []
    };
  }

  componentWillMount() {
    if (localStorage.getItem("cartItems")) {
      this.setState({
        cartItems: JSON.parse(localStorage.getItem("cartItems"))
      });
    }
    fetch('/api/v1/products')
      .then(products => products.json())
      .then(products => {
        this.setState({
          products: products
        })
      })
  }

  render() {
    return (
      <div className="container">
        <h1>E-commerce Shopping Cart Application</h1>
        <hr />
        <div className="row">
          <div className="col-md-8">
            <Product
              products={this.state.products}
              handleAddToCart={this.handleAddToCart}
            />
          </div>
          <div className="col-md-3">
            <Basket
              cartItems={this.state.cartItems}
              handleRemoveFromCart={this.handleRemoveFromCart}
            />
          </div>
        </div>
      </div>
    );
  }

}

export default App;