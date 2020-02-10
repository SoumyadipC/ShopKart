import React, { Component } from 'react';

export default class Basket extends Component {
  render() {
    let checkout = this.props.checkout
    let cartProducts = this.props.cartProducts
    const basketItems = this.props.basketItems

    return (
      <div className="container" style={{ background: 'antiquewhite', width: 'auto' }}>
        {basketItems.length === 0
          ? <div style={{ color: 'red', padding: '10px' }}>Cart is empty</div> :
          <div style={{ color: 'red', padding: '10px' }}>You have {basketItems.length} items in the basket. <hr /></div>
        }
        {
          basketItems.length > 0 &&
          <div>
            {basketItems.map(item => (
              <div style={{ color: '#615b5b' }} key={item.id}>
                <b>{item.product_name} x {item.count}</b>
                <b style={{ float: 'right' }}>Rs {item.product_total}</b>
              </div>
            ))}
            <div style={{ color: '#615b5b' }} key={checkout.id}>
              <hr style={{ marginTop: '0px', marginBottom: '12px' }} />
              <b>Actual Price:</b>
              <b style={{ float: 'right' }}>Rs {checkout.basket_total}</b>
              <hr style={{ marginTop: '0px', marginBottom: '12px' }} />
              <b>Total Discount:</b>
              <b style={{ float: 'right' }}>Rs {checkout.basket_discount}</b>
              <hr style={{ marginTop: '0px', marginBottom: '12px' }} />
              <b>Amount Payable:</b>
              <b style={{ float: 'right' }}>Rs {checkout.amount_payable}</b>
            </div>
            <button className="btn btn-primary" style={{ width: '100%', marginTop: '10px', marginBottom: '10px', backgroundColor: '#409452' }}>Pay</button>
          </div>
        }
      </div >
    )
  }
}


