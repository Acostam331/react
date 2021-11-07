import React, { useState, useContext } from 'react';
import App from './App';

const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  const [isModal, setIsModal] = useState(false);
  const [isSideBar, setIsSideBar] = useState(false);

  const openSidebar = () => {
    setIsSideBar(true);
  };

  const openModal = () => {
    setIsModal(true);
  };

  const closeSidebar = () => {
    setIsSideBar(false);
  };

  const closeModal = () => {
    setIsModal(false);
  };

  return (
    <AppContext.Provider
      value={{
        isModal,
        isSideBar,
        openModal,
        openSidebar,
        closeModal,
        closeSidebar,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
export const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider };
