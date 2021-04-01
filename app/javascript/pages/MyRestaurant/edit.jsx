import React, { Component } from 'react'

import { withStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'

import RestaurantForm from '../../components/RestaurantForm'
import ErrorMessages from '../../components/ErrorMessages'

const styles = theme => ({
  root: {
    width: 'auto',
    marginTop: theme.spacing(10),
    marginLeft: 0,
    marginRight: 0,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    [theme.breakpoints.up(800 + theme.spacing(2) * 2)]: {
      width: 800,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  title: {
    margin: theme.spacing(2, 0, 2)
  },
  button: {
    margin: theme.spacing(1)
  },
})

class EditRestaurant extends Component {
  //state = { id: null, data: {}, errors: {} }

  constructor(props) {
    super(props)

    console.log(props.location)

    const { id, data } = props.location.state

    this.state = { id, data, errors: {} }
  }

  handleChange = (e) => {
    const target = e.target
    const { name, value } = target

    this.setState({
      data: { ...this.state.data, [name]: value }
    })
  }

  handleSubmit = (e) => {
    e.preventDefault()

    const { id, data } = this.state
    const token = localStorage.getItem('TOKEN')
    const url = `/api/v1/restaurants/${id}`

    fetch(url, { method: 'PATCH', headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` }, body: JSON.stringify(this.state.data) })
      .then(response => {
        if (response.ok) {
          return response.json()
        } else if (response.status === 422) {
          response.json().then(json => {
            const errors = data.errors
            this.setState({ errors })

            throw new Error('Data invalid.')
          })

          throw new Error('Request failed.')
        }
      })
      .then(response => {
        this.props.history.push('/my_restaurants')
      })
  }

  render() {
    const { classes } = this.props
    const { data, errors } = this.state

    return(
      <main className={classes.root}>
        <Typography component='h2' variant='h5' className={classes.title}>Edit Restaurant</Typography>
        <ErrorMessages errors={errors} />
        <RestaurantForm data={data} handleChange={this.handleChange} handleSubmit={this.handleSubmit} />
      </main>
    )
  }
}

export default withStyles(styles)(EditRestaurant)
