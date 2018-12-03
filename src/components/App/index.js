import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Home from '../Home';
import Login from '../Login';
import Header from '../Header';
import SignUpPageConnected from '../../containers/SignUpPage';

const App = () => (
  <BrowserRouter>
    <div>
      <Header />
      <Route exact path="/" component={Home} />
      <Route path="/login" component={Login} />
      <Route path="/signup" component={SignUpPageConnected} />
    </div>
  </BrowserRouter>
);


export default App;
