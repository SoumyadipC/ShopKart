import React from 'react';
import ReactDOM from 'react-dom';
import { Route, Link, BrowserRouter as Router } from 'react-router-dom'
import './index.css';
import Cart from "./components/Cart"
import App from './App';

const routing = (
  <Router>
    <div>
      <Route exact path="/" component={App} />
      <Route exact path="/my_cart" component={Cart} />
    </div>
  </Router>
)


ReactDOM.render(routing, document.getElementById('root'));