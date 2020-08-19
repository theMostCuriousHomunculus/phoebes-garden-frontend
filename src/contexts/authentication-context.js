import { createContext } from 'react';

export const AuthenticationContext = createContext({
  isLoggedIn: false,
  adminId: null,
  token: null,
  login: () => {},
  logout: () => {}
});