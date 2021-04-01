import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import FormControlLabel from '@material-ui/core/FormControlLabel';

export default function MealForm(props) {
  const { handleChange, handleSubmit } = props
  const data = props.data || {}
  return (
    <form onSubmit={handleSubmit}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            variant="outlined"
            defaultValue={data.name}
            required
            id="name"
            name="name"
            label="Name"
            fullWidth
            autoFocus
            onChange={handleChange}
            autoComplete="meal-name"/>
        </Grid>
        <Grid item xs={12}>
          <TextField
            variant="outlined"
            defaultValue={data.description}
            required
            multiline
            rows={3}
            id="description"
            name="description"
            label="Description"
            fullWidth
            onChange={handleChange}
            autoComplete="meal-description"/>
        </Grid>
        <Grid item xs={12}>
          <TextField
            variant="outlined"
            defaultValue={data.price}
            required
            id="price"
            name="price"
            label="Price"
            fullWidth
            onChange={handleChange}
            autoComplete="meal-price" />
        </Grid>
        <Grid item xs={12}>
          <TextField
            variant="outlined"
            defaultValue={data.image_url}
            required
            id="image_url"
            name="image_url"
            label="Image URL"
            fullWidth
            onChange={handleChange}
            autoComplete="meal-image_url"/>
        </Grid>
      </Grid>
      <Button type="submit" fullWidth variant="contained" color="primary" style={{marginTop: 30 }}>Submit</Button>
    </form>
  );
}
