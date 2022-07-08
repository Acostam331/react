import React from 'react';
import { Link } from 'react-router-dom';

const App = () => {
  return (
    <div className="flex flex-col justify-center items-center">
      <h1 className="font-thin text-2xl">
        This is a test, you are reading App.js file
      </h1>
      <Link to="/test" className="text-blue-700">
        Switch test
      </Link>
      <Link to="/login" className="text-blue-700">
        Login test
      </Link>
      <Link to="/feed" className="text-blue-700">
        Feed test
      </Link>
    </div>
  );
};

export default App;
