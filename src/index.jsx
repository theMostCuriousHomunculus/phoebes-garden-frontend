import React from 'react';
import ReactDOM from 'react-dom';
import thunk from 'redux-thunk';
import { applyMiddleware, compose, createStore } from 'redux';
import { Provider as ReduxProvider } from 'react-redux';
import { ThemeProvider } from '@material-ui/core/styles';

import App from './App';
import reducer from './redux/reducer'
import theme from './theme';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(reducer, composeEnhancers(applyMiddleware(thunk)));

ReactDOM.render(
  <ReduxProvider store={store}>
    <ThemeProvider theme={theme} >
      <App />
    </ThemeProvider>
  </ReduxProvider>,
  document.getElementById('root')
);