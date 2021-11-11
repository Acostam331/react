import React from 'react';
import { useFetch } from './useFetch';

const users = 'https://618b36a93013680017343fa9.mockapi.io/users';

const Home = () => {
  const { data } = useFetch(users);

  return (
    <div className="App">
      {data.map((user) => {
        const { id, name, lastName, userName, pass, avatar } = user;

        return (
          <div key={id}>
            <h1>
              {name} {lastName}
            </h1>
            <img src={avatar} alt={name} />
            <h3>{userName}</h3>
            <h4>{pass}</h4>
          </div>
        );
      })}
    </div>
  );
};

export default Home;
