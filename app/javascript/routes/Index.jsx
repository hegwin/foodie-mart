import React from 'react'
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom'

import RestaurantList from '../pages/Restaurant'
import Restaurant from '../pages/Restaurant/show'
import AppLayout from '../components/AppLayout'

export default (
  <AppLayout>
    <Router>
      <Switch>
        <Route path="/restaurants" exact component={RestaurantList} />
        <Route path="/restaurants/:id" component={Restaurant} />
        <Redirect to="/restaurants" />
      </Switch>
    </Router>
  </AppLayout>
)
