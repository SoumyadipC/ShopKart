import React, { Component } from "react";
import axios from "axios";
import Product from './components/Product';
import Basket from "./components/Basket";
import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      cartItems: [],
      products: [],
      addedProducts: []
    };
  }

  componentWillMount() {
    if (localStorage.getItem("cartItems")) {
      this.setState({
        cartItems: JSON.parse(localStorage.getItem("cartItems"))
      });
    }
    // Get api request to fetch products from the databases
    fetch('/api/v1/products')
      .then(products => products.json())
      .then(products => {
        this.setState({
          products: products
        })
      })
  }

  handleAddToCart = (e, product) => {
    this.setState(state => {
      const cartItems = state.cartItems;
      let productAlreadyInCart = false;

      cartItems.forEach(cp => {
        if (cp.id === product.id) {
          cp.count += 1;
          productAlreadyInCart = true;
        }
      });

      if (!productAlreadyInCart) {
        cartItems.push({ ...product, count: 1 });
      }
      localStorage.setItem("cartItems", JSON.stringify(cartItems));
      return { cartItems: cartItems };
    });
    // configuring CSRF token authenticity for users
    const csrfToken = document.querySelector('[name=csrf-token]').content
    axios.defaults.headers.common['X-CSRF-TOKEN'] = csrfToken
    // post api call to add products to cart
    axios.post(`/api/v1/baskets`, product)
      .then(res => {
        console.log(res);
        console.log(res.data);
      })
  };

  handleRemoveFromCart = (e, product) => {
    this.setState(state => {
      const cartItems = state.cartItems.filter(a => a.id !== product.id);
      localStorage.setItem("cartItems", JSON.stringify(cartItems));
      return { cartItems: cartItems };
    });
  };

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