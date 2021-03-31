import React, { Component } from 'react'

import { withStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Paper from '@material-ui/core/Paper';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';

import { CartConsumer } from '../../utils/cartContext'

import CartReview from '../../components/CartReview'
import AddressForm from '../../components/AddressForm'
import OrderReview from '../../components/OrderReview'
import ErrorMessages from '../../components/ErrorMessages'

const styles = theme => ({
  layout: {
    width: 'auto',
    marginLeft: 0,
    marginRight: 0,
    [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
      width: 600,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  paper: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
    padding: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
      marginTop: theme.spacing(6),
      marginBottom: theme.spacing(6),
      padding: theme.spacing(3),
    },
  },
  stepper: {
    padding: theme.spacing(3, 0, 5),
  },
  buttons: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  button: {
    marginTop: theme.spacing(3),
    marginLeft: theme.spacing(1),
  },
})


const steps = ['Cart Review', 'Shipping Info', 'Review Your Order'];

function getStepContent(step, props) {
  switch (step) {
    case 0:
      return <CartReview {...props} />;
    case 1:
      return <AddressForm {...props} />;
    case 2:
      return <OrderReview {...props} />;
    default:
      throw new Error('Unknown step');
  }
}

class Cart extends Component {
  constructor(props) {
    super(props)
    this.state = {
      activeStep: 0,
      shipping_info:  {},
      errors: {},
      orderId: null
    }

    this.handleNext = this.handleNext.bind(this)
    this.handleBack = this.handleBack.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.placeOrder = this.placeOrder.bind(this)
  }

  handleNext() {
    this.setState({ activeStep: this.state.activeStep + 1 })
  }

  handleBack() {
    this.setState({ activeStep: this.state.activeStep - 1 })
  }

  handleChange(e) {
    const target = e.target
    const { name, value } = target

    this.setState({
      shipping_info: { ...this.state.shipping_info, [name]: value }
    })
  }

  placeOrder(cart, clearCart) {
    let errors = {}
    let { shipping_info } = this.state
    const url = '/api/v1/orders'
    const token = localStorage.getItem('TOKEN')

    if (Object.keys(cart).length === 0) { errors['cart'] = ['is empty'] }
    if (shipping_info['line1'] === undefined) { errors['address'] = ['is empty'] }

    if (Object.keys(errors).length > 0) {
      this.setState({ errors })
    } else {
      let payload = { shipping_info, order_items_attributes: []}

      for (let mealId in cart) {
        payload.order_items_attributes.push({ meal_id: mealId, amount: cart[mealId].amount })
      }

      fetch(url, { method: 'POST', headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` }, body: JSON.stringify(payload) })
        .then(response => {
          if (response.ok) {
            return response.json()
          } else if (response.status === 403) {
            this.setState({ errors: { restaurant: ['has blocked you'] }})

            throw new Error('In blacklist.')
          }

          throw new Error('Request failed.')
        })
        .then(result => {
          clearCart()
          this.setState({ orderId: result.id, activeStep: this.state.activeStep + 1 })
        })
    }
  }

  render() {
    const { classes } = this.props
    const { activeStep, errors } = this.state

    return(
      <main className={classes.layout} maxwidth="xs">
        <Paper className={classes.paper}>
          <Typography component="h1" variant="h5" align="center">
            Checkout
          </Typography>
          <Stepper activeStep={activeStep} className={classes.stepper}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          <ErrorMessages errors={errors} />
          <React.Fragment>
            {activeStep === steps.length ? (
              <React.Fragment>
                <Typography variant="h5" gutterBottom>
                  Thank you for your order.
                </Typography>
                <Typography variant="subtitle1">
                  Your order number is # {this.state.orderId}. You can track your order status in your order list.
                </Typography>
              </React.Fragment>
            ) : (
              <React.Fragment>
                <CartConsumer>
                  {
                    ({ cart, addToCart, removeFromCart, clearCart }) => {
                      return getStepContent(activeStep, { cart, addToCart, removeFromCart, clearCart, handleChange: this.handleChange, shipping_info: this.state.shipping_info })
                    }
                  }
                </CartConsumer>
                <div className={classes.buttons}>
                  {activeStep !== 0 && (
                    <Button onClick={this.handleBack} className={classes.button}>
                      Back
                    </Button>
                  )}
                  <CartConsumer>
                    {
                      ({cart, clearCart}) => {
                        return (
                          <Button variant="contained" color="primary" onClick={activeStep === steps.length - 1 ? () => { this.placeOrder(cart, clearCart) } : this.handleNext} className={classes.button}>
                            {activeStep === steps.length - 1 ? 'Place order' : 'Next'}
                          </Button>
                        )
                      }
                    }
                  </CartConsumer>
                </div>
              </React.Fragment>
            )}
          </React.Fragment>
        </Paper>
      </main>
    )
  }
}

export default withStyles(styles)(Cart)


