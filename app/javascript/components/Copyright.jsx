import React, { Component } from 'react'
import Box from '@material-ui/core/Box'
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';

class Copyright extends Component {
  render() {
    return (
      <Box md={8} style={{ marginTop: '2em'}}>
        <Typography variant="body2" color="textSecondary" align="center">
          {'Copyright © '}
          <Link color="inherit" href="http://localhost:3000/">
            Hegwin's Foodie Market
          </Link>{' '}
          {new Date().getFullYear()}
          {'.'}
        </Typography>
      </Box>
    )
  }
}

export default Copyright
