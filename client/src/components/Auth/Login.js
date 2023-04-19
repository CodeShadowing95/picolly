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
import { signin, signup } from '../../actions/auth';


const initialState = { firstname: '', lastname: '', email: '', password: '', confirmPassword: '' }

const Login = () => {
  const classes = useStyles();
  const [showPassword, setShowPassword] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const [formData, setFormData] = useState(initialState);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleShowPassword = () => setShowPassword((prevShowPassword) => !prevShowPassword);

  const handleSubmit = (e) => {
    /* `e.preventDefault()` is a method that prevents the default action of an event from occurring. In
    this case, it is preventing the default form submission behavior, which would cause the page to
    refresh. Instead, the function `handleSubmit` is called, which handles the form submission in a
    custom way. */
    e.preventDefault();

    // console.log(formData);
    if(isSignUp) {
      /* `dispatch(signup(formData, navigate));` is dispatching an action to the Redux store to sign up
      a user with the form data provided in the `formData` state object. The `signup` action creator
      takes two arguments: the `formData` object and the `navigate` function from the `useNavigate`
      hook. The `navigate` function is used to redirect the user to a different page after the sign
      up process is complete. */
      dispatch(signup(formData, navigate));
    } else {
      dispatch(signin(formData, navigate));
    }
  };

  const handleChange = (e) => {
    /* `setFormData({ ...formData, [e.target.name]: e.target.value });` is updating the `formData`
    state object with a new value for the property that matches the `name` attribute of the input
    element that triggered the `handleChange` function. The spread operator (`...formData`) is used
    to copy all the existing properties of the `formData` object, and then the new value is assigned
    to the property that matches the `name` attribute of the input element using computed property
    names (`[e.target.name]`). This allows the `handleChange` function to update the state object
    dynamically based on the input element that triggered the function. */
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const switchMode = () => {
    // So if prevIsSignUp was true, the function returns false, and vice versa.
    /* `setIsSignUp((prevIsSignUp) => !prevIsSignUp);` is toggling the value of the `isSignUp` state
    variable between `true` and `false`. It does this by using the `prevIsSignUp` parameter, which
    represents the current value of `isSignUp`, and passing it to an arrow function that returns the
    opposite value using the logical NOT operator (`!`). This updated value is then passed to
    `setIsSignUp`, which updates the state variable with the new value. This function is used to
    switch between the "Sign In" and "Sign Up" modes of the form. */
    setIsSignUp((prevIsSignUp) => !prevIsSignUp);
    setShowPassword(false);
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