import React, { Component } from 'react'

import Container from '@material-ui/core/Container'
import NavBar from './NavBar'

class AppLayout extends Component {
  render() {
    return(
      <Container maxWidth="lg">
        <NavBar />
        <div className='App'>
          {this.props.children}
        </div>
      </Container>
    )
  }
}

export default AppLayout
