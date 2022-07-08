import React, { useState } from 'react';
import { FaTimes } from 'react-icons/fa';
import { useUserContext } from '../../Context/UserContext';
import { editPost } from '../../services/Posts.services';
import './EditPost.css';

const EditPost = ({
  edit,
  setEdit,
  setAlertModal,
  cleanAlert,
  setLocalData,
  localData,
}) => {
  const [imageUrl, setImageUrl] = useState(edit.postImg);
  const [postTitle, setPostTitle] = useState(edit.postTitle);
  const [postDesc, setPostDesc] = useState(edit.postDesc);
  const { token } = useUserContext();

  const editPostHandler = async () => {
    if (postDesc.length >= 8 && postTitle.length >= 8) {
      await editPost(token, edit.postId, postTitle, postDesc, imageUrl);

      setLocalData({
        id: edit.postId,
        url: imageUrl,
        title: postTitle,
        desc: postDesc,
      });

      setEdit({
        isEdit: false,
        postId: '',
        postTitle: '',
        postDesc: '',
        postImg: '',
      });
      setImageUrl('');
      setPostDesc('');
      setPostTitle('');
    } else {
      setAlertModal({
        isAlert: true,
        message: 'La descripcion y titulo deben tener al menos 8 caracteres.',
        type: 'bg-red-400',
      });

      setTimeout(() => {
        cleanAlert();
      }, 2000);
    }
  };

  return (
    <div className="add-card w-full bg-gray-800 rounded-3xl absolute z-40">
      <div className="flex flex-nowrap title-container justify-between">
        <div className="m-4"></div>
        <p className="text-5xl lg:text-5xl font-extrabold text-gray-300 text-center pb-4 mt-10">
          Editar Post
        </p>
        <button
          className="m-8"
          onClick={() => {
            setEdit({
              isEdit: false,
              postId: '',
              postTitle: '',
              postDesc: '',
              postImg: '',
            });
            setImageUrl('');
            setPostDesc('');
            setPostTitle('');
          }}
        >
          <FaTimes className="add-icons" />
        </button>
      </div>
      <div className="new-input-container flex flex-col m-8 items-center">
        <div className={`image-verifier ${imageUrl !== '' ? '' : 'p-2'}`}>
          {imageUrl !== '' ? (
            <img src={imageUrl} className="add-image" alt="Esperando imagen" />
          ) : (
            ''
          )}
        </div>
        <form className="w-full flex flex-col items-center justify-center">
          <div className="my-2 sm:w-1/2">
            <h1 className="input-label my-2 text-white">
              Ingresa la URL de tu imagen:
            </h1>
            <input
              className="input-element w-full px-4 py-2 rounded-3xl"
              placeholder="p. ej. www.unsplash.com/"
              type="text"
              value={imageUrl}
              onChange={(e) => {
                setImageUrl(e.target.value);
              }}
            />
          </div>
          <div className="my-2 sm:w-1/2">
            <h1 className="input-label my-2 text-white">
              Ingresa un titulo para tu post:
            </h1>
            <input
              className="input-element w-full px-4 py-2 rounded-3xl"
              placeholder="p. ej. hoy es un dia soleado..."
              type="text"
              value={postTitle}
              onChange={(e) => {
                setPostTitle(e.target.value);
              }}
            />
          </div>
          <div className="my-2 sm:w-1/2">
            <h1 className="input-label my-2 text-white">
              Ingresa la descripcion de tu post:
            </h1>
            <input
              className="input-element w-full px-4 py-2 rounded-3xl"
              placeholder="p. ej. deberia llover mas tarde..."
              type="text"
              value={postDesc}
              onChange={(e) => {
                setPostDesc(e.target.value);
              }}
            />
          </div>
          <div className="flex">
            <button
              type="button"
              className="rounded-2xl px-4 py-2 m-8 bg-indigo-900 text-white"
              onClick={() => editPostHandler()}
            >
              Editar Post
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditPost;
