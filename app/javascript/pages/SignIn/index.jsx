import React, { Component } from 'react'

import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import { Link as RouterLink } from 'react-router-dom'
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

import ErrorMessages from '../../components/ErrorMessages'
import { SessionConsumer } from '../../utils/sessionContext'

const styles = theme => ({
  paper: {
    marginTop: theme.spacing(10),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  }
})

class SignIn extends Component {
  constructor(props) {
    super(props)

    this.state = {
      data: { email: '', password: '' },
      errors: {}
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange(e) {
    const target = e.target
    const { name, value } = target

    this.setState({
      data: { ...this.state.data, [name]: value }
    })
  }

  handleSubmit(e, refreshCurrentUser) {
    e.preventDefault()

    const url = `/api/v1/sessions`

    fetch(url, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(this.state.data) })
      .then(response => {
        if (response.ok) {
          return response.json()
        } else if (response.status === 401) {
          this.setState({ errors: { 'email/password': ['not match'] } })

          throw new Error('Data invalid.')
        }
        throw new Error('Request failed.')
      })
      .then(response => {
        const { token } = response
        localStorage.setItem('TOKEN', token)
        refreshCurrentUser()
        this.props.history.replace('/')
      })
  }

  render() {
    const { classes } = this.props
    const { errors } = this.state

    return (
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">Sign in</Typography>
          <ErrorMessages errors={errors} />
          <SessionConsumer>
          {
            ({refreshCurrentUser}) => {
              return (
                <form className={classes.form} onSubmit={ (e) => { this.handleSubmit(e, refreshCurrentUser) } }>
                  <TextField variant="outlined" margin="normal" autoFocus required fullWidth id="email" label="Email Address" name="email" autoComplete="email" onChange={this.handleChange}/>
                  <TextField variant="outlined" margin="normal" required fullWidth name="password" label="Password" type="password" id="password" autoComplete="current-password" onChange={this.handleChange} />
                <FormControlLabel
                  control={<Checkbox value="remember" color="primary" />}
                  label="Remember me"
                />
                <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>Sign In</Button>
                <Grid container>
                  <Grid item xs>
                    <Link href="#" variant="body2">
                      Forgot password?
                    </Link>
                  </Grid>
                  <Grid item>
                    <Link component={RouterLink} to="/sign_up" variant="body2">
                      Don't have an account? Sign Up
                    </Link>
                  </Grid>
                </Grid>
              </form>
            )
          }
        }
        </SessionConsumer>
      </div>
    </Container>
    )
  }
}

export default withStyles(styles)(SignIn)
