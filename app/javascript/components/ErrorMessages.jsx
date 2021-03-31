import React, { Component } from 'react'
import Alert from '@material-ui/lab/Alert';
import { withStyles } from '@material-ui/core/styles'

const styles = theme => ({
  errorBox: {
    width: '100%'
  },
  alert: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2)
  }
})

// TODO: Make it a function component
class ErrorMessages extends Component {
  render() {
    const { classes, errors } = this.props

    return(
      <div className={classes.errorBox}>
        {
          Object.keys(errors).map(key => {
            return <Alert className={classes.alert} severity="error" key={key}>{`${key} ${errors[key]}`}</Alert>
          })
        }
      </div>
    )
  }
}

export default withStyles(styles)(ErrorMessages)
