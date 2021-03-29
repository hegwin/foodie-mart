import React, { Component, createContext } from 'react'

import Container from '@material-ui/core/Container'
import NavBar from './NavBar'
import Copyright from './Copyright'

import { CartProvider } from '../utils/cartContext'

class AppLayout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      numInCart: 0
    }

    this.updateCartState = this.updateCartState.bind(this);

  }

  updateCartState(state) {
    this.setState({
      numInCart: this.state.numInCart + 1,
    })
  }

  render() {
    return(
      <Container maxWidth="lg">
        <CartProvider value={{ numInCart: this.state.numInCart, updateCartState: this.updateCartState }}>
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
