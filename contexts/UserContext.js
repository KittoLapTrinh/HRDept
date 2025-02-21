import React, { createContext, useState, useContext } from 'react';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [userData, setUserData] = useState(null);

  const login = (user) => {
    setUserData(user);
  };

  const logout = () => {
    setUserData(null);
  };

  return (
    <UserContext.Provider value={{ userData, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
