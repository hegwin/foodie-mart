import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Grid from '@material-ui/core/Grid';
import { formatPrice } from '../utils/formatter'

const styles = theme => ({
  listItem: {
    padding: theme.spacing(1, 0),
  },
  total: {
    fontWeight: 700,
  },
  title: {
    marginTop: theme.spacing(2),
  },
})

class OrderReview extends Component {
  render() {
    const { classes, cart, shipping_info } = this.props

    return (
      <React.Fragment>
        <Typography variant="h6" gutterBottom>
          Order Summary
        </Typography>
        <List disablePadding>
          {Object.keys(cart).map((mealId) => (
            <ListItem className={classes.listItem} key={mealId}>
              <ListItemText primary={cart[mealId].name} secondary={ `× ${cart[mealId].amount}`} />
              <Typography variant="body2">{formatPrice(cart[mealId].price * cart[mealId].amount)}</Typography>
            </ListItem>
          ))}
          <ListItem className={classes.listItem}>
            <ListItemText primary="Total" />
            <Typography variant="subtitle1" className={classes.total}>
              { formatPrice(this.totalPrice(cart)) }
            </Typography>
          </ListItem>
        </List>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={12}>
            <Typography variant="h6" gutterBottom className={classes.title}>
              Shipping
            </Typography>
            {
              Object.keys(shipping_info).map(key => (
                <Typography gutterBottom key={key}>{shipping_info[key]}</Typography>
              ))
            }
          </Grid>
        </Grid>
      </React.Fragment>
    )
  }

  totalPrice(cart) {
    let sum = 0

    for (let mealId in cart) {
      let { amount, price } = cart[mealId]
      sum += Number(amount) * Number(price)
    }

    return sum
  }
}

export default withStyles(styles)(OrderReview)
