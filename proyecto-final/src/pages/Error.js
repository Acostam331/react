import React from 'react';
import { Link } from 'react-router-dom';
import ErrorFlork from '../assets/img/error.png';

const Error = () => {
  return (
    <div className="flex flex-col justify-center items-center w-screen h-screen bg-white">
      <div className="w-1/2 lg:w-1/2 flex justify-center items-center">
        <img
          alt="error-flork-img"
          className="w-full lg:w-1/2"
          src={ErrorFlork}
        />
      </div>
      <h1 className="uppercase text-2xl lg:text-5xl font-extrabold text-red-800 text-center p-4">
        ERROR 404... Page not found
      </h1>
      <Link
        to="/"
        className="rounded-lg mx-2 p-4 text-center text-white bg-blue-800 hover:bg-blue-600"
      >
        Regresar
      </Link>
    </div>
  );
};

export default Error;
