import React from 'react'
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom'

import AppLayout from '../components/AppLayout'

import RestaurantList from '../pages/Restaurant'
import Restaurant from '../pages/Restaurant/show'
import SignIn from '../pages/SignIn'
import SignUp from '../pages/SignUp'

export default (
  <Router>
    <AppLayout>
      <Switch>
        <Route path="/restaurants" exact component={RestaurantList} />
        <Route path="/restaurants/:id" component={Restaurant} />
        <Route path="/sign_in" component={SignIn} />
        <Route path="/sign_up" component={SignUp} />
        <Redirect to="/restaurants" />
      </Switch>
    </AppLayout>
  </Router>
)
