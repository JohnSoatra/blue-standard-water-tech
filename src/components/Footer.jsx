import { Icon, Link, makeStyles, Typography } from '@material-ui/core';
import { blue, green } from '@material-ui/core/colors';
import { Facebook, Phone, Telegram } from "@material-ui/icons";
import React from 'react';

const styles = makeStyles(theme => ({
  footer: {
    width: "100%",
    height: 150,
    backgroundColor: blue[900],
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  item: {
    display: "flex"
  },
  contact: {
    color: green[100],
    paddingLeft: 15,
    letterSpacing: 0.5,
    cursor: "pointer",
    fontWeight: 600,
    fontSize: 18,
  },
  items: {
    width: "fit-content",
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    marginTop: 15
  },
  icon: {
    color: green[100]
  },
  contactUs: {
    color: green[100],
    fontSize: 24,
    fontWeight: "bold"
  }
}));
const Footer = props => {
  const classes = styles();
  return (
  <div className={classes.footer}>
    <Typography className={classes.contactUs}>Contact Us:</Typography>
    <div className={classes.items}>
      <div className={classes.item}>
        <Phone className={classes.icon} /> <Link className={classes.contact} target="_blank" href="tel:+85516472233"> Phone </Link>
      </div>
      <div className={classes.item}>
        <Telegram className={classes.icon} /> <Link className={classes.contact} target="_blank" href='https://t.me/bluestandardwatertech'> Telegram </Link>
      </div>
      <div className={classes.item}>
        <Facebook className={classes.icon} /> <Link className={classes.contact} target="_blank" href="https://fb.me/Bluestandard-Water-Tech-101147765611982"> Facebook </Link>
      </div>
    </div>
  </div>
  );
}
 
export default Footer;