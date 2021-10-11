import { Grid, Typography, makeStyles } from '@material-ui/core';
import big_banner from "../img/big-banner.jpg";
import small_banner from "../img/small-banner.jpg";
import machine from "../img/machine.jpg";
import atCar from "../img/at car.jpg";
import blueImg from "../img/blue.jpg";
import machine1 from "../img/machine1.jpg";
import ui1 from "../img/ui-1.jpg";
import ui from "../img/ui.jpg"
import React from 'react';
const imgs = [
  {
    src: big_banner, alt: "big_banner"
  },
  {
    src: small_banner, alt: "small_banner"
  },
  {
    src: machine, alt: "machine"
  },
  {
    src: atCar, alt: "atCar"
  },
  {
    src: blueImg, alt: "blueImg"
  },
  {
    src: machine1, alt: "machine1"
  },
  {
    src: ui1, alt: "ui1"
  },
  {
    src: ui, alt: "ui"
  },
]

const styles = makeStyles(theme => ({
  homepage: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  img: {
    width: 300,
    height: 300,
    objectFit: "cover",
    borderRadius: 10
  },
  topImg: {
    width: 700,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    [theme.breakpoints.down("xs")]: {
      width: "100%"
    }
  },
  container: {
    padding: 30
  },
  item: {
    width: 300,
    margin: "auto",
  },
  text: {
    fontSize: 19,
    color: "red",
    fontFamily: "Hanuman"
  }
}));

const Homepage = props => {
  const classes = styles();

  return (
  <div className={classes.homepage}>
    <img src={big_banner} alt="small-banner" className={classes.topImg}/>
    <Grid container justifyContent='center'>
      {
        imgs.map(im => 
        <Grid item xs={12} md={4}>
          <div className={classes.item}>
            <img src={im.src} alt={im.alt} className={classes.img} />
          </div>
        </Grid>
        )
      }
    </Grid>
  </div>
  );
}
 
export default Homepage;