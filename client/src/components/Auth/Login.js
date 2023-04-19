import React, { useState } from 'react';
import { Avatar, Button, Paper, Grid, Typography, Container } from '@material-ui/core';
// import { Link } from 'react-router-dom';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

// React OAuth2 | Google
import { useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';

import useStyles from './styles';
import Input from './Input';
import Icon from './icon';

const Login = () => {
  const classes = useStyles();
  const [showPassword, setShowPassword] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

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
  

  const googlelogin = useGoogleLogin({
    onSuccess: (codeResponse) => {
      axios.get(`https://www.googleapis.com/oauth2/v1/userinfo? 
      access_token=${codeResponse.access_token}`,
      {
        headers: {
          Authorization: `Bearer ${codeResponse.access_token}`,
          Accept: "application/json",
        },
      }).then((res) => {
        const result = res?.data;
        const token = codeResponse.access_token;
        try {
          dispatch({ type: "AUTH", data: { result, token } })

          navigate("/");
        } catch (error) {
          
        }
      }).catch((err) => console.log(err))
    },
    onError: res => console.error('Failed to login', res),
  });

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
          

          {/* This code is creating a button with the label "Connect with Google" and styling it with
          the class `googleButton` from the `useStyles` hook. It has a secondary color and is set to
          be full width. When clicked, it will execute the `googlelogin` function. It also has an
          icon displayed before the label, which is imported as `<Icon />`. This button is used for
          Google OAuth2 login. */}
          <Button
            className={classes.googleButton}
            color="secondary"
            fullWidth
            onClick={() => googlelogin()}
            startIcon={<Icon />}
            variant="contained"
          >
            Connect with Google
          </Button>

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