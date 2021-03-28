import React, { Component } from 'react'

import Grid from '@material-ui/core/Grid'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Typography from '@material-ui/core/Typography'


class Restaurant extends Component {
  constructor(props) {
    super(props)
    const { id } = props.match.params
    const { name, description, image_url } = props.location.state || {}
    this.state = {
      id, name, description, image_url,
      meals: []
    }
  }

  componentDidMount() {
    const { id, name } = this.state
    if (name === undefined) {
      const restaurantUrl = `/api/v1/restaurants/${id}`

      fetch(restaurantUrl)
        .then(response => {
          if (response.ok) {
            return response.json()
          }
          throw new Error('Request failed to get restaurant info.')
        })
        .then(response => this.setState({ ...this.state, ...response }))
    }

    const mealUrl = `/api/v1/meals?restaurant_id=${id}`

    fetch(mealUrl)
      .then(response => {
        if (response.ok) {
          return response.json();
        }
        throw new Error('Request failed.')
      })
      .then(response => this.setState({ meals: response }))
  }

  render() {
    const { name, description } = this.state

    return(
      <Card>
        {name} <br />
        {description} <br />
      </Card>
    )
  }
}

export default Restaurant
