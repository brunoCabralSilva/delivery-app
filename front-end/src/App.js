import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import './App.css';
import Login from './pages/Login';
import Products from './pages/products';
import Checkout from './pages/checkout';

function App() {
  return (
    <Switch>
      <Route exact path="/">
        <Redirect to="/login" />
      </Route>
      <Route exact path="/login" component={ Login } />
      <Route exact path="/customer/products" component={ Products } />
      <Route exact path="/customer/checkout" component={ Checkout } />
    </Switch>
  );
}

export default App;
