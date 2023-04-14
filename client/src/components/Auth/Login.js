import React, { useState } from 'react';
import { Avatar, Button, Paper, Grid, Typography, Container } from '@material-ui/core';
// import { Link } from 'react-router-dom';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { GoogleLogin } from 'react-google-login';

import useStyles from './styles';
import Input from './Input';
import Icon from './icon';

const Login = () => {
  const classes = useStyles();
  const [showPassword, setShowPassword] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);

  const handleShowPassword = () => setShowPassword((prevShowPassword) => !prevShowPassword);

  const handleSubmit = () => {

  };

  const handleChange = () => {

  };

  const switchMode = () => {
    // So if prevIsSignUp was true, the function returns false, and vice versa.
    setIsSignUp((prevIsSignUp) => !prevIsSignUp);
    handleShowPassword(false);
  };

  const googleSuccess = async (res) => {
    console.log(res);
  };

  const googleFailure = (error) => {
    console.log('Login failed', error);
  };

  return (
    <Container component="main" maxWidth="xs">
      <Paper className={classes.paper} elevation={3}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography variant="h5">{isSignUp ? 'Sign Up' : 'Sign In'}</Typography>
        <form className={classes.form} onSubmit={handleSubmit}>
          {/* Inputs */}
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

          {/* Button SIGN IN */}
          <Button type="submit" fullWidth size="large" variant="contained" color="primary" className={classes.submit}>
            { isSignUp ? 'Sign Up' : 'Sign In' }
          </Button>

          {/* Buttons Sign In and Cancel */}
          {/* <Grid container spacing={2} justifyContent="center">
            <Grid item>
              <Button component={Link} to="/" fullWidth size="large" variant="contained" color="default" className={classes.submit}>
                {`< Back`}
              </Button>
            </Grid>
            <Grid item>
              <Button type="submit" fullWidth size="large" variant="contained" color="primary" className={classes.submit}>
                { isSignUp ? 'Sign Up' : 'Sign In' }
              </Button>
            </Grid>
          </Grid> */}

          {/* Google Login */}
          <GoogleLogin
            clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
            render={(renderProps) => (
              <Button
                className={classes.googleButton}
                color="secondary"
                fullWidth
                onClick={renderProps.onClick}
                disabled={renderProps.disabled}
                startIcon={<Icon />}
                variant="contained"
              >
                Connect with Google
              </Button>
            )}
            buttonText='Sign in with Google'
            onSuccess={googleSuccess}
            onFailure={googleFailure}
            cookiePolicy={'single_host_origin'}
          />

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

export default Login;