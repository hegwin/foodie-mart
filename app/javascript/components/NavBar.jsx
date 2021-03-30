import React, { Component } from 'react'

import AppBar from '@material-ui/core/AppBar'
import ToolBar from '@material-ui/core/ToolBar'
import Badge from '@material-ui/core/Badge'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart'
import Typography from '@material-ui/core/Typography'

import { CartConsumer } from '../utils/cartContext';

class NavBar extends Component {
  render() {
    return(
      <AppBar>
        <ToolBar style={{color: 'white'}}>
          <IconButton color='inherit' edge='start'>
            <MenuIcon />
          </IconButton>
          <Typography component='h1' variant='h6' style={{flexGrow: 1}}>Hegwin's Foodie</Typography>

          <IconButton color='inherit' edge='end'>
            <CartConsumer>
              { ({cart}) => {
                return (
                  <Badge badgeContent={this.numInCart(cart)} color="secondary">
                    <ShoppingCartIcon />
                  </Badge>
                )
              }}
            </CartConsumer>
          </IconButton>
        </ToolBar>
      </AppBar>
    )
  }

  numInCart(cart) {
    let totalAmount = 0

    for (let mealId in cart) {
      totalAmount += cart[mealId].amount
    }

    return totalAmount
  }
}

export default NavBar
