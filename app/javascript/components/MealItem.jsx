import React, { Component } from 'react'

import { withStyles } from '@material-ui/core/styles'

import Grid from '@material-ui/core/Grid'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import CardActions from '@material-ui/core/CardActions'
import Typography from '@material-ui/core/Typography'

import IconButton from '@material-ui/core/IconButton';
import AddButton from '@material-ui/icons/AddCircle';
import RemoveButton from '@material-ui/icons/RemoveCircle'

import { formatPrice } from '../utils/formatter'
import { CartConsumer } from '../utils/cartContext';

class MealItem extends Component {
  render() {
    const { id, name, image_url, description, price } = this.props

    return(
      <Card>
        <CardMedia style={{height: 100}} image={image_url} />
        <CardContent>
          <Typography component='h2' variant='h6'>{name}</Typography>
          <Typography variant='body1'>{description}</Typography>
          <Typography variant='body1' color='primary' style={{marginTop: 16}}>{formatPrice(price)}</Typography>
        </CardContent>
        <CartConsumer>
          { ({cart, addToCart, removeFromCart}) => {
            return (
              <CardActions style={{justifyContent: 'flex-end', marginTop: -60}}>
                <IconButton onClick={() => removeFromCart(id) }>
                  <RemoveButton color='primary' />
                </IconButton>
                <span>{(cart[id] || {})['amount'] || 0}</span>
                <IconButton onClick={() => addToCart(id, { id, name, price })}>
                  <AddButton color='primary' />
                </IconButton>
              </CardActions>
            )
          }
        }
        </CartConsumer>
      </Card>
    )
  }
}

export default MealItem
