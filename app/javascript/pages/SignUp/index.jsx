import React, { Component } from 'react'

import Avatar from '@material-ui/core/Avatar'
import Box from '@material-ui/core/Box'
import Button from '@material-ui/core/Button'
import CssBaseline from '@material-ui/core/CssBaseline'
import TextField from '@material-ui/core/TextField'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Checkbox from '@material-ui/core/Checkbox'
import Link from '@material-ui/core/Link'
import { Link as RouterLink } from 'react-router-dom'
import Grid from '@material-ui/core/Grid'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import Typography from '@material-ui/core/Typography'
import { withStyles } from '@material-ui/core/styles'
import Container from '@material-ui/core/Container'

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
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
})

const DEFAULT_ROLE = 'regular'

class SignUp extends Component {
  constructor(props) {
    super(props)

    this.state = {
      data: {
        first_name: '',
        last_name: '',
        email: '',
        password: '',
        password_confirmation: '',
        role_name: DEFAULT_ROLE
      },
      errors: {}
    }

    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleCheck  = this.handleCheck.bind(this)
  }

  handleChange(e) {
    const target = e.target
    const { name, value } = target

    this.setState({
      data: { ...this.state.data, [name]: value }
    })
  }

  handleCheck(e) {
    const target = e.target
    const { name, checked } = target

    if (checked) {
      this.setState({ data: { ...this.state.data, role_name: name }})
    } else {
      this.setState({ data: { ...this.state.data, role_name: DEFAULT_ROLE }})
    }
  }

  handleSubmit(e, refreshCurrentUser) {
    e.preventDefault()

    const url = `/api/v1/users`

    fetch(url, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(this.state.data) })
      .then(response => {
        if (response.ok) {
          return response.json()
        } else if (response.status === 422) {
          response.json().then(data => {
            let errors = data.errors
            this.setState({ errors })

            throw new Error('Data invalid.')
          })
        }
        throw new Error('Request failed.')
      })
      .then(response => {
        localStorage.setItem('TOKEN', response.token)
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
          <Typography component="h1" variant="h5">Sign up</Typography>
          <ErrorMessages errors={errors} />
          <SessionConsumer>
            {
              ({refreshCurrentUser}) => {
                return (
                  <form className={classes.form} onSubmit={ (e) => { this.handleSubmit(e, refreshCurrentUser)}}>
                    <Grid container spacing={2}>
                      <Grid item xs={12} sm={6}>
                        <TextField
                        autoComplete="fname"
                        name="first_name"
                        variant="outlined"
                        required
                        fullWidth
                        id="firstName"
                        label="First Name"
                        autoFocus
                        onChange={this.handleChange}
                      />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                          <TextField
                          variant="outlined"
                          required
                          fullWidth
                          id="lastName"
                          label="Last Name"
                          name="last_name"
                          autoComplete="lname"
                          onChange={this.handleChange}
                        />
                          </Grid>
                          <Grid item xs={12}>
                            <TextField
                            variant="outlined"
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            autoComplete="email"
                            onChange={this.handleChange}
                          />
                            </Grid>
                            <Grid item xs={12}>
                              <TextField
                              variant="outlined"
                              required
                              fullWidth
                              name="password"
                              label="Password"
                              type="password"
                              id="password"
                              onChange={this.handleChange}
                            />
                              </Grid>
                              <Grid item xs={12}>
                                <TextField
                                variant="outlined"
                                required
                                fullWidth
                                name="password_confirmation"
                                label="Password Confirmation"
                                type="password"
                                id="passwordConfirmation"
                                onChange={this.handleChange}
                              />
                                </Grid>
                                <Grid item xs={12}>
                                  <FormControlLabel
                                  control={<Checkbox name="restaurant_owner" value="allowExtraEmails" color="primary" onChange={this.handleCheck} />}
                                  label="I am a restaurant owner."
                                />
                                  </Grid>
                                </Grid>
                                <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                color="primary"
                                className={classes.submit}
                              >
                                  Sign Up
                              </Button>
                              <Grid container justify="flex-end">
                                <Grid item>
                                  <Link component={RouterLink} to="/sign_in" variant="body2">
                                    Already have an account? Sign in
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

export default withStyles(styles)(SignUp)
