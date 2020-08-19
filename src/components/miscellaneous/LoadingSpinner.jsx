import React from 'react';
import MUICard from '@material-ui/core/Card';
import MUICircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  centered: {
    alignItems: 'center',
    display: 'flex',
    height: 'calc(100vh)',
    justifyContent: 'center'
  }
})

function LoadingSpinner () {

  const classes = useStyles();

  return (
    <MUICard className={classes.centered}>
      <MUICircularProgress color="secondary" size={100} />
    </MUICard>
  );
}

export default LoadingSpinner;