import React from 'react';
import { TextField, InputAdornment, IconButton, Grid } from '@material-ui/core';

import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';

const Input = ({ name, half, label, type, autoFocus, handleChange, handleShowPassword }) => {
  const inputProps = {
    endAdornment: (
      <InputAdornment position="end">
        <IconButton onClick={handleShowPassword}>
          {type === 'password' ? <Visibility /> : <VisibilityOff />}
        </IconButton>
      </InputAdornment>
    ),
  }
  
  return (
    <Grid item xs={12} sm={half ? 6 : 12}>
      <TextField
        name={name}
        onChange={handleChange}
        variant="outlined"
        required
        fullWidth
        label={label}
        autoFocus={autoFocus}
        type={type}
        InputProps={name === 'password' ? inputProps : null}
      />
    </Grid>
)};

export default Input;