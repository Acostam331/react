// Login Page
import { useState } from 'react';
import { Navigate } from 'react-router-dom';

import { useUserContext } from '../../Context/UserContext';

export default function Login() {
  const { login, token } = useUserContext();
  // States to see the inputs info, and then query and compare
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const [error, setError] = useState(false);

  const onChange = (e, save) => {
    save(e.target.value);
  };

  // It query if user information is valid
  const onSubmitHandler = async (e) => {
    e.preventDefault();
    const logged = await login(username, password);

    setError(!logged);
    setUsername('');
    setPassword('');
  };

  // If token is valid, it will load "redirect"
  if (token) {
    return <Navigate replace to="/redirect" />;
  }

  return (
    // html and design
    <div className="flex justify-center items-center min-h-screen bg-indigo-900">
      <main className="square rounded-4xl">
        <form
          onSubmit={onSubmitHandler}
          className="flex flex-col gap-6 items-center justify-center"
        >
          <h2 className="uppercase text-5xl lg:text-5xl font-extrabold text-gray-300 text-center pb-4">
            Photogenix
          </h2>

          {error && (
            <p className="w-full rounded p-6 text-center text-white font-roboto bg-yellow-700 select-none hover:bg-yellow-800">
              Por favor verifica tus credenciales.
            </p>
          )}

          <input
            className="w-full text-gray-700 rounded-2xl focus:outline-none focus:ring py-2 px-4 bg-gray-300"
            type="text"
            value={username}
            placeholder="Enter your username"
            onChange={(e) => onChange(e, setUsername)}
          />

          <input
            className="w-full text-gray-700 rounded-2xl focus:outline-none focus:ring py-2 px-4 bg-gray-300"
            type="password"
            placeholder="Enter your password"
            onChange={(e) => onChange(e, setPassword)}
            value={password}
          />

          <button className="rounded-2xl mt-6 w-1/4 bg-gray-800 py-2 px-4 text-white">
            Iniciar sesión
          </button>
        </form>
      </main>
    </div>
  );
}
