import React, { Component } from "react";
import BasketItem from './BasketItem';
import Basket from './Basket';
import axios from "axios";

class Cart extends Component {
  constructor() {
    super();
    this.state = {
      savedProducts: [],
      basketItems: [],
      checkout: []
    };
  }

  componentWillMount() {
    fetch('/api/v1/basket_items')
      .then(savedProducts => savedProducts.json())
      .then(savedProducts => {
        this.setState({
          savedProducts: savedProducts
        })
      })

    fetch('/api/v1/checkout')
      .then(checkout => checkout.json())
      .then(checkout => {
        this.setState({
          checkout: checkout
        })
      })
    const csrfToken = document.querySelector('[name=csrf-token]').content
    axios.defaults.headers.common['X-CSRF-TOKEN'] = csrfToken

    axios.post('/api/v1/checkout/new')
      .then(res => {
        this.setState({
          checkout: res.data
        })
      })

    fetch('/api/v1/basket_items/get_items')
      .then(basketItems => basketItems.json())
      .then(basketItems => {
        this.setState({
          basketItems: basketItems
        })
      })
  }

  handleRemoveFromCart = async (item) => {
    const csrfToken = document.querySelector('[name=csrf-token]').content
    axios.defaults.headers.common['X-CSRF-TOKEN'] = csrfToken
    // post api call to fetch products to cart
    await axios.put(`/api/v1/basket_items/delete`, { id: item.id }).then(res => {
      this.setState({
        savedProducts: res.data
      })
    })
    // post api call to fetch updated cart items
    await axios.get(`/api/v1/basket_items/get_items`).then(res => {
      this.setState({
        basketItems: res.data
      })
    })
    // post api call to fetch updated checkout details
    await axios.get(`/api/v1/checkout/update_checkout`).then(res => {
      this.setState({
        checkout: res.data
      })
    })
  }

  render() {
    return (
      <div className="container" style={{ width: '100%' }}>
        <div className="navbar">
          <h1>E-commerce Shopping Cart Application</h1>
          <hr />
        </div>
        <div className="row">
          <div className="col-md-8">
            <BasketItem
              products={this.state.savedProducts}
              removeFromCart={this.handleRemoveFromCart.bind(this)}
            />
          </div>
          <div className="col-md-3">
            <Basket
              cartProducts={this.state.savedProducts}
              basketItems={this.state.basketItems}
              checkout={this.state.checkout}
            />
          </div>
        </div>
      </div>
    );
  }

}

export default Cart;