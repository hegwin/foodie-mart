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
import { formatPrice } from '../../utils/formatter'

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

class MyMeal extends Component {
  state = { meals: [] }

  constructor(props) {
    super(props)
    const { restaurant_id } = props.match.params
    this.state = { meals: [], restaurant_id }
  }

  handleNewButtonClick = () => {
    console.log(this)
    const { restaurant_id } = this.state
    this.props.history.push(`/my_restaurants/${restaurant_id}/meals/new`)
  }

  handleEditButtonClick = (id, data) => {
    const { restaurant_id } = this.state
    this.props.history.push(`/my_restaurants/${restaurant_id}/meals/${id}/edit`, { data })
  }

  componentDidMount() {
    const token = localStorage.getItem('TOKEN')
    const url = `/api/v1/meals?restaurant_id=${this.state.restaurant_id}`

    fetch(url, { headers: { 'Content-Type': 'application/json' } })
      .then(response => {
        if (response.ok) {
          return response.json()
        }

        throw new Error('Request failed.')
      })
      .then(json => this.setState({ meals: json }))
  }

  render() {
    const { meals } = this.state
    const { classes } = this.props

    return(
      <main className={classes.root}>
        <Typography component='h2' variant='h5'>My Meals</Typography>
        <Button variant="contained" color="primary" className={classes.button} onClick={this.handleNewButtonClick}>Create New Meal</Button>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Image</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Description</TableCell>
                <TableCell>Price</TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {
                meals.map((meal) => {
                  return(
                    <TableRow key={meal.id}>
                      <TableCell><Avatar alt={meal.name} src={meal.image_url} /></TableCell>
                      <TableCell>{meal.name}</TableCell>
                      <TableCell>{meal.description}</TableCell>
                      <TableCell>{formatPrice(meal.price)}</TableCell>
                      <TableCell>
                        <Button size="small" variant="contained" color="primary" className={classes.button} onClick={ () => { this.handleEditButtonClick(meal.id, meal)}}>Edit</Button>
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

export default withStyles(styles)(MyMeal)
