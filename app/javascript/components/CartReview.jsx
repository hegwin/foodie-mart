import React, { Component } from 'react'
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton';
import AddButton from '@material-ui/icons/AddCircle';
import RemoveButton from '@material-ui/icons/RemoveCircle'

import { formatPrice } from '../utils/formatter'

class CartReview extends Component {
  render() {
    const { cart, removeFromCart, addToCart } = this.props

    return(
      <div className="cart-review">
        <Typography variant="h6" gutterBottom>
          Confirm Items in Your Cart
        </Typography>
        <List disablePadding>
        {
          Object.keys(cart).map(mealId => {
            const { name, description, amount, price } = cart[mealId]
            return(
              <ListItem key={mealId} style={{ borderBottom: '1px #CCC solid' }}>
                <Typography variant="body1" style={{ flexGrow: '1' }}>{name}</Typography>

                <Typography variant="body2">{formatPrice(price)}</Typography>
                <IconButton onClick={() => removeFromCart(mealId) }>
                  <RemoveButton color='primary' />
                </IconButton>
                <span>{(cart[mealId] || {})['amount'] || 0}</span>
                <IconButton onClick={() => addToCart(mealId, { mealId, name, price })}>
                  <AddButton color='primary' />
                </IconButton>
              </ListItem>
            )
          })
        }
        </List>
      </div>
    )
  }
}

export default CartReview
