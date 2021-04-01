import React from 'react'
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom'

import AppLayout from '../components/AppLayout'

import RestaurantList from '../pages/Restaurant'
import Restaurant from '../pages/Restaurant/show'
import SignIn from '../pages/SignIn'
import SignUp from '../pages/SignUp'
import Cart from '../pages/Cart'
import MyOrder from '../pages/MyOrder'
import MyRestaurant from '../pages/MyRestaurant'
import NewRestaurant from '../pages/MyRestaurant/new'
import EditRestaurant from '../pages/MyRestaurant/edit'
import MyMeal from '../pages/MyMeal'
import NewMeal from '../pages/MyMeal/new'
import EditMeal from '../pages/MyMeal/edit'
import { SessionConsumer } from '../utils/sessionContext'

export default (
  <Router>
    <AppLayout>
      <SessionConsumer>
        { ({currentUser}) => {
          return (
            <Switch>
              <Route path="/restaurants" exact component={RestaurantList} />
              <Route path="/restaurants/:id" component={Restaurant} />
              <Route path="/sign_in" component={SignIn} />
              <Route path="/sign_up" component={SignUp} />
              <Route path="/cart" component={Cart} />
              <Route path="/orders" component={MyOrder} />
              <Route path="/my_restaurants/:id/edit" component={EditRestaurant} />
              <Route path="/my_restaurants/:restaurant_id/meals" exact component={MyMeal} />
              <Route path="/my_restaurants/:restaurant_id/meals/new" component={NewMeal} />
              <Route path="/my_restaurants/:restaurant_id/meals/:id/edit" component={EditMeal} />
              <Route path="/my_restaurants/new" component={NewRestaurant} />
              <Route path="/my_restaurants" component={MyRestaurant} />
              {
                currentUser && currentUser.role === 'restaurant_owner' ?
                  <Redirect to="/my_restaurants" /> :
                <Redirect to="/restaurants" />
              }
            </Switch>
          )
        }}
      </SessionConsumer>
    </AppLayout>
  </Router>
)
