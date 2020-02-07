import React, { Component } from 'react';
import util from '../util'
export default class Basket extends Component {
  checkForPromotion = () => {
    fetch('/api/v1/checkout')
      .then(products => products.json())
      .then(products => {
        this.setState({
          products: products
        })
      })
  }
  render() {
    const { cartItems } = this.props;
    return (
      <div className="alert alert-info">
        {cartItems.length === 0
          ? "Basket is empty" :
          <div>You have {cartItems.length} items in the basket. <hr /></div>
        }
        {cartItems.length > 0 &&
          <div>
            <ul style={{ marginLeft: -25 }}>
              {cartItems.map(item => (
                <li key={item.id}>
                  <b>{item.name}</b>
                  <button style={{ float: 'right' }} className="btn btn-danger btn-xs"
                    onClick={(e) => this.props.handleRemoveFromCart(e, item)}>X</button>
                  <br />
                  {item.count} X {util.formatCurrency(item.price)}
                </li>))
              }
            </ul>
            <button onClick={this.checkForPromotion} className="btn btn-primary" style={{ "width": "100%" }}>check for promotions</button>
          </div>
        }
      </div>
    )
  }
}


