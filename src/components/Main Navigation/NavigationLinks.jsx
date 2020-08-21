import React from 'react';
import MUIAddCircleIcon from '@material-ui/icons/AddCircle';
import MUIExitToAppIcon from '@material-ui/icons/ExitToApp';
import MUIHomeIcon from '@material-ui/icons/Home';
import MUIList from '@material-ui/core/List';
import MUIListItem from '@material-ui/core/ListItem';
import MUIListItemIcon from '@material-ui/core/ListItemIcon';
import MUIListItemText from '@material-ui/core/ListItemText';
import MUILocalFloristIcon from '@material-ui/icons/LocalFlorist';
import MUIShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import { makeStyles } from '@material-ui/core/styles';

import theme from '../../theme';
import { AuthenticationContext } from '../../contexts/authentication-context';

const useStyles = makeStyles({
  item: {
    color: theme.palette.secondary.main,
    '& span, & svg': {
      fontSize: '3rem'
    }
  },
  list: {
    width: 350
  }
});

function NavigationLinks (props) {

  const authentication = React.useContext(AuthenticationContext);
  const classes = useStyles();
  const { history } = props;

  const loggedInPages = [
    {
      icon: <MUIHomeIcon />,
      name: "Home",
      onClick: () => history.push('/')
    },
    {
      icon: <MUILocalFloristIcon />,
      name: "Products",
      onClick: () => history.push('/products')
    },
    {
      icon: <MUIAddCircleIcon />,
      name: "Add Product",
      onClick: () => history.push('/manage-product')
    },
    {
      icon: <MUIExitToAppIcon />,
      name: "Logout",
      onClick: authentication.logout
    }
  ];

  const loggedOutPages = [
    {
      icon: <MUIHomeIcon />,
      name: "Home",
      onClick: () => history.push('/')
    },
    {
      icon: <MUILocalFloristIcon />,
      name: "Products",
      onClick: () => history.push('/products')
    },
    {
      icon: <MUIShoppingCartIcon />,
      name: "Cart",
      onClick: () => history.push('/cart')
    }
  ];

  return (
    <div
      className={classes.list}
      role="presentation"
      onClick={props.toggleDrawer(false)}
      onKeyDown={props.toggleDrawer(false)}
    >
      <MUIList>
        {
          (authentication.isLoggedIn ? loggedInPages : loggedOutPages).map(function (page) {
            return (
              <MUIListItem button key={page.name} onClick={page.onClick}>
                <MUIListItemIcon className={classes.item}>{page.icon}</MUIListItemIcon>
                <MUIListItemText className={classes.item} primary={page.name} />
              </MUIListItem>
            );
          })
        }
      </MUIList>
    </div>
  );
}

export default NavigationLinks;