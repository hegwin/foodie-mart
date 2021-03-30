import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { withStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Typography from '@material-ui/core/Typography'

import { CartConsumer } from '../utils/cartContext';
import { formatDistance } from '../utils/formatter'


const styles = theme => ({
  root: {
    display: 'flex',
    height: 100,
    cursor: 'pointer'
  },
  cover: {
    height: 100,
    width: 80
  },
  distance: {
    color: '#CCC'
  }
})

class RestaurantItem extends Component {
  static defaultProps = {
    distance: -1
  }

  render () {
    const { id, name, description, image_url, distance, classes } = this.props

    return(
      <CartConsumer>
        {
          ({clearCart}) => {
            return <Card className={classes.root} onClick={() => {this.showRestaurant(clearCart)} }>
              <CardMedia className={classes.cover} image={image_url} />
              <CardContent>
                <Typography component='h2' variant='h6'>{name}</Typography>
                <Typography variant='body1'>{description}</Typography>
                <Typography variant='body2' className={classes.distance}>{formatDistance(distance)}</Typography>
              </CardContent>
            </Card>
          }
        }
      </CartConsumer>
    )
  }

  showRestaurant(clearCart) {
    const { id, name, description, image_url, distance } = this.props
    clearCart()
    this.props.history.push({pathname: `/restaurants/${id}`, state: {name, description, image_url, distance}})
  }
}

export default withRouter(withStyles(styles)(RestaurantItem));
