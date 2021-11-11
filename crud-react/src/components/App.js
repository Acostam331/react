import React, { useState } from 'react';
import { useFetch } from './useFetch';

const users = 'https://618b36a93013680017343fa9.mockapi.io/users';
// const posts = 'https://618b36a93013680017343fa9.mockapi.io/users/posts';
// const saved = 'https://618b36a93013680017343fa9.mockapi.io/saved';

function App() {
  const [userName, setUserName] = useState('');
  const [pass, setPass] = useState('');
  const [specific, setSpecific] = useState([]);

  const { data } = useFetch(users);

  const handleSubmit = (e) => {
    e.preventDefault();

    const tempUser = data.find(
      (user) => user.userName === userName && user.pass === pass
    );

    if (tempUser) {
      setSpecific(tempUser);
      setUserName('');
      setPass('');
    } else {
      console.log('theres no user');
    }
  };

  return (
    <>
      <div>
        <form onSubmit={handleSubmit}>
          <label>username</label>
          <input
            type="text"
            name="userName"
            id="userName"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
          />
          <label>password</label>
          <input
            type="password"
            name="pass"
            id="pass"
            value={pass}
            onChange={(e) => setPass(e.target.value)}
          />
          <button type="submit">Entrar</button>
        </form>
      </div>
    </>
  );
}

export default App;
