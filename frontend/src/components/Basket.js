import React, { Component } from 'react';
import util from '../util'
export default class Basket extends Component {
  render() {
    let checkout = this.props.checkout
    let cartProducts = this.props.cartProducts
    const basketItems = this.props.basketItems

    return (
      <div className="alert alert-info">
        {cartProducts.length === 0
          ? "Cart is empty" :
          <div>You have {cartProducts.length} items in the basket. <hr /></div>
        }
        {cartProducts.length > 0 &&
          <div>
            {basketItems.map(item => (
              <ul>
                <ul key={item.id}>
                  <b>x {item.count}</b>
                  <br />
                  <b>Product Price: {item.product_total}</b>
                </ul>
              </ul>
            ))}
            <ul>
              <ul key={checkout.id}>
                <b>Actual Price: {checkout.basket_total}</b>
                <br />
                <b>Total Price: {checkout.basket_discount}</b>
                <br />
                <b>Amount Payable: {checkout.amount_payable}</b>
              </ul>
            </ul>
            <button className="btn btn-primary" style={{ width: '100%' }}>Pay</button>
          </div>
        }
      </div>
    )
  }
}


