import { AppBar, IconButton, Toolbar, Typography, makeStyles, Button, Grid } from '@material-ui/core';
import React from 'react';
import logo from "../img/logo.jpg";
import big_banner from "../img/big-banner.jpg";
import small_banner from "../img/small-banner.jpg";
import machine from "../img/machine.jpg";

const styles = makeStyles(theme => ({
  name: {
    flex: 1,
    paddingLeft: 20
  },
  logo: {
    borderRadius: "50%"
  },
  login: {
    color: "#fff"
  },
  img: {
    borderRadius: 20
  },
  imgs: {
    padding: 30
  },
  text: {
    fontSize: 20,
    color: "red",
    fontFamily: "Hanuman"
  }
}));

const App = () => {
  const classes = styles();
  return (
    <div className="App">
      <AppBar position="sticky">
        <Toolbar>
          <div>
            <img src={logo} alt="logo" width={50} className={classes.logo}/>
          </div>
          <Typography className={classes.name}>
            Blue Standard Water Tech
          </Typography>
          <Button variant="outlined" className={classes.login} color="primary">
            Visit
          </Button>
        </Toolbar>
      </AppBar>
      <Grid container spacing={5} className={classes.imgs}>
        <Grid item xs={12} md={4}>
          <div>
            <Typography className={classes.text}>
              មានសេវាកម្មតម្លើងមា៉ស៊ីនចម្រោះទឹកសុទ្ធគ្រប់ទំហំខ្នាត
            </Typography>
            <img src={big_banner} alt="big-banner" width="100%" className={classes.img}/>
          </div>
        </Grid>
        <Grid item xs={12} md={4}>
          <div>
            <Typography className={classes.text}>
              មានសេវាកម្មតម្លើងមា៉ស៊ីនចម្រោះទឹកសុទ្ធគ្រប់ទំហំខ្នាត
            </Typography>
            <img src={small_banner} alt="small-banner" width="100%"  className={classes.img}/>
          </div>
        </Grid>
        <Grid item xs={12} md={4}>
          <div>
            <Typography className={classes.text}>
              មានសេវាកម្មតម្លើងមា៉ស៊ីនចម្រោះទឹកសុទ្ធគ្រប់ទំហំខ្នាត
            </Typography>
            <img src={machine} alt="machine" width="100%"  className={classes.img}/>
          </div>
        </Grid>
      </Grid>
    </div>
  );
}

export default App;
