import React, { useState } from 'react';
import './Comments.css';
import { useUserContext } from '../../Context/UserContext';
import { FaTimes } from 'react-icons/fa';
import { setNewComment } from '../../services/Posts.services';
import { BiCommentX, BiCommentEdit } from 'react-icons/bi';
import Comment from '../Comment/Comment';

const Comments = ({
  comments,
  setComments,
  posts,
  setAlertModal,
  cleanAlert,
}) => {
  const { token, user } = useUserContext();
  const newPost = posts.find((post) => post._id === comments.postId);
  const postComments = newPost.comments.filter(
    (x) => x.user || x.description || x._id !== undefined
  );
  const [message, setMessage] = useState('');

  const addCommentHandler = async () => {
    if (message.length >= 8) {
      const response = await setNewComment(token, newPost._id, message);

      if (response.statusText === 'OK') {
        newPost.comments.push({
          description: message,
          user: { username: user.username },
          _id: new Date(),
        });

        setAlertModal({
          isAlert: true,
          message: 'Has comentado en este post',
          type: 'bg-green-400',
        });

        setTimeout(() => {
          cleanAlert();
        }, 5000);
      }

      setMessage('');
    } else {
      setAlertModal({
        isAlert: true,
        message: 'El comentario debe tener al menos 8 caracteres',
        type: 'bg-red-400',
      });

      setTimeout(() => {
        cleanAlert();
      }, 5000);
    }
  };

  return (
    <div className="comment-card w-full bg-gray-800 rounded-3xl absolute z-40">
      <div className="flex flex-nowrap title-container justify-between">
        <div className="m-4"></div>
        <p className="text-white font-thin text-3xl m-4 self-center">
          Comentarios
        </p>
        <button
          className="m-8"
          onClick={() => {
            setComments({ isComments: false, postId: '' });
          }}
        >
          <FaTimes className="comments-icons" />
        </button>
      </div>

      {postComments.length === 0 ? (
        <div className="flex flex-col justify-center items-center comments-container">
          <BiCommentX className="no-comments-icon" />
          <p className="text-white">No hay comentarios.</p>
        </div>
      ) : (
        <div className="flex flex-col comments-container">
          {postComments.map((comment) => {
            return <Comment key={comment._id} {...comment} />;
          })}
        </div>
      )}
      <div className="flex input-container">
        <input
          className="comment-input ml-auto my-auto p-4 rounded-3xl"
          placeholder="Escribe un mensaje..."
          type="text"
          value={message}
          onChange={(e) => {
            setMessage(e.target.value);
          }}
        />
        <button
          className="m-auto"
          onClick={() => {
            addCommentHandler();
          }}
        >
          <BiCommentEdit className="new-comment-icon" />
        </button>
      </div>
    </div>
  );
};

export default Comments;
