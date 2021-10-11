import { makeStyles, AppBar, Toolbar, Typography, Button } from '@material-ui/core';
import { blue } from '@material-ui/core/colors';
import React from 'react';
import logo from "../img/logo.jpg";

const styles = makeStyles(theme => ({
  name: {
    flex: 1,
    paddingLeft: 20,
    letterSpacing: 0.7
  },
  logo: {
    borderRadius: 20
  },
  login: {
    color: "#fff"
  },
  toolbar: {
    backgroundColor: blue[600],
    display: "flex",
    justifyContent: "center",
    minHeight: 50
  }
}));

const Header = props => {
  const classes = styles();
  return (
  <AppBar position="sticky">
    <Toolbar className={classes.toolbar}>
      <div>
        <img src={logo} alt="logo" width={50} className={classes.logo} />
      </div>
      <div>
        <Typography className={classes.name} variant='h5'>
          Blue Standard Water Tech
        </Typography>
      </div>
    </Toolbar>
  </AppBar>
  );
}
 
export default Header;