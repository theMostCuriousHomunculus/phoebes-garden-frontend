import React from 'react';
import { NavLink } from 'react-router-dom';
import MUIAddCircleIcon from '@material-ui/icons/AddCircle';
import MUIAppBar from '@material-ui/core/AppBar';
import MUIDrawer from '@material-ui/core/Drawer';
import MUIExitToAppIcon from '@material-ui/icons/ExitToApp';
import MUIHomeIcon from'@material-ui/icons/Home';
import MUILocalFloristIcon from '@material-ui/icons/LocalFlorist';
import MUIShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import MUIToolbar from '@material-ui/core/Toolbar';
import MUITypography from '@material-ui/core/Typography';
import MUIMenuIcon from '@material-ui/icons/Menu';
import { makeStyles } from '@material-ui/core/styles';
import { withRouter } from 'react-router-dom';

import NavigationLinks from './NavigationLinks';
import theme from '../../theme';
import { AuthenticationContext } from '../../contexts/authentication-context';

const useStyles = makeStyles({
  activeNavLink: {
    textDecoration: 'underline !important'
  },
  appBar: {
    background: theme.palette.primary.main/*`radial-gradient(${theme.palette.primary.light}, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`*/
  },
  drawer: {
    '& .MuiPaper-root': {
      background: theme.palette.primary.main/*`linear-gradient(to right, ${theme.palette.primary.light}, ${theme.palette.primary.dark})`*/
    }
  },
  headlineContainer: {
    textAlign: 'left'
  },
  menuIcon: {
    border: '1px solid',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '5rem',
    marginRight: '1rem',
    [theme.breakpoints.down('sm')]: {
      display: 'block'
    },
    [theme.breakpoints.up('md')]: {
      display: 'none'
    }
  },
  navLink: {
    color: theme.palette.secondary.main,
    fontSize: '2rem',
    textDecoration: 'none'
  },
  toolbar: {
    alignItems: 'flex-end',
    display: 'flex',
    justifyContent: 'space-between',
    padding: '1rem'
  },
  topBarContainer: {
    flexGrow: 1,
    justifyContent: 'space-around',
    [theme.breakpoints.down('sm')]: {
      display: 'none'
    },
    [theme.breakpoints.up('md')]: {
      display: 'flex'
    }
  }
});

function Navigation (props) {

  const authentication = React.useContext(AuthenticationContext);
  const classes = useStyles();
  const [drawerOpen, setDrawerOpen] = React.useState(false);
  const { history } = props;

  const toggleDrawer = (open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setDrawerOpen(open);
  };

  return (
    <MUIAppBar className={classes.appBar} position="static">
      <MUIToolbar className={classes.toolbar}>
        <MUIMenuIcon
          className={classes.menuIcon}
          color="secondary"
          onClick={toggleDrawer(true)}
        />
        <div className={classes.headlineContainer}>
          <MUITypography color="secondary" variant="h1">Joy's Flower Shop</MUITypography>
        </div>
        <div className={classes.topBarContainer}>
          <NavLink
            to="/"
            className={classes.navLink}
            activeClassName={classes.activeNavLink}
            exact
          >
            <MUIHomeIcon />Home
          </NavLink>
          <NavLink
            to="/products"
            className={classes.navLink}
            activeClassName={classes.activeNavLink}
          >
            <MUILocalFloristIcon />Products
          </NavLink>
          {!authentication.isLoggedIn &&
            <NavLink
              to="/cart"
              className={classes.navLink}
              activeClassName={classes.activeNavLink}
            >
              <MUIShoppingCartIcon />Cart
            </NavLink>
          }
          {authentication.isLoggedIn &&
            <React.Fragment>
              <NavLink
                to="/manage-product"
                className={classes.navLink}
                activeClassName={classes.activeNavLink}
              >
                <MUIAddCircleIcon />Add Product
              </NavLink>
              <NavLink
                to="/"
                className={classes.navLink}
                onClick={authentication.logout}
              >
                <MUIExitToAppIcon />Logout
              </NavLink>
            </React.Fragment>
          }
        </div>
      </MUIToolbar>
      <MUIDrawer
        anchor="left"
        className={classes.drawer}
        id="side-navigation"
        onClose={toggleDrawer(false)}
        open={drawerOpen}
      >
        <NavigationLinks history={history} toggleDrawer={toggleDrawer} />
      </MUIDrawer>
    </MUIAppBar>
  );
}

export default withRouter(Navigation);