import { makeStyles, AppBar, Toolbar, Typography, Button } from '@material-ui/core';
import { blue } from '@material-ui/core/colors';
import React from 'react';
import logo from "../img/logo.jpg";

const styles = makeStyles(theme => ({
  appbar: {
    backgroundColor: blue[900],
  },
  toolbar: {
    display: "flex",
    justifyContent: "space-between",
    minHeight: 50,
  },
  brand: {
    display: "flex",
    alignItems: "center"
  },
  logo: {
    borderRadius: 5
  },
  name: {
    letterSpacing: 0.2,
    paddingLeft: 5,
    [theme.breakpoints.down("xs")]: {
      display: "none"
    }
  },
  buttonWrapper: {
    display: "flex",
  },
  button: {
    color: blue[100],
    border: "1px solid",
    borderColor: blue[100],
    borderRadius: 5,
    margin : 5,
    padding: 5,
    cursor: "pointer",
    [theme.breakpoints.down("sm")]: {
      borderRadius: 3,
      margin: 3,
      padding: 3,
      fontSize: 16
    }
  }
}));

const Header = props => {
  const classes = styles();
  return (
  <AppBar position="sticky" className={classes.appbar}>
    <Toolbar className={classes.toolbar}>
      <div className={classes.brand}>
        <img src={logo} alt="logo" height={40} className={classes.logo} />
        <Typography className={classes.name}>
          Blue Standard Water Tech
        </Typography>
      </div>
      <div className={classes.buttonWrapper}>
        <Typography className={classes.button}>
          Documents
        </Typography>
        <Typography className={classes.button}>
          Products
        </Typography>
        <Typography className={classes.button}>
          Service
        </Typography>
      </div>
    </Toolbar>
  </AppBar>
  );
}
 
export default Header;