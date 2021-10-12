import { Grid, Typography, makeStyles } from '@material-ui/core';
import big_banner from "../img/big-banner.jpg";
import machine from "../img/machine.jpg";
import atCar from "../img/at car.jpg";
import blueImg from "../img/blue.jpg";
import machine1 from "../img/machine1.jpg";
import ui1 from "../img/ui-1.jpg";
import ui from "../img/ui.jpg"
import React from 'react';
const imgs = [
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
    width: "95%",
    margin: "auto"
  },
  topImgWrapper: {
    width: "fit-content",
    margin: "0 auto"
  },
  topImg: {
    maxWidth: 700,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    [theme.breakpoints.down("sm")]: {
      width: "100%"
    }
  },
  imgContainer: {
    marginTop: 20,
    marginBottom: 20,
  },
  item: {
    display: "flex",
    justifyContent: "center"
  },
  img: {
    width: 250,
    height: 250 + 250 * 1/5,
    objectFit: "cover",
    borderRadius: 10,
    [theme.breakpoints.down("md")]: {
      width: 200,
      height: 200 + 200 * 1/5,
    },
    [theme.breakpoints.down("sm")]: {
      width: "100%",
      height: "calc(width + width * 1/5)",
    }
  },
}));

const Homepage = props => {
  const classes = styles();

  return (
  <div className={classes.homepage}>
    <div className={classes.topImgWrapper}>
      <img src={big_banner} alt="small-banner" className={classes.topImg}/>
    </div>
    <Grid container justifyContent='center' spacing={2} className={classes.imgContainer}>
      {
        imgs.map(im => 
        <Grid item xs={6} sm={4} md={3} className={classes.item}>
          <img src={im.src} alt={im.alt} className={classes.img}/>
        </Grid>
        )
      }
    </Grid>
  </div>
  );
}
 
export default Homepage;