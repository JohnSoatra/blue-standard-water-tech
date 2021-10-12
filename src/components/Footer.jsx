import { Link, makeStyles, Typography } from '@material-ui/core';
import { blue } from '@material-ui/core/colors';
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
  contactUs: {
    color: blue[100],
    fontSize: 19,
    fontWeight: "bold"
  },
  items: {
    width: "fit-content",
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    marginTop: 15
  },
  item: {
    display: "flex"
  },
  icon: {
    color: blue[100]
  },
  contact: {
    color: blue[100],
    paddingLeft: 15,
    letterSpacing: 0.5,
    cursor: "pointer",
    fontWeight: 600,
    fontSize: 16,
    fontFamily: "roboto"
  },
}));
const Footer = props => {
  const classes = styles();
  return (
  <div className={classes.footer}>
    <Typography className={classes.contactUs}>Contact Us:</Typography>
    <div className={classes.items}>
      <div className={classes.item}>
        <Phone className={classes.icon} /> <Link className={classes.contact} target="_blank" href="tel:016472233"> Phone </Link>
      </div>
      <div className={classes.item}>
        <Telegram className={classes.icon} /> <Link className={classes.contact} target="_blank" href='https://t.me/bluestandardwatertech'> Telegram </Link>
      </div>
      <div className={classes.item}>
        <Facebook className={classes.icon} /> <Link className={classes.contact} target="_blank" href="https://www.facebook.com/Bluestandard-Water-Tech-101147765611982"> Facebook </Link>
      </div>
    </div>
  </div>
  );
}
 
export default Footer;