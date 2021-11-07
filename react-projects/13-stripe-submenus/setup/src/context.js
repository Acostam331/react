import React, { useState, useContext } from 'react';
import App from './App';
import sublinks from './data';

const AppContext = React.createContext();

export const AppProvider = ({ children }) => {
  const [isSidebar, setIsSidebar] = useState(false);
  const [isSubmenu, setIsSubmenu] = useState(true);
  const [location, setLocation] = useState({});
  const [page, setPage] = useState({ page: '', links: [] });

  const openSidebar = () => {
    setIsSidebar(true);
  };

  const closeSidebar = () => {
    setIsSidebar(false);
  };

  const openSubmenu = (text, coordinates) => {
    const page = sublinks.find((link) => link.page === text);
    setPage(page);

    setLocation(coordinates);
    setIsSubmenu(true);
  };

  const closeSubmenu = () => {
    setIsSubmenu(false);
  };

  return (
    <AppContext.Provider
      value={{
        isSidebar,
        isSubmenu,
        location,
        page,
        openSidebar,
        closeSidebar,
        openSubmenu,
        closeSubmenu,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(AppContext);
};
