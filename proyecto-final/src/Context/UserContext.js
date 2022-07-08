import React, { useState, useEffect, useMemo, useCallback } from 'react';
/*import {useGetUser} from './../services/Posts.services';*/
import userService from './../services/User.services';

const UserContext = React.createContext();
const TOKEN_KEY = 'token';

export const UserProvider = (props) => {
  const [token, setToken] = useState(undefined);
  const [user, setUser] = useState(undefined);

  useEffect(() => {
    const verifyTokenAsync = async () => {
      const lsToken = getToken();

      if (lsToken) {
        const { username, role } = await userService.verifyToken(lsToken);
        if (username && role) {
          setUser({ username, role });
          setTokenAll(lsToken);
        }
      }
    };

    verifyTokenAsync();
  }, [token]);

  const setTokenAll = (token) => {
    localStorage.setItem(TOKEN_KEY, token);
    setToken(token);
  };

  // Login process
  const login = useCallback((username, password) => {
    const loginAsync = async () => {
      let status = false;
      try {
        const { token: tokenRes } = await userService.login(username, password);

        if (tokenRes) {
          setTokenAll(tokenRes);
          status = true;
        }
      } catch (error) {
        console.error(error);
        console.error('Error in login');
      } finally {
        return status;
      }
    };

    return loginAsync();
  }, []);

  // Clean the token to finish session
  const logout = useCallback(() => {
    setUser(undefined);
    setTokenAll(undefined);
  }, []);

  // Info session
  const value = useMemo(
    () => ({
      token: token,
      user: user,
      login: login,
      logout: logout,
    }),
    [token, user, login, logout]
  );

  return <UserContext.Provider value={value} {...props} />;
};

// Export token in the object context
export const useUserContext = () => {
  const context = React.useContext(UserContext);

  if (!context) {
    throw new Error('useUserContext() must be inside of UserProvider');
  }

  return context;
};

const getToken = () => localStorage.getItem(TOKEN_KEY);
