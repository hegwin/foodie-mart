import React, { Component } from 'react'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography';

import qs from 'querystring'

import RestaurantItem from '../../components/RestaurantItem'

const url = '/api/v1/restaurants'

class RestaurantList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      items: []
    }
  }

  componentDidMount() {
    let location = { latitude: 31.22, longitude: 121.45 }

    navigator.geolocation.getCurrentPosition(position => {
      location.latitude  = position.coords.latitude
      location.longitude = position.coords.longitude
    })

    fetch(`${url}?${qs.stringify(location)}`)
      .then(response => {
        if (response.ok) {
          return response.json();
        }
        throw new Error('Request failed.')
      })
      .then(response => this.setState({ items: response }))
    //.catch(() => this.props.history.push("/"));
  }

  render () {
    const { items } = this.state
    return (
      <Grid container spacing={1}>
        {
          items.map((item, _) => {
            return(
              <Grid item key={item.id} xs={12} md={6} lg={4}>
                <RestaurantItem {...item} />
              </Grid>
            )
          })
        }
      </Grid>
    )
  }
}

export default RestaurantList
