import React from 'react';
import { Link } from 'react-router-dom';
import { useUserContext } from '../../Context/UserContext';
import { useNavigate } from 'react-router';
import classes from './User.module.css';
import { MdOutlineArrowBackIosNew } from 'react-icons/md';

const User = () => {
  const navigate = useNavigate();
  // Call useUserContext to remove de token to end the session
  const { logout, user } = useUserContext();
  const role = user.role;
  const username = user.username;

  const onLogOutHandler = () => {
    logout();
    // Session ends
    navigate('/login');
  };

  return (
    // html and design
    <main className="bg-indigo-900 h-screen">
      <header className={classes.dCenter}>
        <h1 className="text-3xl lg:text-3xl font-extrabold text-gray-300 text-center pb-4 mt-8">
          Perfil
        </h1>
        <div className={classes.returnSection}>
          <Link to="/feed">
            <MdOutlineArrowBackIosNew className={classes.iconReturn} />
          </Link>
        </div>
      </header>
      <div className={`h-screen ${classes.userPage}`}>
        <h2 className="text-4xl lg:text-4xl font-extrabold text-gray-300 text-center pb-4 mt-8">
          Bienvenido!
        </h2>
        <h3>{username}</h3>
      </div>
      <div className={classes.logOut}>
        {role === 'admin' ? (
          <Link
            to="/myposts"
            className={`rounded-lg mx-2 ${classes.ownPostsButton}`}
          >
            Mis posts
          </Link>
        ) : (
          ''
        )}
        <button
          type="button"
          className={`rounded-lg mx-2 ${classes.logOutButton}`}
          onClick={() => onLogOutHandler()}
        >
          Cerrar sesión
        </button>
      </div>
    </main>
  );
};

export default User;
