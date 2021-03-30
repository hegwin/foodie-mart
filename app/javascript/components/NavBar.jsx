import React, { Component } from 'react'

import AppBar from '@material-ui/core/AppBar'
import ToolBar from '@material-ui/core/ToolBar'
import Badge from '@material-ui/core/Badge'
import IconButton from '@material-ui/core/IconButton'
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem'
import MenuIcon from '@material-ui/icons/Menu'
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart'
import Typography from '@material-ui/core/Typography'

import { CartConsumer } from '../utils/cartContext'
import { SessionConsumer } from '../utils/sessionContext'
import MenuItems from './MenuItems'


class NavBar extends Component {
  constructor(props) {
    super(props)

    this.state = {
      anchorEl: false,
      menuOpen: false,
      currentUser: JSON.parse(localStorage.getItem('currentUser'))
    }
    this.handleMenuClick = this.handleMenuClick.bind(this)
  }

  handleMenuClick(e) {
    const { menuOpen } = this.state
    const anchorEl = event.currentTarget
    this.setState({ menuOpen: !menuOpen, anchorEl }
    )
  }

  render() {
    const { menuOpen, anchorEl, currentUser } = this.state

    return(
      <AppBar>
        <ToolBar style={{color: 'white'}}>
          <IconButton color='inherit' edge='start' onClick={this.handleMenuClick}>
            <MenuIcon />
            <Menu id="menu-appbar" anchorEl={this.anchorEl} open={menuOpen}>
              <SessionConsumer>
                {
                  ({currentUser, setCurrentUser}) => {
                    return <MenuItems currentUser={currentUser} setCurrentUser={setCurrentUser} /> }
                }
              </SessionConsumer>
            </Menu>
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
