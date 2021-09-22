import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Main, Login, OrderFormHook, ViewOrdersHook } from '../components';

const AppRouter = (props) => {
  return (
    <Router>
      <Route path="/" exact component={Main} />
      <Route path="/login" exact component={Login} />
      <Route path="/order" exact component={OrderFormHook} />
      <Route path="/view-orders" exact component={ViewOrdersHook} />
    </Router>
  );
}

export default AppRouter;
