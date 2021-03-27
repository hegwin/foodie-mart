import React, { Component } from 'react'
import Container from '@material-ui/core/Container'
import Grid from '@material-ui/core/Grid'

import AppBar from '@material-ui/core/AppBar'
import ToolBar from '@material-ui/core/ToolBar'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'
import Typography from '@material-ui/core/Typography';

import Restaurant from './Restaurant'

const url = '/api/v1/restaurants'

class RestaurantList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      items: []
    }
  }

  componentDidMount() {
    fetch(url)
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
      <Container maxWidth="lg">
        <div className='App'>
          <AppBar>
            <ToolBar>
              <IconButton>
                <MenuIcon />
              </IconButton>
              <Typography component='h1' variant='h6'>Foodie Market</Typography>
            </ToolBar>
          </AppBar>
          <Grid container spacing={1} direction='column'>
            {
              items.map((item, _) => {
                return(
                  <Grid item key={item.id} xs={12} md={6} lg={4}>
                    <Restaurant {...item}/>
                  </Grid>
                )
              })
            }
          </Grid>
        </div>
      </Container>
    )
  }
}

export default RestaurantList;
