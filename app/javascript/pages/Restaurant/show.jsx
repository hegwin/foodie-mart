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

import { formatPrice } from '../../utils/formatter'

import MealItem from '../../components/MealItem'

const styles = theme => ({
  restaurantHeader: {
    height: 240,
    marginBottom: '1em'
    //  margin: '-1em -2em 0.5em -2em'
  },
  restaurantHeaderCover: {
    height: 160
  }
})

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
    const { classes } = this.props
    const { name, description, image_url, meals } = this.state

    return(
      <div>
        <Card className={classes.restaurantHeader}>
          <CardMedia className={classes.restaurantHeaderCover} image={image_url} />
          <CardContent>
            <Typography component='h1' variant='h6'>{name}</Typography>
            <Typography variant='body1'>{description}</Typography>
          </CardContent>
        </Card>
        <Grid container spacing={1}>
          {
            meals.map(meal => {
              return(
                <Grid item key={meal.id} xs={12} md={6} lg={4}>
                  <MealItem {...meal} />
                </Grid>
              )
            })
          }
        </Grid>
      </div>
    )
  }
}

export default withStyles(styles)(Restaurant)
