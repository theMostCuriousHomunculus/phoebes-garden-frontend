import React from 'react';
import MUITypography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles'

import theme from '../../theme';

const useStyles = makeStyles({
  footer: {
    alignItems: 'center',
    background: theme.palette.secondary.main,
    bottom: 0,
    color: theme.palette.primary.main,
    display: 'flex',
    flexDirection: 'column',
    height: 75,
    justifyContent: 'center',
    position: 'absolute',
    width: '100%',
    zIndex: -1,
    '& a': {
      color: '#ffffff'
    }
  }
})

const Footer = () => {

    const classes = useStyles();

    return (
      <footer className={classes.footer}>
        <MUITypography variant="body2">Phoebe's Garden is owned by Joy and Yanyan.</MUITypography>
        <MUITypography variant="body2">Please send us an <a href="mailto:joyr0528@gmail.com">email</a> if you have any questions!</MUITypography>
      </footer>
    );
}

export default Footer;