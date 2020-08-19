import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Cookies from 'js-cookie';
import { makeStyles } from '@material-ui/core/styles';

import LoadingSpinner from './components/miscellaneous/LoadingSpinner';
import theme from './theme';
import { AuthenticationContext } from './contexts/authentication-context';
import { useRequest } from './hooks/request-hook';

const Authenticate = React.lazy(() => import('./pages/Authenticate'));
const Home = React.lazy(() => import('./pages/Home'));

const useStyles = makeStyles({
  main: {
    margin: '8 auto 0 auto'
  }
});

function App() {
  const classes = useStyles();
  const { sendRequest } = useRequest();

  const [token, setToken] = React.useState(null);
  const [adminId, setAdminId] = React.useState(null);

  const login = React.useCallback((uid, tkn) => {
    setToken(tkn);
    Cookies.set('authentication_token', tkn);
    setAdminId(uid);
    Cookies.set('admin_id', uid);
  }, []);

  const logout = React.useCallback(() => {
    sendRequest(`${process.env.REACT_APP_BACKEND_URL}/account/logoutAll`,
      'PATCH',
      null,
      {
        Authorization: 'Bearer ' + Cookies.get('authentication_token'),
        'Content-Type': 'application/json'
      }
    );
    setToken(null);
    Cookies.remove('authentication_token');
    setAdminId(null);
    Cookies.remove('admin_id');
  }, [sendRequest]);

  React.useEffect(() => {
    if (Cookies.get('admin_id') && Cookies.get('authentication_token')) {
      login(Cookies.get('admin_id'), Cookies.get('authentication_token'));
    }
  }, [login]);

  return (
    <AuthenticationContext.Provider
      value={{
        isLoggedIn: !!token,
        token,
        adminId,
        login,
        logout
      }}
    >
      <BrowserRouter>
        {/*<Navigation />*/}
        <main className={classes.main}>
          <React.Suspense fallback={<LoadingSpinner />}>
            <Switch>
              <Route path='/' exact>
                <Home />
              </Route>
              <Route path='/authenticate' exact>
                <Authenticate />
              </Route>
            </Switch>
          </React.Suspense>
        </main>
        {/*<Footer />*/}
      </BrowserRouter>
    </AuthenticationContext.Provider>
  );
}

export default App;