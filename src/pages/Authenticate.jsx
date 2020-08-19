import React from 'react';
import { useHistory } from 'react-router-dom';
import MUIButton from '@material-ui/core/Button';
import MUICard from '@material-ui/core/Card';
import MUICardActions from '@material-ui/core/CardActions';
import MUICardContent from '@material-ui/core/CardContent';
import MUICardHeader from '@material-ui/core/CardHeader';
import MUIDialogue from '@material-ui/core/Dialog';
import MUIDialogueActions from '@material-ui/core/DialogActions';
import MUIDialogueContent from '@material-ui/core/DialogContent';
import MUIDialogueContentText from '@material-ui/core/DialogContentText'
import MUIDialogueTitle from '@material-ui/core/DialogTitle';
import MUITextField from '@material-ui/core/TextField';
import MUITypography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

import LoadingSpinner from '../components/miscellaneous/LoadingSpinner';
import { AuthenticationContext } from '../contexts/authentication-context';
import { useRequest } from '../hooks/request-hook';

const useStyles = makeStyles({
  cardActions: {
    justifyContent: 'flex-end'
  },
  centeredCard: {
    justifyContent: 'center'
  },
  textField: {
    margin: '4px 0 4px 0'
  }
});

const Authenticate = () => {

  const authentication = React.useContext(AuthenticationContext);
  const classes = useStyles();
  const history = useHistory();
  const emailInput = React.useRef(null);
  const passwordInput = React.useRef(null);

  const { loading, errorMessage, sendRequest, clearError } = useRequest();

  async function login () {
    try {
      const response = await sendRequest(`${process.env.REACT_APP_BACKEND_URL}/admin/login`,
        'PATCH',
        JSON.stringify({
          email: emailInput.current.value,
          password: passwordInput.current.value
        }),
        {
          'Content-Type': 'application/json'
        }
      );

      authentication.login(response.adminId, response.token);
      history.push('/');
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <React.Fragment>
      {loading ?
        <LoadingSpinner /> :
        <React.Fragment>
          <MUIDialogue
            open={!!errorMessage}
            onClose={clearError}
          >
            <MUIDialogueTitle>Error</MUIDialogueTitle>
            <MUIDialogueContent>
              <MUIDialogueContentText>{errorMessage}</MUIDialogueContentText>
            </MUIDialogueContent>
            <MUIDialogueActions>
              <MUIButton color="primary" onClick={clearError} variant="contained">Try Again</MUIButton>
            </MUIDialogueActions>
          </MUIDialogue>
          <MUICard className={classes.centeredCard}>
            <MUICardHeader
              title={<MUITypography variant="h2">Login as an Administrator</MUITypography>}
            />
            <MUICardContent>
              <MUITextField
                autoComplete="off"
                autoFocus
                className={classes.textField}
                color="secondary"
                fullWidth
                inputRef={emailInput}
                label="Email Address"
                required={true}
                type="email"
                variant="outlined"
              />
              <MUITextField
                autoComplete="off"
                className={classes.textField}
                color="secondary"
                fullWidth
                inputRef={passwordInput}
                label="Password"
                required={true}
                type="password"
                variant="outlined"
              />
            </MUICardContent>

            <MUICardActions className={classes.cardActions}>
              <MUIButton color="secondary" onClick={login} variant="contained">
                Login!
              </MUIButton>
            </MUICardActions>
          </MUICard>
        </React.Fragment>
      }
    </React.Fragment>    
  );
}

export default Authenticate;