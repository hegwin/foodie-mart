import React, { Component } from 'react'
import clsx from 'clsx';
import { withStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Paper from '@material-ui/core/Paper';
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import { SessionConsumer } from '../../utils/sessionContext'
import { formatPrice, formatDateTime } from '../../utils/formatter'

const styles = theme => ({
  root: {
    width: 'auto',
    marginLeft: 0,
    marginRight: 0,
    [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
      width: 600,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  item: {
    width: '100%',
    marginTop: theme.spacing(2)
  },
  total: {
    borderTop: '1px #CCC solid'
  },
  historyItem: {
    textTransform: 'capitalize'
  }
})

const ORDER_ACTIONS = {
  regular: {
    placed: 'cancel',
    delivered: 'confirm_receipt'
  },
  restaurant_owner: {
    placed: 'confirm',
    processing: 'send_out',
    in_route: 'deliver'
  }
}

const actionButton = (id, status, currentUser, callback) => {
  if (status === 'placed' && currentUser.role === 'regular') {
    return <Button variant="contained" color="secondary" onClick={() => {callback(id, status, currentUser.role)} }>Cancel</Button>
  } else if (status === 'placed' && currentUser.role === 'restaurant_owner') {
    return <Button variant="contained" color="primary" onClick={() => {callback(id, status, currentUser.role)} }>Start to Make</Button>
  } else if (status === 'processing' && currentUser.role === 'restaurant_owner') {
    return <Button variant="contained" color="primary" onClick={() => {callback(id, status, currentUser.role)} }>Mark it On the Way</Button>
  } else if (status === 'in_route' && currentUser.role === 'restaurant_owner') {
    return <Button variant="contained" color="primary" onClick={() => {callback(id, status, currentUser.role)} }>Mark as Delivered</Button>
  } else if (status === 'delivered' && currentUser.role === 'regular' ) {
    return <Button variant="contained" color="primary" onClick={() => {callback(id, status, currentUser.role)} }>Confirm Receipt</Button>
  } else {
    return null
  }
}

class MyOrder extends Component {
  constructor(props) {
    super(props)

    this.state = { orders: [] }
    this.handleActionButtonClick = this.handleActionButtonClick.bind(this)
  }

  componentDidMount() {
    const token = localStorage.getItem('TOKEN')
    let url = '/api/v1/orders'
    const restaurant_id = 6

    if (!!restaurant_id) { url += `?restaurant_id=${restaurant_id}` }

    fetch(url, { headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` } })
      .then(response => {
        if (response.ok) {
          return response.json()
        }

        throw new Error('Request failed.')
      })
      .then(json => this.setState({ orders: json }))
  }

  handleActionButtonClick(id, status, role) {
    const action = ORDER_ACTIONS[role][status]
    const url = `/api/v1/orders/${id}/${action}`
    const token = localStorage.getItem('TOKEN')
    fetch(url, { method: 'POST', headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}`}})
      .then(response => {
        if (response.ok) {
          return response.json()
        }

        throw new Error('Request failed')
      })
      .then(json => {
        let { orders } = this.state
        const index = orders.findIndex((order) => order.id === json.id )
        orders[index] = json
        this.setState({ orders })
      })

    console.log(url)
  }

  render() {
    const { orders } = this.state
    const { classes } = this.props
    return(
      <main className={classes.root}>
        <Typography component='h2' variant='h5'>My Orders</Typography>
        {
          orders.map((order) => { return (
            <Card key={order.id} className={classes.item}>
              <CardContent>
                <Typography component='h3' variant='h6'>{ order.restaurant.name }</Typography>
                  <List>
                    {
                      order.order_items.map((item) => {
                        const { name } = item.meal_snapshot
                        const { id, amount, subtotal} = item
                        return (
                          <ListItem key={`order-item-${id}`}>
                            <ListItemText primary={name} secondary={ `× ${amount}`} />
                            <Typography variant="body2">{formatPrice(subtotal)}</Typography>
                          </ListItem>
                        )
                      })
                    }

                    <ListItem className={classes.total}>
                      <ListItemText primary="Total" />
                      <Typography variant="subtitle1">
                        { formatPrice(order.total) }
                      </Typography>
                    </ListItem>
                  </List>

                <Typography component='h3' variant='h6'>Status: { order.status }</Typography>
                <Typography component='h3' variant='h6'>History:</Typography>
                <List>
                  {
                    order.status_histories.map((history) => {
                      return(
                        <ListItem key={`order-${order.id}-history-${history.version}`}>
                          <ListItemText primary={`${ history.action === 'create' ? history.audited_changes.status : history.audited_changes.status[1]} @ ${formatDateTime(history.created_at)}`} className={classes.historyItem} />
                        </ListItem>
                      )
                    })
                  }
                </List>

              </CardContent>
              <CardActions>
                <SessionConsumer>
                  {
                    ({currentUser}) => { return actionButton(order.id, order.status, currentUser, this.handleActionButtonClick )}
                  }
                </SessionConsumer>
              </CardActions>
            </Card>
          )})
        }
      </main>
    )
  }
}

export default withStyles(styles)(MyOrder)
