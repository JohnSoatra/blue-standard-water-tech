import { makeStyles, AppBar, Toolbar, Typography, Button } from '@material-ui/core';
import { blue, green } from '@material-ui/core/colors';
import React from 'react';
import logo from "../img/logo.jpg";

const styles = makeStyles(theme => ({
  name: {
    letterSpacing: 0.2,
    paddingLeft: 5,
    [theme.breakpoints.down("xs")]: {
      display: "none"
    }
  },
  logo: {
    borderRadius: 20
  },
  login: {
    color: "#fff"
  },
  toolbar: {
    backgroundColor: blue[900],
    display: "flex",
    justifyContent: "space-between",
    minHeight: 50
  },
  brand: {
    display: "flex",
    alignItems: "center"
  },
  button: {
    color: blue[100],
    borderColor: blue[100],
    [theme.breakpoints.down("xs")]: {
      padding: 2,
      fontSize: 12,
      margin: 3
    }
  }
}));

const Header = props => {
  const classes = styles();
  return (
  <AppBar position="sticky">
    <Toolbar className={classes.toolbar}>
      <div className={classes.brand}>
        <img src={logo} alt="logo" width={50} className={classes.logo} />
        <Typography className={classes.name}>
          Blue Standard Water Tech
        </Typography>
      </div>
      <div>
        <Button className={classes.button} variant='outlined'size='small'>
          Documents
        </Button>
        <Button className={classes.button} variant='outlined' size='small'>
          Products
        </Button>
        <Button className={classes.button} variant='outlined'size='small'>
          Service
        </Button>
      </div>
    </Toolbar>
  </AppBar>
  );
}
 
export default Header;