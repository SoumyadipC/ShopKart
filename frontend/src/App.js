import React, { Component } from "react";
import axios from "axios";
import Product from './components/Product';
import './App.css';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

class App extends Component {
  constructor() {
    super();
    this.state = {
      products: [],
      addedProducts: [],
      count: []
    };
  }

  componentWillMount() {
    // Get api request to fetch products from the databases
    fetch('/api/v1/products')
      .then(products => products.json())
      .then(products => {
        this.setState({
          products: products,
        })
      })
    // configuring CSRF token authenticity for users
    const csrfToken = document.querySelector('[name=csrf-token]').content
    axios.defaults.headers.common['X-CSRF-TOKEN'] = csrfToken
    // post api call to add products to cart
    axios.post(`/api/v1/baskets`)
      .then(res => {
        console.log(res);
        console.log(res.data);
      })
  }

  componentDidMount() {
    fetch('/api/v1/basket_items/get_items')
      .then(items => items.json())
      .then(items => {
        this.setState({
          count: items,
        })
      })
  }

  handleAddToCart = async (e, product) => {
    await axios.post('/api/v1/basket_items', product)

    await axios.get('/api/v1/basket_items/get_items')
      .then(items => {
        this.setState({
          count: items.data
        })
      })

  };

  render() {
    return (
      <div className="container" style={{ width: '100%' }}>
        <div className="navbar">
          <h1>E-commerce Shopping Cart Application
              <Link to="/my_cart" className="glyphicon glyphicon-shopping-cart" style={{ float: 'right' }}><span className="badge badge-light">{this.state.count.length}</span></Link></h1>
          <hr />
        </div>
        <div className="row">
          <div className="col-md-8">
            <Product
              products={this.state.products}
              handleAddToCart={this.handleAddToCart}
            />
          </div>
        </div>
      </div>
    );
  }

}

export default App;