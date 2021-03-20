import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import RestaurantList from '../components/RestaurantList'

export default (
  <Router>
    <Switch>
      <Route path="/" exact component={RestaurantList} />
    </Switch>
  </Router>
);
