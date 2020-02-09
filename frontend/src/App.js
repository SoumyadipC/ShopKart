import React, { Component } from "react";
import axios from "axios";
import Product from './components/Product';
import './App.css';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

class App extends Component {
  constructor() {
    super();
    this.state = {
      cartItems: [],
      products: [],
      addedProducts: [],
      flag: 0
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
          products: products,
          flag: 0
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

  render() {
    return (
      <div className="container" style={{ width: '100%' }}>
        <div className="navbar">
          <h1>E-commerce Shopping Cart Application
              <Link to="/my_cart" className="glyphicon glyphicon-shopping-cart" style={{ float: 'right' }}></Link></h1>
          <hr />
        </div>
        <div className="row">
          <div className="col-md-8">
            <Product
              products={this.state.products}
              flag={this.state.flag}
              handleAddToCart={this.handleAddToCart}
            />
          </div>
        </div>
      </div>
    );
  }

}

export default App;