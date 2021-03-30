import React from 'react'
import MenuItem from '@material-ui/core/MenuItem'
import Link from '@material-ui/core/Link'
import { Link as RouterLink, useHistory } from 'react-router-dom'

const handleLogOut = (setCurrentUser, history) => {
  localStorage.removeItem('TOKEN')
  localStorage.removeItem('currentUser')
  setCurrentUser(null)
  history.push('/')
}

export default function MenuItems(props) {
  const { currentUser, setCurrentUser } = props
  const history = useHistory()

  if (currentUser) {
    if ( currentUser.role === 'regular') {
      return [
        <MenuItem key="mi-1"><Link component={RouterLink} to="/orders">My Orders</Link></MenuItem>,
        <MenuItem key="mi-2" onClick={() => { handleLogOut(setCurrentUser, history)}}>Log Out</MenuItem>
      ]
    } else if (currentUser.role === 'restaurant_owner') {
      return [
      <MenuItem key="mi-3"><Link component={RouterLink} to="/orders">My Orders</Link></MenuItem>,
      <MenuItem key="mi-4"><Link component={RouterLink} to="/my_restaurants">My Restaurant</Link></MenuItem>,
      <MenuItem key="mi-5" onClick={() => { handleLogOut(setCurrentUser, history)}}>Log Out</MenuItem>
      ]
    }
  } else {
    return [
      <MenuItem key="mi-6"><Link component={RouterLink} to="/sign_in">Sign In</Link></MenuItem>,
      <MenuItem key="mi-7"><Link component={RouterLink} to="/sign_up">Sign Up</Link></MenuItem>
    ]
  }
}
