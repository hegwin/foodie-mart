import React, { Component } from 'react'

import Container from '@material-ui/core/Container'
import NavBar from './NavBar'
import Copyright from './Copyright'

class AppLayout extends Component {
  render() {
    return(
      <Container maxWidth="lg">
        <NavBar />
        <div className='App'>
          {this.props.children}
        </div>
        <Copyright />
      </Container>
    )
  }
}

export default AppLayout
