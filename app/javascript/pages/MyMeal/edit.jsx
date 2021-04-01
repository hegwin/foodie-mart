import React, { Component } from 'react'

import { withStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'

import MealForm from '../../components/MealForm'
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

class EditMeal extends Component {
  constructor(props) {
    super(props)

    const { restaurant_id, id } = props.match.params
    const { data } = props.location.state

    this.state = { restaurant_id, id, data, errors: {} }

    console.log(this)
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

    const { restaurant_id, id } = this.state
    const token = localStorage.getItem('TOKEN')
    const url = `/api/v1/meals/${id}`
    let { data } = this.state
    data['restaurant_id'] = restaurant_id

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
        this.props.history.push(`/my_restaurants/${restaurant_id}/meals`)
      })
  }

  render() {
    const { classes } = this.props
    const { data, errors } = this.state

    return(
      <main className={classes.root}>
        <Typography component='h2' variant='h5' className={classes.title}>Edit Meal</Typography>
        <ErrorMessages errors={errors} />
        <MealForm data={data} handleChange={this.handleChange} handleSubmit={this.handleSubmit} />
      </main>
    )
  }
}

export default withStyles(styles)(EditMeal)
