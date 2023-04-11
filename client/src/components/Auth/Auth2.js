import React, { useState } from 'react';
import { Avatar, Button, Paper, Grid, Typography, Container } from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';

import useStyles from './styles';
import Input from './Input';
import { Link } from 'react-router-dom';

const Auth2 = () => {
  const classes = useStyles();
  const [showPassword, setShowPassword] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);

  const handleShowPassword = () => setShowPassword((prevShowPassword) => !prevShowPassword);

  const handleSubmit = () => {

  }

  const handleChange = () => {

  }

  const switchMode = () => {
    // So if prevIsSignUp was true, the function returns false, and vice versa.
    setIsSignUp((prevIsSignUp) => !prevIsSignUp);
    handleShowPassword(false);
  }

  return (
    <Container component="main" maxWidth="xs">
      <Paper className={classes.paper} elevation={3}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography variant="h5">{isSignUp ? 'Sign Up' : 'Sign In'}</Typography>
        <form className={classes.form} onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            { isSignUp && (
              <>
                <Input name="firstname" label="First Name" handleChange={handleChange} type="text" autoFocus half />
                <Input name="lastname" label="Last Name" handleChange={handleChange} type="text" half />
              </>
            )}
            <Input name="email" label="Email Address" handleChange={handleChange} type="email" />
            <Input name="password" label="Password" handleChange={handleChange} type={showPassword ? "text" : "password"} handleShowPassword={handleShowPassword} />
            { isSignUp && <Input name="confirmPassword" label="Repeat Password" handleChange={handleChange} type="password" /> }
          </Grid>

          <Grid container spacing={2} justifyContent="center">
            <Grid item>
              <Button component={Link} to="/" fullWidth variant="contained" color="default" className={classes.submit}>
                {`< Back`}
              </Button>
            </Grid>
            <Grid item>
              <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>
                { isSignUp ? 'Sign Up' : 'Sign In' }
              </Button>
            </Grid>
          </Grid>

          <Grid container justifyContent="center">
            <Grid item>
              <Button onClick={switchMode}>
                { isSignUp ? 'Already have an account? Sign In' :  'Don\'t have an account yet? Sign Up' }
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
}

export default Auth2;