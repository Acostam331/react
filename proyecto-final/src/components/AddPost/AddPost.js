import React, { useState } from 'react';
import './AddPost.css';
import { FaTimes } from 'react-icons/fa';
import { setNewPost } from '../../services/Posts.services';
import { useUserContext } from '../../Context/UserContext';

const AddPost = ({ setIsNewPost, setAlertModal, cleanAlert, newPostAdded = () => {} }) => {
  const { token } = useUserContext();
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [image, setImage] = useState('');
  const [imageUrl, setImageUrl] = useState('');

  const addPostHandler = async () => {
    if (desc.length >= 8 && title.length >= 8) {
      const response = await setNewPost(token, title, desc, image);

      if (response.statusText === 'Created') {
        setIsNewPost(false);
        setTitle('');
        setImage('');
        setDesc('');
  
        newPostAdded();
      } else {
        setAlertModal({
          isAlert: true,
          message: 'Error, intentalo de nuevo más tarde!',
          type: 'bg-red-400',
        });
  
        setTimeout(() => {
          cleanAlert();
        }, 2000);
      }
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

  const changeImageHandler = () => {
    if (image !== '') {
      setImageUrl(image);
    } else {
      setAlertModal({
        isAlert: true,
        message: 'Introduce una URL para tu post.',
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
          Nuevo Post
        </p>
        <button
          className="m-8"
          onClick={() => {
            setIsNewPost(false);
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
              value={image}
              onChange={(e) => {
                setImage(e.target.value);
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
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
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
              value={desc}
              onChange={(e) => {
                setDesc(e.target.value);
              }}
            />
          </div>
          <div className="flex">
            <button
              type="button"
              onClick={() => {
                changeImageHandler();
              }}
              className="rounded-2xl px-4 py-2 m-8 bg-indigo-900 text-white"
            >
              Verificar imagen
            </button>
            <button
              type="button"
              onClick={() => {
                addPostHandler();
              }}
              className="rounded-2xl px-4 py-2 m-8 bg-indigo-900 text-white"
            >
              Crear Post
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddPost;
