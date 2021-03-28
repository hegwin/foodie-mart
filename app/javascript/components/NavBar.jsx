import React, { Component } from 'react'

import AppBar from '@material-ui/core/AppBar'
import ToolBar from '@material-ui/core/ToolBar'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'
import Typography from '@material-ui/core/Typography';


class NavBar extends Component {
  render() {
    return(
      <AppBar>
        <ToolBar>
          <IconButton>
            <MenuIcon />
          </IconButton>
          <Typography component='h1' variant='h6'>Hegwin's Foodie</Typography>
        </ToolBar>
      </AppBar>
    )
  }
}

export default NavBar
