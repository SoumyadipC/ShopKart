import React, { Component } from 'react'
import util from '../util'
import { Link } from 'react-router-dom'

class Product extends Component {

    render() {
        const productItems = this.props.products.map(product => (
            <div className="col-md-4" key={product.id}>
                <div className="thumbnail text-center">
                    <a href={`#${product.id}`} onClick={(e) => this.props.handleAddToCart(e, product)}>
                        <img src="https://media.newyorker.com/photos/5d24e367f64a0c0008c3977f/2:2/w_909,h_909,c_limit/Patterson-FashionEssay.jpg" alt={product.name} />
                        <p>{product.name}</p>
                    </a>
                    <b>{util.formatCurrency(product.price)}</b>
                    <button className="btn btn-primary" onClick={(e) => this.props.handleAddToCart(e, product)}>Add to cart</button>
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

export default Product