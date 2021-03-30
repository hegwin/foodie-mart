import React, { Component, createContext } from 'react'

import Container from '@material-ui/core/Container'
import NavBar from './NavBar'
import Copyright from './Copyright'

import { CartProvider } from '../utils/cartContext'

class AppLayout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cart: {}
    }

    this.addToCart = this.addToCart.bind(this)
    this.removeFromCart = this.removeFromCart.bind(this)
    this.clearCart = this.clearCart.bind(this)
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
        <CartProvider value={{ cart: this.state.cart, addToCart: this.addToCart, removeFromCart: this.removeFromCart, clearCart: this.clearCart }}>
          <NavBar />
          <div className='App'>
            {this.props.children}
          </div>
          <Copyright />
        </CartProvider>
      </Container>
    )
  }
}

export default AppLayout
