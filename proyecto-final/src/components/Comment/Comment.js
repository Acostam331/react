import React from 'react';
import { BiUserCircle } from 'react-icons/bi';

const Comment = ({ user, description }) => {
  return (
    <div className="m-4 border border-indigo-900 rounded-3xl">
      <div className="flex p-4">
        <BiUserCircle className="user-icon mr-2" />
        <p className="text-white">{user.username}</p>
      </div>
      <p className="text-white mx-4 mb-4">{description}</p>
    </div>
  );
};

export default Comment;
