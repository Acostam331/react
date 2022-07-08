import React, { useEffect, useState } from 'react';
import './card.css';

import {
  BiHeart,
  BiBookmark,
  BiUserCircle,
  BiComment,
  BiPencil,
  BiBlock,
} from 'react-icons/bi';

const Card = ({
  _id,
  title,
  description,
  image,
  user,
  likes,
  active,
  comments,
  setComments,
  setEdit,
  localData,
  role,
  username,
  isMyPost,
  addNewLike = () => {},
  addNewFav = () => {},
  addStatus = () => {},
  currentuser,
}) => {
  const [isMine, setIsMine] = useState(false);
  const [isReadMore, setIsReadMore] = useState(false);
  const postComments = comments.filter((x) => x.user !== undefined);

  const setNewFav = () => {
    addNewFav();
  };

  useEffect(() => {
    likes.forEach((user) => {
      if (user.username === currentuser) {
        setIsMine(true);
      }
    });
  }, [likes, currentuser]);

  const handleLike = () => {
    addNewLike(isMine);
    setIsMine(!isMine);
  };

  return (
    // html and design
    <div className="square bg-gray-800 rounded-3xl">
      {_id !== localData.id ? (
        <>
          <div className="flex p-4">
            <BiUserCircle className="user-icon mr-2" />

            <h3 className="text-white">{user.username}</h3>
          </div>
          <div className="flex justify-center items-center w-11/12 h-72 sm:h-96 mx-auto">
            <img src={image} className="card-img" alt={title} />
          </div>
          <div className="flex flex-col items-center p-4 pb-4">
            <p className="text-white font-thin text-3xl w-b">{title}</p>
            <h2 className="text-gray-300 w-b">
              {description.length > 200
                ? isReadMore
                  ? `${description} `
                  : `${description.substring(0, 100)}... `
                : description}
              {description.length > 200 ? (
                <button
                  className="text-blue-400"
                  onClick={() => setIsReadMore(!isReadMore)}
                >
                  {isReadMore ? 'leer menos' : 'leer más'}
                </button>
              ) : (
                ''
              )}
            </h2>
          </div>
        </>
      ) : (
        <>
          <div className="flex p-4">
            <BiUserCircle className="user-icon mr-2" />

            <h3 className="text-white">{user.username}</h3>
          </div>
          <div className="flex justify-center items-center w-11/12 h-72 sm:h-96 mx-auto">
            <img
              src={localData.url}
              className="card-img"
              alt={localData.title}
            />
          </div>
          <div className="flex flex-col items-center p-4 pb-4">
            <p className="text-white font-thin text-3xl w-b">
              {localData.title}
            </p>
            <h2 className="text-gray-300 w-b">
              {localData.desc.length > 200
                ? isReadMore
                  ? `${localData.desc} `
                  : `${localData.desc.substring(0, 100)}... `
                : localData.desc}
              {localData.desc.length > 200 ? (
                <button
                  className="text-blue-400"
                  onClick={() => setIsReadMore(!isReadMore)}
                >
                  {isReadMore ? 'leer menos' : 'leer más'}
                </button>
              ) : (
                ''
              )}
            </h2>
          </div>
        </>
      )}

      <div className="flex justify-end px-4 pb-4">
        {(role === 'admin' && username === user.username) ||
        (role === 'admin' && username === user.username && isMyPost) ? (
          <>
            <div className="flex">
              <button
                onClick={() =>
                  setEdit({
                    isEdit: true,
                    postId: _id,
                    postTitle: title,
                    postDesc: description,
                    postImg: image,
                  })
                }
              >
                <BiPencil className="card-icons edit-icon mx-2" />
              </button>
            </div>
            <div className="flex">
              <button
                onClick={() => {
                  addStatus(active);
                }}
              >
                <BiBlock
                  className={`card-icons block-icon mx-2 ${
                    active ? '' : 'icon-filled'
                  }`}
                />
              </button>
            </div>
          </>
        ) : (
          ''
        )}
        {isMyPost ? (
          ''
        ) : (
          <>
            <div className="flex">
              {likes.length > 0 ? (
                <p className="text-white">{likes.length}</p>
              ) : (
                ''
              )}
              <button
                onClick={() => {
                  handleLike();
                }}
              >
                <BiHeart
                  className={`card-icons heart-icon mx-2 ${
                    isMine && 'icon-filled'
                  }`}
                />
              </button>
            </div>
            <div className="flex">
              {postComments.length > 0 ? (
                <p className="text-white">{postComments.length}</p>
              ) : (
                ''
              )}
              <button
                onClick={() => {
                  setComments({ isComments: true, postId: `${_id}` });
                }}
              >
                <BiComment className="card-icons comment-icon mx-2" />
              </button>
            </div>
            <div className="flex">
              <button
                onClick={() => {
                  setNewFav();
                }}
              >
                <BiBookmark className="card-icons bookmark-icon ml-2" />
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Card;
