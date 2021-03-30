import React, { Component, createContext } from 'react'

import Container from '@material-ui/core/Container'
import NavBar from './NavBar'
import Copyright from './Copyright'

import { CartProvider } from '../utils/cartContext'
import { SessionProvider } from '../utils/sessionContext'

class AppLayout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cart: {},
      currentUser: JSON.parse(localStorage.getItem('currentUser'))
    }

    this.addToCart = this.addToCart.bind(this)
    this.removeFromCart = this.removeFromCart.bind(this)
    this.clearCart = this.clearCart.bind(this)
    this.setCurrentUser = this.setCurrentUser.bind(this)
    this.refreshCurrentUser = this.refreshCurrentUser.bind(this)
  }

  setCurrentUser(currentUser) {
    this.setState({ currentUser })
  }

  refreshCurrentUser() {
    const token = localStorage.getItem('TOKEN')

    if (token && !localStorage.getItem('currentUser')) {
      const url = 'api/v1/users/me'

      fetch(url, {
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}`  }
      })
        .then(response => {
          if (response.ok) {
            return response.json()
          }

          throw new Error('Request failed.')
        })
        .then(json => {
          this.setState({ currentUser: json })
          localStorage.setItem('currentUser', JSON.stringify(json))
        })
    }
  }

  addToCart(mealId, mealInfo) {
    let cart = this.state.cart

    if (cart[mealId] === undefined) {
      cart[mealId] = { ...mealInfo, amount: 1 }
    } else {
      cart[mealId].amount ++
    }

    this.setState({ cart })
  }

  removeFromCart(mealId) {
    let cart = this.state.cart

    if (cart[mealId]) {
      cart[mealId].amount --

      if (cart[mealId].amount === 0) {
        console.log('remove all')
        delete cart[mealId]
      }

      this.setState({ cart })
    }
  }

  clearCart() {
    console.log('cart clear')
    this.setState({ cart: {} })
  }

  render() {
    return(
      <Container maxWidth="lg">
        <SessionProvider value={{ currentUser: this.state.currentUser, setCurrentUser: this.setCurrentUser, refreshCurrentUser: this.refreshCurrentUser }}>
          <CartProvider value={{ cart: this.state.cart, addToCart: this.addToCart, removeFromCart: this.removeFromCart, clearCart: this.clearCart }}>
            <NavBar />
            <div className='App'>
              {this.props.children}
            </div>
            <Copyright />
          </CartProvider>
        </SessionProvider>
      </Container>
    )
  }
}

export default AppLayout
