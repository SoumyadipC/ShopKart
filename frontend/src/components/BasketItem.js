import React, { Component } from 'react'
import axios from "axios";
import util from '../util'

class BasketItem extends Component {
  constructor() {
    super();
    this.state = {
      products: []
    };
  }
  handleRemoveFromCart = (e, item) => {
    this.props.removeFromCart(item)
  }
  render() {
    const productItems = this.props.products.map(product => (
      <div className="col-md-3" key={product.id}>
        <div className="thumbnail text-center">
          <a href={`#${product.id}`} onClick={(e) => this.props.handleAddToCart(e, product)}>
            <img src="https://media.newyorker.com/photos/5d24e367f64a0c0008c3977f/2:2/w_909,h_909,c_limit/Patterson-FashionEssay.jpg" alt={product.name} />
            <p>{product.name}</p>
          </a>
          <b>{util.formatCurrency(product.price)}</b>
          <br />
          <button style={{ float: 'center' }} className="btn btn-danger btn-xs"
            onClick={(e) => this.handleRemoveFromCart(e, product)}>Delete from cart</button>
        </div>
      </div>
    ));

    return (
      <div className="row">
        {productItems}
      </div>
    )
  }
}

export default BasketItem