import React, { Component }               from 'react'
import { Link }                           from 'react-router-dom'

class Product extends Component {

  state = {
    products: []
  }

  componentDidMount() {
    fetch('/api/v1/products')
      .then(products => products.json())
      .then(products => {
        this.setState({
          products: products
        })
      })
  }

  renderproducts = () => {
    return this.state.products.map(product => {
      return (
        <div key={product.id}>
          <li>
            <a href={"#/products/" + product.name} >
              {product.name}  Rs {product.price}
            </a>
          </li>
        </div>
      )
    })
  }

  render() {
    return (
      <div>
        {this.renderproducts()}
      </div>
    )
  }
}

export default Product