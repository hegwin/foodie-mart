import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { SessionConsumer } from '../utils/sessionContext'

export default function AddressForm(props) {
  const { handleChange } = props
  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Shipping Info
      </Typography>
      <Grid container spacing={3}>
        <SessionConsumer>
          { ({currentUser}) => {
            return [
              <Grid item xs={12} sm={6} key="input-grid-first-name">
                <TextField
                  variant="outlined"
                  value={currentUser.first_name}
                  required
                  id="firstName"
                  name="firstName"
                  label="First name"
                  fullWidth
                  onChange={handleChange}
                  autoComplete="given-name"/>
              </Grid>,
              <Grid item xs={12} sm={6} key="input-grid-last-name">
                <TextField
                  variant="outlined"
                  value={currentUser.last_name}
                  required
                  id="lastName"
                  name="lastName"
                  label="Last name"
                  fullWidth
                  onChange={handleChange}
                  autoComplete="family-name" />
              </Grid>
            ]
        }}
        </SessionConsumer>
        <Grid item xs={12}>
          <TextField
            variant="outlined"
            required
            id="address1"
            name="line1"
            label="Address line 1"
            fullWidth
            onChange={handleChange}
            autoComplete="shipping address-line1"
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            variant="outlined"
            id="address2"
            name="line2"
            label="Address line 2"
            fullWidth
            onChange={handleChange}
            autoComplete="shipping address-line2"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            variant="outlined"
            required
            id="zip"
            name="zip_code"
            label="Zip / Postal code"
            fullWidth
            onChange={handleChange}
            autoComplete="shipping postal-code"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            variant="outlined"
            required
            id="phone"
            name="phone"
            label="phone"
            fullWidth
            onChange={handleChange}
            autoComplete="phone numer"
          />
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
