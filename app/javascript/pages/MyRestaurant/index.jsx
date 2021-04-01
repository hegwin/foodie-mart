import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';


const styles = theme => ({
  root: {
    width: 'auto',
    marginLeft: 0,
    marginRight: 0,
    [theme.breakpoints.up(800 + theme.spacing(2) * 2)]: {
      width: 800,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  button: {
    margin: theme.spacing(1)
  },
})

class MyRestaurant extends Component {
  state = { restaurants: [] }

  handleNewButtonClick = () => {
    console.log('called????')
    this.props.history.push('/my_restaurants/new')
  }

  handleEditButtonClick = (id, data) => {
    this.props.history.push(`/my_restaurants/${id}/edit`, { id, data})
    console.log(id)
  }

  componentDidMount() {
    const token = localStorage.getItem('TOKEN')
    const url = '/api/v1/restaurants/my'

    fetch(url, { headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` } })
      .then(response => {
        if (response.ok) {
          return response.json()
        }

        throw new Error('Request failed.')
      })
      .then(json => this.setState({ restaurants: json }))
  }

  render() {
    const { restaurants } = this.state
    const { classes } = this.props

    return(
      <main className={classes.root}>
        <Typography component='h2' variant='h5'>My Restaurant</Typography>
        <Button variant="contained" color="primary" className={classes.button} onClick={this.handleNewButtonClick}>Create New Restaurant</Button>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Image</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Description</TableCell>
                <TableCell>Geo Info</TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {
                restaurants.map((restaurant) => {
                  return(
                    <TableRow key={restaurant.id}>
                      <TableCell><Avatar alt={restaurant.name} src={restaurant.image_url} /></TableCell>
                      <TableCell>{restaurant.name}</TableCell>
                      <TableCell>{restaurant.description}</TableCell>
                      <TableCell>{restaurant.latitude}<br />{restaurant.longitude}</TableCell>
                      <TableCell>
                        <Button size="small" variant="contained" color="primary" className={classes.button} onClick={ () => { this.handleEditButtonClick(restaurant.id, restaurant)}}>Edit</Button>
                      </TableCell>
                    </TableRow>
                  )
                })
              }
            </TableBody>
          </Table>
        </TableContainer>
      </main>
    )
  }
}

export default withStyles(styles)(MyRestaurant)
