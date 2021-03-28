import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { withStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Typography from '@material-ui/core/Typography'

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
      <Card className={classes.root} onClick={() => this.showRestaurant()}>
        <CardMedia className={classes.cover} image={image_url} />
        <CardContent>
          <Typography component='h2' variant='h6'>{name}</Typography>
          <Typography variant='body1'>{description}</Typography>
          <Typography variant='body2' className={classes.distance}>{this.formatDistance(distance)}</Typography>
        </CardContent>
      </Card>
    )
  }

  showRestaurant() {
    const { id, name, description, image_url, distance } = this.props
    this.props.history.push({pathname: `/restaurants/${id}`, state: {name, description, image_url, distance}})
  }

  formatDistance(dist) {
    const distance = Number(dist);

    if (distance == -1) {
      return null
    } else if (distance < 300) {
      return '< 300 m'
    } else if (distance >= 300 && distance < 1000) {
      return(new Intl.NumberFormat('en-GB',  { style: 'unit', maximumSignificantDigits: 2,  unit: 'meter' }).format(distance))
    } else if (distance >= 1000 && distance < 20000) {
      return(new Intl.NumberFormat('en-GB',  { style: 'unit', maximumSignificantDigits: 3,  unit: 'kilometer' }).format(distance / 1000))
    } else if (distance >= 20000) {
      return '> 20 km'
    }
  }
}

export default withRouter(withStyles(styles)(RestaurantItem));
