import React from 'react';
import {
  HashRouter as Router, 
  Route
} from 'react-router-dom';
import Product from './components/Product';
import ShowProduct from './components/ShowProduct';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Route exact path="/" component={Product} />
        <Route exact path="/products/:productId" component={ShowProduct} />
      </div>
    </Router>
  );
}

export default App;