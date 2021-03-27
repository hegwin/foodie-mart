import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Typography from '@material-ui/core/Typography';


const styles = theme => ({
  root: {
    display: 'flex',
    height: 100
  },
  cover: {
    height: 100,
    width: 80
  }
})

class Restaurant extends Component {
  render () {
    const { name, description, image_url, classes } = this.props

    return(
      <Card className={classes.root}>
        <CardMedia className={classes.cover} image={image_url} />
        <CardContent>
          <Typography component='h2' variant='h6'>{name}</Typography>
          <Typography variant='body1'>{description}</Typography>
        </CardContent>
      </Card>
    )
  }
}

export default withStyles(styles)(Restaurant);
