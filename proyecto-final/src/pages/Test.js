import React from 'react';
import { Link } from 'react-router-dom';
// import { getPostById, useGetFavorite, setNewFavorite } from '../services/Posts.services';

const Test = () => {

 //  const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MThjNTIwMzRjZmQ3MDRhZTMzN2Q1OGYiLCJpYXQiOjE2MzcxNjkxNTcsImV4cCI6MTYzODM3ODc1N30.uwvMirGrbvcFBWjxqooJ1s-gFOLyYfbJJk-7_JTVFck';

  const testFunction = async () => {
    // setNewFavorite(token,'619820e4092d9bf1f4b41d09'); 
    console.log("hola");
    // getFavoritePosts(token);
    // getPostById(token, '619820e4092d9bf1f4b41d09');
  }

  return (
    <div className="flex justify-center flex-col">
      <h1 className="font-thin text-2xl">
        This is a test, you are reading Test.js file
      </h1>
      <Link to="/" className="text-blue-700">
        Switch test
      </Link>

      <button type="button" onClick={() => { testFunction()}}>TEST</button>
    </div>
  );
};

export default Test;
