import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { AppBar, Typography, Toolbar, Avatar, Button } from '@material-ui/core';
import { useDispatch } from 'react-redux';

// The image
import useStyles from './styles';
import memories from '../../images/memories.png';

const Navbar = () => {
  const classes = useStyles();
  /* create a `dispatch` function that can be used to dispatch actions to the Redux store. This
  function is typically used to update the state of the application by dispatching actions that
  trigger reducers to update the state. */
  const dispatch = useDispatch();

  /* create a `navigate` function that can be used to navigate to different routes in the
  application. This function is typically used to programmatically navigate to a different page or
  route in response to user actions or other events. */
  const navigate = useNavigate();

  /* create a `location` object that represents the current URL location of the application.
  This object contains information such as the current pathname, search parameters, and hash. It can
  be used to conditionally render components or to pass information to child components based on the
  current URL location. */
  const location = useLocation();

  /* This line of code is using the `useState` hook to declare a state variable `user` and a function
  `setUser` to update the state variable. The initial value of `user` is set to the parsed JSON
  object retrieved from the `localStorage` with the key `'profile'`. This is likely used to store
  user authentication information, such as their name and profile picture, so that it can be
  accessed and displayed in the navbar component. */
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));

  // console.log(user);
  const logout = async () => {
    dispatch({ type: 'LOGOUT' });

    navigate("/");

    setUser(null);
  }


  /* This code block is using the `useEffect` hook to update the `user` state variable and check for a
  JSON Web Token (JWT) in the `localStorage` object whenever the `location` object changes. The
  `location` object represents the current URL location of the application and is passed as a
  dependency to the `useEffect` hook, which means that the code inside the hook will be executed
  whenever the URL location changes. */
  useEffect(() => {
    // const token = user?.token;
    // Check for JWT(JSON Web Token)
    setUser(JSON.parse(localStorage.getItem('profile')));
  }, [location]);

  return (
    <AppBar className={classes.appBar} position="static" color="inherit">
      <div className={classes.brandContainer}>
        <Typography component={Link} to="/" className={classes.heading} variant="h2" align="center">MemoryMingle</Typography>
        <img className={classes.image} src={memories} alt="memories" height="60" />
      </div>
      <Toolbar className={classes.toolbar}>
        {user ? (
          <div className={classes.profile}>
            <Avatar className={classes.purple} alt={user.result.name} src={user.result.imageUrl}>{user.result.name.charAt(0)}</Avatar>
            <Typography className={classes.userName} variant="h6">{user.result.name}</Typography>
            <Button variant="contained" className={classes.logout} color="secondary" onClick={logout}>Logout</Button>
          </div>
        ) : (
          <Button component={Link} to="/auth" variant="contained" color="primary">Sign in</Button>
        )}
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;