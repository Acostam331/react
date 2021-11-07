import React, { useContext } from 'react';
import { FaBars } from 'react-icons/fa';
import { AppContext, useGlobalContext } from './context';

const Home = () => {
  // const data_hook = useGlobalContext();
  // // useContext import is not needed in custom hook
  // const data = useContext(AppContext);
  // // Without cutom hook, requires useContext import
  // console.log(data_hook, data);
  const { openSidebar, openModal } = useGlobalContext();

  return (
    <main>
      <button className="sidebar-toggle" onClick={openSidebar}>
        <FaBars />
      </button>
      <button className="btn" onClick={openModal}>
        show modal
      </button>
    </main>
  );
};

export default Home;
