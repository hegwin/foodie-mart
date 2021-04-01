import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { SessionConsumer } from '../utils/sessionContext'

export default function AddressForm(props) {
  const { handleChange, handleSubmit } = props
  const data = props.data || {}
  return (
    <form onSubmit={handleSubmit}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            variant="outlined"
            defaultValue={data.image_url}
            required
            id="image"
            name="image_url"
            label="Image URL"
            fullWidth
            autoFocus
            onChange={handleChange}
            autoComplete="image_url"/>
        </Grid>
        <Grid item xs={12}>
          <TextField
            variant="outlined"
            defaultValue={data.name}
            required
            id="name"
            name="name"
            label="Name"
            fullWidth
            onChange={handleChange}
            autoComplete="name"/>
        </Grid>
        <Grid item xs={12}>
          <TextField
            variant="outlined"
            defaultValue={data.description}
            required
            id="description"
            name="description"
            label="Description"
            fullWidth
            onChange={handleChange}
            autoComplete="description" />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            variant="outlined"
            defaultValue={data.latitude}
            required
            id="latitude"
            name="latitude"
            label="Latitude"
            fullWidth
            onChange={handleChange}
            autoComplete="latitude"/>
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            variant="outlined"
            defaultValue={data.longitude}
            required
            id="longitude"
            name="longitude"
            label="Longitude"
            fullWidth
            onChange={handleChange}
            autoComplete="longitude" />
        </Grid>
      </Grid>
      <Button type="submit" fullWidth variant="contained" color="primary" style={{marginTop: 30 }}>Submit</Button>
    </form>
  );
}
